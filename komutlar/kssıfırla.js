const { Permissions } = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın.');

  let kişi = message.mentions.users.first();
  if (!kişi) return message.channel.send('Bir kişiyi etiketlemen gerekiyor.');

  if (kişi) {
    message.channel.send(`<@!${kişi.id}> Kişisinin bütün teyit bilgileri başarıyla sıfırlandı.`);

    db.delete(`kayıte_${kişi.id}`);
    db.delete(`kayıtk_${kişi.id}`);
    db.delete(`kayıta_${kişi.id}`);
    db.delete(`kayıttoplam_${kişi.id}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'ADMINISTRATOR'
};

exports.help = {
  name: 'teyitsıfırla'
};
