const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle('Ping')
    .setColor("eee3e3")
    .setDescription(`:ping_pong: Ping Pong! ${client.ws.ping}ms `, message.author.username)
    .setThumbnail(client.user.avatarURL());

  message.channel.send({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping komutudur.',
  usage: 'ping'
};
