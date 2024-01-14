const { MessageEmbed } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
const { clientId, guildId, token } = require('../ayarlar.json');

var sürüm = '1.0.0';  // Ayarlar dosyanızda 'sürüm' alanının bulunmaması durumunda elle ekleyebilirsiniz.
var prefix = '!'; // Ayarlar dosyanızda 'prefix' alanının bulunmaması durumunda elle ekleyebilirsiniz.

module.exports = {
    data: {
        name: 'ban',
        description: 'İstediğiniz kişiyi sunucudan yasaklar.',
        options: [
            {
                name: 'kullanici',
                description: 'Yasaklanacak kullanıcıyı etiketle.',
                type: 'USER',
                required: true,
            },
            {
                name: 'sebep',
                description: 'Yasaklama sebebini belirt.',
                type: 'STRING',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const db = require('quick.db');

        if (!interaction.member.roles.cache.has('761356705945616398')) return interaction.reply(`Bu komutu kullanabilmek için Ban Hammer yetkisine sahip olmanız gerek.`);

        const user = interaction.options.getUser('kullanici');
        const reason = interaction.options.getString('sebep');

        if (user.id === interaction.user.id) return interaction.reply(`D-dostum sen benimle dalga mı geçiyorsun kendini mi banlatacaksın!?`);
        if (!interaction.guild.members.cache.get(user.id).bannable) return interaction.reply(`Bu kişiyi sunucudan yasaklayamıyorum çünkü yetkisi benden yüksek!`);

        const embed = new MessageEmbed()
            .setColor('eee3e3')
            .addField('Banlanan ', `${user.tag} (${user.id})`, true)
            .addField('Yetkili', `${interaction.user.username}#${interaction.user.discriminator}`, true)
            .addField('Sebep', `\`\`\`${reason}\`\`\``)
            .setThumbnail('https://media1.tenor.co/images/20f769627b04e223c6b3b216abe8eb76/tenor.gif?itemid=8540509');

        interaction.guild.channels.cache.get('762390769411424296').send({ embeds: [embed] });

        const dmbildir = new MessageEmbed()
            .setColor('eee3e3')
            .setDescription(`\`${interaction.guild.name}\` Adlı Sunucuda yaptığınız olumsuz davranışlardan dolayı yasaklandınız.\nYetkilinin girdiği sebep \`\`\`\n${reason}\n\`\`\``);

        user.send({ embeds: [dmbildir] });

        await interaction.guild.members.ban(user.id, { reason: reason });

        const embed2 = new MessageEmbed()
            .setColor('eee3e3')
            .setDescription(`${user} Adlı kullanıcı \`${reason}\` sebebinden dolayı sunucudan uzaklaştırıldı.`);

        interaction.reply({ embeds: [embed2] });
    },
};