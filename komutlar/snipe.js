const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, params) => {
  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
    return message.channel.send(`Bu komutu kullanabilmek için \`Teyit\` yetkisine sahip olmalısınız.`);

  let atan = await db.fetch(`atan_${message.channel.id}`);
  let mesaj = await db.fetch(`mesaj_${message.channel.id}`);
  let resim = await db.fetch(`sresim_${message.channel.id}`);
  let id = await db.fetch(`sid_${message.channel.id}`);

  if (mesaj == null) {
    const embed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor('eee3e3')
      .setDescription('Son silinen mesajı bulamadım sanırım mesaj çok eski veya bu kanalda hiç mesaj silinmemiş.')
      .setTimestamp();
    return message.channel.send({ embeds: [embed] });
  }

  const embed = new MessageEmbed()
    .setAuthor(`${atan} (${id})`, resim)
    .setColor('eee3e3')
    .setDescription(`${mesaj}`)
    .setFooter(`#${message.channel.name} adlı kanaldaki silinen son mesaj.`, message.guild.iconURL())
    .setTimestamp();
  message.channel.send({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'snipe',
  description: 'Kanalda son silinen mesajı gösterir',
  usage: 'snipe',
};
