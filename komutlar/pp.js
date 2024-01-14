const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
  let mention = message.mentions.users.first();
  let sender = "";

  if (!message.guild.member(message.author).nickname) {
    sender = message.author.username;
  } else {
    sender = message.guild.member(message.author).nickname;
  }

  if (mention) {
    const avatarEmbedOther = new MessageEmbed()
      .setAuthor(mention.username, mention.avatarURL())
      .setColor("eee3e3")
      .setImage(mention.avatarURL())
      .setFooter(
        `${message.author.tag} tarafından istendi.`,
        message.author.avatarURL()
      );
    message.channel.send({ embeds: [avatarEmbedOther] });
    return;
  } else {
    const avatarEmbedYou = new MessageEmbed()
      .setAuthor(sender, message.author.avatarURL())
      .setColor("eee3e3")
      .setImage(message.author.avatarURL())
      .setFooter(
        `${message.author.tag} tarafından istendi.`,
        message.author.avatarURL()
      );
    message.channel.send({ embeds: [avatarEmbedYou] });
    return;
  }
  message.channel.send("Hata!");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar", "pp"],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "avatar",
  description: "Etiketlediğiniz veya Kendinizin Profil Fotosunu Gösterir.",
  usage: "/pp <etiket> veya /avatar"
};
