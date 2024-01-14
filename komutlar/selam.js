const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Bu komutu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
  if (!args[0]) return message.channel.send('Selam sistemi açılmamış!')

  if (args[0] == 'kapat') {
    db.set(`saas_${message.guild.id}`, 'kapalı')
      message.channel.send(`Selam sistemi kapatıldı.`)
   
  }
  if (args[0] == 'aç') {
    db.set(`saas_${message.guild.id}`, 'açık')
      message.channel.send(`Selam sistemi açıldı.`)
   
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['selam'],
  permLevel: 0
};

exports.help = {
  name: 'selam',
  description: 'Selamün aleyküm, Aleyküm selam',
  usage: 'selam'
};