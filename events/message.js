const { Permissions, MessageEmbed } = require('discord.js');
const { prefix, sahip } = require('../ayarlar.json');

let talkedRecently = new Set();

module.exports = interaction => {
    if (talkedRecently.has(interaction.user.id)) {
        return;
    }

    talkedRecently.add(interaction.user.id);
    setTimeout(() => {
        talkedRecently.delete(interaction.user.id);
    }, 2500);

    let client = interaction.client;

    if (interaction.user.bot) return;
    if (!interaction.commandName.startsWith(prefix)) return;

    let command = interaction.commandName.slice(prefix.length);
    let params = interaction.options._hoistedOptions.map(option => option.value);
    let perms = client.elevation(interaction);

    let cmd;
    
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }

    if (cmd) {
        if (cmd.conf.enabled === false) {
            if (!sahip.includes(interaction.user.id)) {
                const embed = new MessageEmbed()
                    .setDescription(`:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                    .setColor("RED");
                return interaction.reply({ embeds: [embed] });
            }
        }

        if (cmd.conf.permLevel === 1) {
            if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                const embed = new MessageEmbed()
                    .setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`)
                    .setColor("RED");
                return interaction.reply({ embeds: [embed] });
            }
        }
        
        if (cmd.conf.permLevel === 2) {
            if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                const embed = new MessageEmbed()
                    .setDescription(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`)
                    .setColor("RED");
                return interaction.reply({ embeds: [embed] });
            }
        }

        if (cmd.conf.permLevel === 3) {
            if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                const embed = new MessageEmbed()
                    .setDescription(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`)
                    .setColor("RED");
                return interaction.reply({ embeds: [embed] });
            }
        }

        if (cmd.conf.permLevel === 4) {
            if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                const embed = new MessageEmbed()
                    .setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
                    .setColor("RED");
                return interaction.reply({ embeds: [embed] });
            }
        }

        if (cmd.conf.permLevel === 5) {
            if (!sahip.includes(interaction.user.id)) {
                const embed = new MessageEmbed()
                    .setDescription(`Bu komutu sadece **sahibim** kullanabilir!`)
                    .setColor("RED");
                return interaction.reply({ embeds: [embed] });
            }
        }

        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, interaction, params, perms);
    }
};