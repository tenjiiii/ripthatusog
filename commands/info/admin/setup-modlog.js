const { MessageEmbed } = require("discord.js")
const Schema = require("../../../models/modlogChannel")
var em = require("../../../embed.json")
const modlogChannel = require("../../../models/modlogChannel")

module.exports = {
     name: "setup-modlog",
     aliases: ['s-modlog'],
     run: async(client, message, args) => {
     
        if(!message.member.permissions.has('MANAGE_GUILD')) return message.reply('<:wrong:893330231954386984> You dont have \`MANAGE_GUILD\` to use this command')

        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`<:wrong:893330231954386984> Incorrect Usages!\n\nCorrect Usages: \`setup-modlog #channel\``);
        
        Schema.findOne({ Guildlog: message.guild.id }, async(err, data) => {
            if(err) throw err
        if(data) {
              let fail = new MessageEmbed()
        .setTitle("FAILED")
        .setColor("RED")
        .setTimestamp()
        .setDescription("\<:wrong:893330231954386984>  Bleuz modlog for this server is already setted up!")
                message.channel.send({embeds: [fail]})
        } else {
          data = new Schema({
            Guildlog: message.guild.id,
            modlogChannel: channel.id
          })
          await data.save()
          let embed = new MessageEmbed()
          .setTitle("SUCCESS")
          .setDescription(`${em.remoji} Setted ${channel} as Bleuz modlogs`)
          .setColor("GREEN")
          
          message.reply({embeds: [embed]})
        }
     })
    }
}