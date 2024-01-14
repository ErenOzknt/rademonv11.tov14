const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');
const http = require('http');
const express = require('express');
const { MessageEmbed } = require('discord.js');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const queue = new Map();
const db = require('quick.db');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Hostlandı!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Map();
client.aliases = new Map();

fs.readdirSync('./komutlar/').forEach(file => {
    const props = require(`./komutlar/${file}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
    });
});

client.on("ready", () => {
  client.channels.cache.get("761356776976678932").join();
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            const cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            const cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            const cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
    if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

client.on("messageCreate", async message => {
  if(!message.author.id === ayarlar.sahip) return;
  if (message.content === "gir") {
    client.emit(
      "guildMemberAdd",
      message.member || (await message.guild.members.fetch(message.author))
    );
  }
});

client.on("messageCreate", msg => {
  if (msg.content === "tag") {
    msg.channel.send("\`ꂸ\`");
  }
});

client.on("messageCreate", msg => {
  if (msg.content === ".haskadro") {
    const embed = new MessageEmbed()
      .setColor('eee3e3')
      .setDescription("Has kadro \nLxeon\nDragonMonster \nWesteria \nFeNiX456");
    msg.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", msg => {
  if (msg.content === "klan") {
    const embed = new MessageEmbed()
      .setColor('eee3e3')
      .setDescription("<a:vurulanvur:760137541965447218> Burada bize katılmak isteyen birilerini görüyorum!\n<a:nykrie_kucak:750661530416316437> Yapman gereken tek şey tagı Discord ismine ekleyip <@&759480328544452693> rolün de olan yetkililere ulaşman!\n' ꏪ");
    msg.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", msg => {
  if (msg.content === "alım var mı") {
    const embed = new MessageEmbed()
      .setColor('eee3e3')
      .setDescription("<a:vurulanvur:760137541965447218> Burada bize katılmak isteyen birilerini görüyorum!\n<a:nykrie_kucak:750661530416316437> Yapman gereken tek şey tagı Discord ismine ekleyip <@&759480328544452693> rolün de olan yetkililere ulaşman!\n' ꏪ");
    msg.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", msg => {
  if (msg.content === "klana nasıl katırılırım") {
    const embed = new MessageEmbed()
      .setColor('eee3e3')
      .setDescription("<a:vurulanvur:760137541965447218> Burada bize katılmak isteyen birilerini görüyorum!\n<a:nykrie_kucak:750661530416316437> Yapman gereken tek şey tagı Discord ismine ekleyip <@&759480328544452693> rolün de olan yetkililere ulaşman!\n' ꏪ");
    msg.channel.send({ embeds: [embed] });
  }
});

client.on("messageCreate", async msg => {
 var i = await db.fetch(`reklam_${msg.guild.id}`)
    if (i == 'acik') {
       const reklam = [".com", ".net", ".gg"];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.permissions.has("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.reply('Hey! D-dostum reklam yapmamalısın.').then(msg => msg.delete({ timeout: 3000 }));
            }
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (i == 'kapali') {
      
    }
    if (!i) return;
  });

client.on('messageCreate', async msg => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa'){
          msg.reply('Aleyküm Selam, Hoşgeldin.');    
        }
      }
});

client.on('messageCreate', async msg => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'hi'){
          msg.reply('Hi welcome to chat!');    
        }
      }
});

// ... Rest of your code

// ... (Your previous code)

client.on("messageDelete", async (message) => {
  if (message.author.bot) return;
  db.set(`atan_${message.channel.id}`, `${message.author.tag}`);
  db.set(`mesaj_${message.channel.id}`, message.content);
  db.set(`sresim_${message.channel.id}`, message.author.avatarURL());
  db.set(`sid_${message.channel.id}`, message.author.id);
});

// KAYIT MESAJ
// NOT: Kendi isteğinize göre buradaki yazıları değiştirin!
client.on("guildMemberAdd", (member) => {
  const codeariushg = [
    `${member} **Hoşgeldin kanka biz de seni bekliyorduk^^** `,
    `${member} **Tam da muhabbete sensiz başlıyorduk!**`,
    `${member} **Hoşgeldin etrafa bakmaya ne dersin?**`,
    `${member} **Geldi parti başlasın!**`,
    `${member} **Uzun bir yoldan gelmiş olmalısın.**`,
    `${member} **Kimleri görüyorum!**`,
    `${member} **Gözlerimiz yollarda kaldı!**`,
    `${member} **Selam ben geldim!**`,
    `${member} **Biz de tam senden bahsediyorduk!**`,
  ];
  const randommesaj = Math.floor(Math.random() * codeariushg.length);

  const codeariusgf = [
    'https://cdn.discordapp.com/attachments/740643026019287201/758064956032942208/2.gif',
    'https://cdn.discordapp.com/attachments/740643026019287201/758065047971954708/11.gif',
    // ... (other gif URLs)
  ];
  const randomgif = Math.floor(Math.random() * codeariusgf.length);

  const sunucuid = "760609538293497879"; // Sunucu id
  const id = "761356769229537280"; // Kanal id
  const kayıtsız = "761356735465259008"; // Kayıtsız rol id

  if (member.guild.id !== sunucuid) return;

  const user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const eskiNick = member.user.username;
  const channel = member.guild.channels.cache.get(id);

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");

  let kontrol;
  if (gün < 14) {
    kontrol = "Güvenilmeyen Kullanıcı!";
    member.roles.add(kayıtsız);
  }
  if (gün >= 14) {
    kontrol = "Güvenilir Kullanıcı!";
    member.roles.add(kayıtsız);
  }
  const emo = moment.duration(kurulus).format("D");
  let emoji;
  if (emo < 14) {
    emoji = client.emojis.cache.get('760137297487462411');
  }
  if (emo >= 14) {
    emoji = client.emojis.cache.get('760137222703546401');
  }

  const codearius = new Discord.MessageEmbed()
    .setDescription(`${codeariushg[randommesaj]}`)
    .addField("Hesap Oluşturma Tarihi", `\`${moment(user.createdAt).format("DD")} ${moment(user.createdAt).format("MM")} ${moment(user.createdAt).format("YYYY")}\``, true)
    .addField("Bu Hesap", `\`${kontrol}\``, true)
    .setThumbnail("https://cdn.discordapp.com/icons/544527577768001538/a_1fa32517dd9fb1d265309255c635b2c0.gif")
    .setImage(codeariusgf[randomgif])
    .setColor('eee3e3');
  channel.send({ embeds: [codearius] });
  channel.send({ content: `<@&761356709188599839>` });
});

// ... (The rest of your code)

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
