const { Permissions } = require("discord.js");

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) return message.channel.send("Bu komutu kullanabilmek için `Üyeleri Taşı` yetkisine sahip olmalısınız.");

    let kanalId = args[1];
    let kullanici = message.mentions.members.first();

    if (!kullanici) return message.channel.send("Taşıyacağın kişiyi etiketlemelisin.");
    if (!kanalId) return message.channel.send("Taşıyacağın kanalın ID'sini belirtmeyi unuttun.");

    let kanal = message.guild.channels.cache.get(kanalId);

    if (!kanal) return message.channel.send("Belirtilen ID'ye sahip bir kanal bulunamadı.");

    try {
        await kullanici.voice.setChannel(kanal);
        message.channel.send(`${kullanici} <#${kanalId}> adlı kanala taşındı.`);
    } catch (error) {
        console.error(error);
        message.channel.send("Kullanıcıyı belirtilen kanala taşıma sırasında bir hata oluştu.");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['üyeyitaşı'],
    permLevel: 0
};

exports.help = {
    name: 'taşı',
    description: 'İstediğiniz kişiyi bir sesli kanaldan diğerine taşır.',
    usage: 'taşı [kullanıcı] [kanal id]'
};
