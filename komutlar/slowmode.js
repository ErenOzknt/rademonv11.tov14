const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    const embed = new MessageEmbed()
      .setDescription(`Ne yazık ki bu komutu kullanmaya yetkin yok.`)
      .setColor("eee3e3");

    message.channel.send({ embeds: [embed] });
    return;
  }
  if (message.channel.type !== "GUILD_TEXT") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new MessageEmbed()
      .setDescription(`Lütfen bir limit belirtiniz (1-20).`)
      .setColor("eee3e3");

    message.channel.send({ embeds: [embed] });
    return;
  }

  let number = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20"
  ];

  if (!number.some(word => message.content.includes(word))) {
    {
      const embed = new MessageEmbed()
        .setDescription(`Süre limiti sadece sayı olabilir`)
        .setColor("BLUE");

      message.channel.send({ embeds: [embed] });
      return;
    }
  }

  if (limit > 20) {
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setDescription("Süre limiti maksimum 20 saniye olabilir.")
          .setColor("BLUE")
      ]
    });
  }

  message.channel.send({
    embeds: [
      new MessageEmbed()
        .setDescription(
          `Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`
        )
        .setColor("BLUE")
    ]
  });

  await message.channel.edit({ rateLimitPerUser: limit });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yavaş-mod"],
  permLevel: "MANAGE_MESSAGES",
  kategori: "moderasyon"
};

exports.help = {
  name: "slowmode",
  description: "Sohbete yazma sınır (süre) ekler.",
  usage: "slowmode [1/20]"
};
