const chalk = require('chalk');
const moment = require('moment');
const { Client, GatewayIntentBits } = require('discord.js');
const ayarlar = require('../ayarlar.json');

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

var prefix = ayarlar.prefix;

client.on('ready', () => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("dnd");

  var oyun = [
    "ꂸ » Swat Kingdom. sunucusunu"
  ];

  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);
    client.user.setActivity(oyun[random], { type: "WATCHING" });
  }, 2 * 2500);
});

client.login(ayarlar.token);