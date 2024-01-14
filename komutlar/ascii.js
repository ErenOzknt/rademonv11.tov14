const { MessageEmbed } = require('discord.js');
const figlet = require('figlet');

module.exports = {
    data: {
        name: 'ascii',
        description: 'Ascii şeklinde yazı yazmanızı sağlar.',
        category: 'user',
        options: [
            {
                name: 'mesaj',
                description: 'Ascii yapılacak metin.',
                type: 'STRING',
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const maxLen = 30;
        const args = interaction.options.getString('mesaj');

        if (args.length > maxLen) return interaction.reply(`Çok fazla karakter kullandınız, en fazla ${maxLen} karakter yazabilirsiniz!`);
        if (!args) return interaction.reply('Lütfen geçerli bir yazı giriniz.');

        figlet(`${args}`, function(err, data) {
            if (err) {
                console.log('Bir hata var...');
                console.dir(err);
                return;
            }

            const embed = new MessageEmbed()
                .setDescription('```' + data + '```')
                .setColor('RANDOM');

            interaction.reply({ embeds: [embed] });
        });
    },
};