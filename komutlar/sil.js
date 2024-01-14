const { Permissions } = require('discord.js');

exports.run = async function (client, message, args) {
  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return message.reply("Bunun için yeterli yetkiye sahip değilsin!");
  if (!args[0]) return message.channel.send("Silinecek mesajın miktarını yaz.");

  await message.delete();
  message.react('622507169442693143');

  try {
    const messages = await message.channel.messages.fetch({ limit: args[0] });
    await message.channel.bulkDelete(messages);

    message.channel.send(`${args[0]} adet mesaj başarıyla uzay boşluğuna fırlatıldı!`);
  } catch (error) {
    console.error(error);
    message.channel.send("Mesajları silerken bir hata oluştu.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear', 'sil'],
  permLevel: 'MANAGE_MESSAGES'
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil <silinicek mesaj sayısı>'
};
