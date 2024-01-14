const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, interaction) => {
    try {
        const commandList = client.commands.map(props => `\`${props.help.name}\``).join(" - ");
        const embed = new MessageEmbed()
            .setDescription(`Komut listesinde ${client.commands.size} adet komut bulunmaktadır. \n${commandList}`);
        await interaction.reply({ embeds: [embed] });
    } catch (e) {
        throw e;
    }
};

module.exports.data = {
    name: 'komutlar',
    description: 'Botta bulunan tüm komutları gösterir',
    options: [],
};

module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["commands"],
    permLevel: 0,
};

module.exports.help = {
    name: 'komutlar',
    description: 'Botta bulunan tüm komutları gösterir',
    usage: 'commands',
};