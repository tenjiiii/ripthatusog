const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
var em = require("../../embed.json")
const db = require("quick.db")

module.exports ={
    name: "help",
    ownerOnly: false,
    run: async(client, message, args) => {

        let embed = new MessageEmbed()
        .setTitle("Help")
        .setDescription("asd")
        .setColor(em.scolor)
        .setFooter(em.footer)

        message.channel.send({embeds: [embed], components: [btn]})

        
    }
}