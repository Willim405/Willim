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
    { name: "𝑾𝑰𝑳𝑳𝑰𝑨𝑴", jid: "201038694952@s.whatsapp.net", lid: "201038694952@lid" }
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

// لو مفيش صور، استخدم الروابط القديمة
if (images.length === 0) {
    images = [
        "https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png",
        "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
        "https://i.pinimg.com/originals/bb/77/0f/bb770fad66a634a6b3bf93e9c00bf4e5.jpg"
    ];
}

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "🩸 𝑾𝑰𝑳𝑳𝑰𝑨𝑴 🕊",
  nameChannel: "🩸 𝑾𝑰𝑳𝑳𝑰𝑨𝑴 𝑩𝑶𝑻 🕊",
  idChannel: "120363437236619633@newsletter",
  urls: {
    repo: "https://github.com/Willim/Willim-Bot",
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
sub(client)
  }
}, 2000);

/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});  idChannel: "120363225356834044@newsletter",
  urls: {
    repo: "https://github.com/Willim/Willim-Bot",
    api: "https://willim-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbDakGAEKyZBVXYq7w3e"
  },
  copyright: { 
    pack: '⚜️ 𝑾𝑰𝑳𝑳𝑰𝑨𝑴 ⚜️', 
    author: '𝑴𝑶𝑹𝑰𝑨𝑹𝑻𝒀'
  },
  images: [
    "https://i.pinimg.com/originals/11/26/97/11269786cdb625c60213212aa66273a9.png",
    "https://i.pinimg.com/originals/e2/21/20/e221203f319df949ee65585a657501a2.jpg",
    "https://i.pinimg.com/originals/bb/77/0f/bb770fad66a634a6b3bf93e9c00bf4e5.jpg"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) { 
sub(client)
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
