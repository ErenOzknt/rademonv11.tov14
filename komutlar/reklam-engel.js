const { Permissions } = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply('Bunun için yeterli yetkiye sahip değilsin!');

    if (!args[0]) return message.reply(`Reklam sistemi değişkenleri aç/kapat`);

    if (args[0] === 'aç') {
        var durum = await db.fetch(`reklam_${message.guild.id}`);
        if (durum === "acik") return message.channel.send("Önceden açılmış olan bir sistemi açamazsın.");
        db.set(`reklam_${message.guild.id}`, 'acik');
        message.channel.send(`Reklam Engel sistemi açıldı.`);
    }

    if (args[0] === 'kapat') {
        var durum = await db.fetch(`reklam_${message.guild.id}`);
        if (durum === "kapali") return message.channel.send("Önceden kapatılmış olan bir sistemi kapatamazsın.");
        db.set(`reklam_${message.guild.id}`, 'kapali');
        message.channel.send(`Reklam Engel sistemi kapatıldı.`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'ADMINISTRATOR'
};

exports.help = {
    name: 'reklam-engel',
    description: '',
    usage: 'reklam-engel'
};
