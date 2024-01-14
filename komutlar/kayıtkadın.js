const { Permissions, MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, interaction) => {
    const kayityetkili = '761356709188599839'; // Yetkili
    const codeariusver = '761356724581564447'; // Verilecek
    const codeariusal = '761356735465259008'; // Alınacak

    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
        return interaction.reply(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmanız gerek.`);

    const member = interaction.options.getMember('kişi');
    const isim = interaction.options.getString('isim');

    if (!member) return interaction.reply('Bir üye etiketlemelisin.');
    if (!isim) return interaction.reply('Bir isim yazmalısın.');

    const kayıtlımı = await db.fetch(`kayıtlıkişi_${member.id}`);
    const eskiismi = await db.fetch(`kayıtlıisim_${member.id}`);
    const toplamaisim = `${isim}`;

    setTimeout(function () {
        member.setNickname(`» ${isim}`);
    }, 1000);
    setTimeout(function () {
        member.roles.add(codeariusver);
    }, 2000);
    setTimeout(function () {
        member.roles.remove(codeariusal);
    }, 3000);

    const toplam = (await db.fetch(`kayıttoplam_${interaction.user.id}`)) + 1 || '0';

    if (kayıtlımı !== 'evet') {
        db.add(`kayıtk_${interaction.user.id}`, 1);
        db.add(`kayıttoplam_${interaction.user.id}`, 1);
        db.set(`kayıtlıkişi_${member.id}`, 'evet');
        db.set(`kayıtlıisim_${member.id}`, toplamaisim);
        db.push(`eskiad_${member.id}`, toplamaisim);
        db.add(`toplamik_${member.id}`, 1);

        const embed = new MessageEmbed()
            .setColor('eee3e3')
            .setDescription(`**${member} Kişisinden <@&${codeariusal}> rolü alınıp <@&${codeariusver}> rolü verildi.**

<@!${interaction.user.id}> Kişisinin toplam **__${toplam}__** adet teyiti oldu.`)
            .setThumbnail('');

        interaction.reply({ embeds: [embed] });
    }

    if (kayıtlımı === 'evet') {
        db.set(`kayıtlıisim_${member.id}`, toplamaisim);
        db.push(`eskiad_${member.id}`, toplamaisim);
        db.add(`toplamik_${member.id}`, 1);

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(` **Bu kişi daha önceden de kayıt edilmiş!**

**Kullanıcı daha önce bu isimle kayıt edilmiş!** \`${eskiismi}\``)
            .setThumbnail('https://cdn.discordapp.com/icons/544527577768001538/a_1fa32517dd9fb1d265309255c635b2c0.gif');

        interaction.reply({ embeds: [embed] });
    }
};

exports.data = {
    name: 'k',
    description: 'Kadın kullanıcıları kayıt etme komutu.',
    options: [
        {
            name: 'kişi',
            description: 'Kayıt edilecek kişiyi etiketleyin.',
            type: 'USER',
            required: true,
        },
        {
            name: 'isim',
            description: 'Yeni isim.',
            type: 'STRING',
            required: true,
        },
    ],
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kadın'],
    permLevel: 0,
};

exports.help = {
    name: 'k',
    description: 'Kadın kullanıcıları kayıt etme komutu.',
    usage: 'kadın @kişi isim yaş',
};