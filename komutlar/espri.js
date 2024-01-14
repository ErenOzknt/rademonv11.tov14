const { MessageEmbed } = require('discord.js');

var hd = [
    " Adamın biri güneşte yanmış, ay da düz.",
    " Ben Yedigün içiyorum sen Onbeşgün iç.",
    " Sinemada on dakika ara dedi, aradım aradım açmadı",
    " Röntgen Filmi çektirdik, yakında sinemalarda",
    " Geçen gün taksi çevirdim hala dönüyor.",
    " Türkiye’nin en yeni şehri – Nevşehir",
    " Adamın biri kızmış istemeye gelmiş.",
    " Uzun lafın kısası : U.L.",
    " Sakla samanı, inekler aç kalsın.",
    " Dünya dönermiş ay da köfte",
    " Ahmet Saz çaldı. Polis tutukladı.",
    " Mehmet Eline veririrm kardeşim ayık ol.",
    ' Mafya babası olmak için oğlumun adını "Mafya" koydum.',
    " Yıkanan ton balığına ne denir? - Washington.",
    "Hava korsanı uçağı kaçıracaktı ama yapamadı çünkü uçağı kaçırdı.",
];

module.exports = {
    data: {
        name: 'espri',
        description: 'Rastgele bir espri yapar.',
    },
    async execute(interaction) {
        const randomEspri = hd[Math.floor(Math.random() * hd.length)];
        const embed = new MessageEmbed()
            .setDescription(`${interaction.user.toString()} ${randomEspri}`)
            .setColor('RANDOM');

        interaction.reply({ embeds: [embed] });
    },
};