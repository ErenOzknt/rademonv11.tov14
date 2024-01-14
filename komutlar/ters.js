const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';

const OFFSET = '!'.charCodeAt(0);

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        msg.reply('Ters yapacağım kelimeyi/yazıyı yazmalısın!');
        return;
    }

    msg.channel.send(
        args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
    );
    msg.react('617413726768988160');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: 'eğlence',
  permLevel: 0
};

exports.help = {
  name: 'ters',
  description: 'Mesajınızı tersden yazar.',
  usage: 'ters <mesaj>'
};
