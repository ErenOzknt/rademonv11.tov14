const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = (client, message, args, member ) => {
 if (!message.member.hasPermission("BAN_MEMBERS")) 
{
    const prmlv = new Discord.RichEmbed()
    .setColor('eee3e3')
    .setDescription('Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!')
   return message.channel.send(prmlv)
  } 
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor('eee3e3')
  .addField('Uyarı ', '`unban`komutu özel mesajlarda kullanılamaz.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  if (!user) {
    const bid = new Discord.RichEmbed()
    .setColor('eee3e3')
    .setDescription('Banı kaldırılacak kişinin ID numarasını yazmalısın! \n Doğru kullanım:`.unban (ID) (Sebep)`')
   return message.channel.send(bid).catch(console.error);
  } 
  if (reason.length < 1) {
    const reas = new Discord.RichEmbed()
    .setColor('eee3e3')
    .setDescription('Ban kaldırma sebebini yazmalısın!') 
   return message.channel.send(reas)
  } 
 
  
  message.guild.unban(user);
  const embed = new Discord.RichEmbed()
    .setColor('eee3e3')

    .setDescription('Yasak kaldırıldı! ')
    .addField('Kullanıcı', `<@!${user}>`,true)
    .addField('Yetkili', `<@!${message.author.id}>`,true)
    .addField('Sebebi', reason,false)
    
   message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};