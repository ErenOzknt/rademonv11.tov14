const { Permissions, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

const sürüm = ayarlar.sürüm;
const prefix = ayarlar.prefix;
const botid = ayarlar.botid;

exports.run = async (client, interaction) => {
    const db = require('quick.db');
    
    if(!interaction.member.roles.cache.has('761356705945616398'))
        return interaction.reply(`Bu komutu kullanabilmek için \`Ban Hammer\` yetkisine sahip olmalısınız.`);
    
    const user = interaction.options.getUser('kullanici');
    const reason = interaction.options.getString('sebep');

    if (!user) {
        const kimi = new MessageEmbed()
            .setColor('eee3e3')
            .setDescription(`Lütfen atmak istediğiniz üyeyi etiketleyin.\n\`${prefix}kick @kullanıcı sebep\` şeklinde kullanın.`);
      
        return interaction.reply({ embeds: [kimi] });
    }

    if (!reason) {
        const sebep = new MessageEmbed()
            .setColor('eee3e3')
            .setDescription(`Lütfen atmak istediğiniz üyeyi neden atmak istediğinizi yazın.\n\`${prefix}kick @kullanıcı sebep\` şeklinde kullanın.`);
      
        return interaction.reply({ embeds: [sebep] });
    }

    if (user.id === interaction.user.id) {
        const kendinimi = new MessageEmbed()
            .setColor('eee3e3')
            .setDescription(`D-dostum kendi mi banlayacaksın?!`);
      
        return interaction.reply({ embeds: [kendinimi] });
    }

    const modlog = client.channels.cache.find(channel => channel.id === '762390769411424296');

    const embed = new MessageEmbed()
        .setColor('BLUE')
        .addField('Banlanan ', `${user.tag} (${user.id})`, true)
        .addField('Yetkili', `${interaction.user.username}#${interaction.user.discriminator}`, true)
        .addField('Sebep', "```" + reason + "```")
        .setThumbnail('https://media1.tenor.co/images/20f769627b04e223c6b3b216abe8eb76/tenor.gif?itemid=8540509');
  
    modlog.send({ embeds: [embed] });

    const dmbildir = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`\`${interaction.guild.name}\` Adlı Sunucuda yaptığınız olumsuz davranışlardan dolayı yasaklandınız.\nYetkilinin girdiği sebep \`\`\`\n${reason}\n\`\`\``);
  
    user.send({ embeds: [dmbildir] });

    interaction.guild.members.kick(user, { reason: reason });

    const embed2 = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`${user} Adlı kullanıcı \`${reason}\` sebebinden dolayı sunucudan uzaklaştırıldı.`);

    interaction.reply({ embeds: [embed2] });
};

exports.data = {
    name: 'kick',
    description: 'İstediğiniz kişiyi sunucudan yasaklar.',
    options: [
        {
            name: 'kullanici',
            description: 'Banlanacak kullanıcıyı etiketleyin.',
            type: 'USER',
            required: true,
        },
        {
            name: 'sebep',
            description: 'Ban sebebini belirtin.',
            type: 'STRING',
            required: true,
        },
    ],
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0,
    kategori: "moderasyon",
    category: "moderation",
};

exports.help = {
    name: 'kick',
    description: 'İstediğiniz kişiyi sunucudan yasaklar.',
    usage: 'yasakla <@kullanıcı> <sebep>',
};