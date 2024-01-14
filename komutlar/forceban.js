const { Permissions } = require('discord.js');

module.exports = {
    data: {
        name: 'forceban',
        description: 'Belirtilen kullanıcıyı sunucudan yasaklar.',
        options: [
            {
                name: 'id',
                description: 'Yasaklanacak kullanıcının ID\'si.',
                type: 'STRING',
                required: true,
            },
            {
                name: 'sebep',
                description: 'Yasaklama sebebini belirt.',
                type: 'STRING',
            },
        ],
    },
    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmanız gerek.");

        const userId = interaction.options.getString('id');
        const reason = interaction.options.getString('sebep');

        if (!userId) {
            return interaction.reply(`Bir kullanıcı ID'si belirtmelisiniz.`);
        }

        try {
            const bans = await interaction.guild.bans.fetch();
            if (bans.has(userId)) {
                return interaction.reply(`Bu kullanıcı zaten yasaklanmış.`);
            }

            await interaction.guild.bans.create(userId, { reason });

            const user = await interaction.client.users.fetch(userId);

            interaction.reply(`<@!${user.id}> Adlı kullanıcı başarıyla yasaklandı.`);
        } catch (error) {
            console.error('Hata:', error);
            interaction.reply(`:x: Bir hata oluştu!`);
        }
    },
};