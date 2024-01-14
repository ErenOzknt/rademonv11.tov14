const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
module.exports.run = async (client, message, member) => {
let prefix = (ayarlar.prefix)



const embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setTitle(`<a:yldz:744307074422538365> SWAT Kingdom **(v0.1)** Prefix **(${prefix})** Dil **(TR)**`) 
.setDescription(`**<:polis:760140848586424361> Yetkili komutları**\nban = Belirtilen kullanıcıyı banlar.\nforceban = Sunucu da olan olmayan birisini banlar.\nkick = Belirtilen kullanıcıyı atar.\nslowmode = Yavaş mod açılır.\njail = Belirtilen kullanıcıyı jaile yollar.\nsnipe = Son mesajı listeler.\ntaşı = Belirtilen kullanıcıyı id ile kanala taşır.\nyetkililer = Sunucu da kaç adet yetkili olduğunu gösterir.
\n**<a:yldz:744307074422538365>  Klan alım komutları**\nswat = Erkek üyeler için klan alım komutu .swat @etiket Nick İsim\nlady = Kız üyeler için klan alım komutu .lady @etiket Nick İsim\n**<a:yldz:744307074422538365> Klan rollerini almak için**\n.swatsil @etiket İsim Yaş\n.ladysil @etiket İsim Yaş
\n**<a:kure:760137862254559283> Kayıt komutları**\nerkek = Erkek üyeleri kayıt eder. @etiket İsim Yaş \nkadın = Kız üyeleri kayıt eder. @etiket İsim Yaş\nisimler = Belirtilen üyenin geçmiş isimlerini listeler.\nteyit = Teyit bilgisini gösterir.\nteyitsıfırla = Belirtilen kullanıcının teyit bilgilerini sıfırlar.
\n**<:nykrie_yanak:750661524800012339> Eğlence komutları**\nespri = Mükemmel esprileri denemelisin.\nmalafat = Göster gücünü :)\nsor = Bota soru sorarsınız.\nascii = Yazınızı ascii olarak atar.
\n\nBütün komutları kullanmadan önce prefix ile deneyiniz yetkinizin yetersiz olduğu komutları kullanmamanızı tavsiye ederiz.

`) 
.setFooter( `${message.author.tag} tarafından istendi.`,
           message.author.avatarURL)
.setColor("BLUE") 


  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım'],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "yardım",
  description: "yardım",
  usage: "yardım"
};