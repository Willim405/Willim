import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* ╔════════════════════════════════════════════════════════════════════════════╗
⚜️ 𝑾𝑰𝑳𝑳𝑰𝑨𝑴 ⚜️ 𝑴𝑶𝑹𝑰𝑨𝑹𝑻𝒀 ⚜️
   ☠️ Master of Crime – Moriarty
   ╚════════════════════════════════════════════════════════════════════════════╝ */

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '201038694952', // رقم البوت
  prefix: [".", "/", "!"],
  fromMe: false, 
  owners: [
  // ★ المطور الرئيسي ★
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

/* =========== Config ========== */
const { config } = client;
config.info = { 
  nameBot: "𝑾𝑰𝑳𝑳𝑰𝑨𝑴",
  nameChannel: "𝑾𝑰𝑳𝑳𝑰𝑨𝑴", 
  idChannel: "120363225356834044@newsletter",
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
