const codare = require("discord.js");

exports.run = async (client, message, x) => {
  
  /*if (!message.member.hasPermission('716777613858701415')) return message.channel.send("Bu komutu kullanabilmek için `Confirmation` yetkisine sahip olmanız gerek.")*/
  let yetkili = message.member.roles.get("761356709188599839");

    let kullanici = message.guild.members.filter(
      kullanici =>
        kullanici.highestRole.position >= yetkili.position &&
        kullanici.presence.status !== "online"
    );

    message.channel.send(
      new codare.RichEmbed()
        .setColor('eee3e3') 
        .setThumbnail('https://media.giphy.com/media/HJ7vV2YUBHnYA/giphy.gif')
        .setTitle(`Toplam sunucu da bulunan yetkili sayısı`)
        .setDescription(`Toplam ${kullanici.size} yetkili bulunmakta.`)
    );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yetkililer"],
  permLevel: 0
};

exports.help = {
  name: "yetkililer",
  description: "Seste olmayan yetkilileri gösterir.",
  usage: "yetkililer"
};
