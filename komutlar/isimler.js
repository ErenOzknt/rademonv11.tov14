const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, interaction) => {
  const kayityetkili = '761356709188599839'; // Kayıt yetkilisi ID
  if (!interaction.member.roles.cache.has(kayityetkili))
    return interaction.reply(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);

  const member = interaction.options.getUser('kişi');
  if (!member) return interaction.reply('Bir kişiyi etiketlemelisin.');

  const eskiIsimler = await db.fetch(`eskiad_${member.id}`) || [];
  const toplamIsimKayit = await db.fetch(`toplamik_${member.id}`) || 0;

  const kayitliIsimler = eskiIsimler.join('\n') || 'Eski ismi yok';

  const kayitliIsimlerEmbed = new MessageEmbed()
    .setColor('eee3e3')
    .setAuthor(member.tag, member.avatarURL())
    .setDescription(`Bu üyenin toplamda \`${toplamIsimKayit}\` isim kaydı bulundu:\n\n${kayitliIsimler}`)
    .setThumbnail('https://cdn.discordapp.com/icons/544527577768001538/a_1fa32517dd9fb1d265309255c635b2c0.gif');

  interaction.reply({ embeds: [kayitliIsimlerEmbed] });
};

exports.data = {
  name: 'isimler',
  description: 'Kişinin eski isimlerini gösterir.',
  options: [
    {
      name: 'kişi',
      description: 'Eski isimlerini görmek istediğiniz kişiyi etiketleyin.',
      type: 'USER',
      required: true,
    },
  ],
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'isimler',
  description: 'Kişinin eski isimlerini gösterir.',
  usage: 'isimler @kişi',
};