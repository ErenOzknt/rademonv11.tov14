const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const ayarlar = require("../ayarlar.json");
let emoji = '<a:tik1:743243264135659530>';

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== ayarlar.sahip)
    return message.channel.send("Erişim bulunmamaktadır!");

  message.channel.send(`${emoji} Sistem yenilemesi başarılı.`);
  message.delete({ timeout: 60000 }).then(msg => {
    console.log(`✅ | Bot Yeniden Başlatıldı...`);
    process.exit(0);
  });
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r", "reboot", "yenile", "yeniden başlat"],
  permLevel: 0
};

module.exports.help = {
  name: "reboot",
  description: "",
  usage: "reboot"
};
