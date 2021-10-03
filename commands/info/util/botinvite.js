const { MessageEmbed } = require("discord.js")
var em = require("../../../embed.json")
 
module.exports = {
    name: 'botinvite',
    description: 'Generate an invite for a bot with their id',
    aliases: ['bi'],

    run: async (client, message, args) => {


        const id = args.slice(0).join(' ');

        let lamao = new MessageEmbed()
        .setAuthor('\u200b', message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(
            'https://discord.com/oauth2/authorize?client_id=' +
                id +
                '&scope=bot&permissions=8'
        )
        .setColor(em.scolor)
        .setFooter(em.footer)

        message.channel.send({embeds: [lamao]})
    }
};