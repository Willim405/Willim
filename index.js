import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '201038694952',
  prefix: ["."],
  fromMe: true,
  owners: [
    { name: "𝑾𝑰𝑳𝑳𝑰𝑨𝑴", jid: "201038694952@s.whatsapp.net", lid: "97307500515336@lid" }
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Images from media folder (1m, 2m, 3m, 4m, 5m) ========== */
const mediaPath = path.join(__dirname, 'media');
let images = [];

if (fs.existsSync(mediaPath)) {
    // ترتيب الملفات حسب الاسم (1m, 2m, 3m, 4m, 5m)
    const files = fs.readdirSync(mediaPath).sort((a, b) => {
        const numA = parseInt(a.match(/^(\d+)/)?.[0] || 0);
        const numB = parseInt(b.match(/^(\d+)/)?.[0] || 0);
        return numA - numB;
    });
    
    for (const file of files) {
        if (/\.(png|jpg|jpeg|gif|webp|bmp)$/i.test(file)) {
            images.push(path.join(mediaPath, file));
        }
    }
}

// لو مفيش صور، استخدم الروابط الافتراضية
if (images.length === 0) {
    images = [
        path.join(__dirname, 'media', '1m.jpg'),
        path.join(__dirname, 'media', '2m.jpg'),
        path.join(__dirname, 'media', '3m.jpg'),
        path.join(__dirname, 'media', '4m.jpg'),
        path.join(__dirname, 'media', '5m.jpg')
    ];
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "🩸 𝑾𝑰𝑳𝑳𝑰𝑨𝑴 🕊",
  nameChannel: "🩸 𝑾𝑰𝑳𝑳𝑰𝑨𝑴 𝑩𝑶𝑻 🕊",
  idChannel: "120363408784984908@newsletter",
  urls: {
    repo: "https://github.com/Willim405/Willim.git",
    api: "https://willim-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbDakGAEKyZBVXYq7w3e"
  },
  copyright: { 
    pack: '𝑾𝑰𝑳-🕊', 
    author: '𝑾𝑰𝑳𝑳𝑰𝑨𝑴'
  },
  images: images
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
    if (client.commandSystem) { 
        await sub(client);  // ← await عشان ينتظر تنفيذ sub
    }
}, 2000);

/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});


/* 
=========== Memory Monitor ========== 

setInterval(() => {
    const used = process.memoryUsage().rss / 1024 / 1024
    if (used > 800) {
        console.log(`🔄 Bot memory full (${used.toFixed(1)}MB), restarting...`)
        process.exit(1) 
    }
}, 300_000) 

*/
