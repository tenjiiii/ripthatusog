const { MessageEmbed, MessageSelectMenu } = require("discord.js")
const Schema = require("../../../models/guild")

module.exports = {
    name: "freeloader",
    run: async(client, message, args) => {
       
        if (args[0] === "enable") {
      
            if(!message.member.permissions.has('MANAGE_GUILD')) return message.reply('<:wrong:893330231954386984> You Dont Have Permiss!')

            const channel = message.mentions.channels.first()
            if(!channel) return message.channel.send(`<:wrong:893330231954386984> Incorrect Usages!\n\nCorrect Usages: \`,freeloader setup #channel\``);
            
            Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            
            if(data) {
              data.freeloaderChannel = channel.id;
              data.save()
            } else {
              new Schema({
                Guild: message.guild.id,
                freeloaderChannel: channel.id,
              }).save()
            }
            message.reply(`${channel} has been set as **Freeloader logs**.`)
            })
}
       if (args[0] === "disable") {
     
            if(!message.member.permissions.has('MANAGE_GUILD')) return message.reply('You Dont Have Permiss!')     
            Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
              if(err) throw err
              if(!data) {
                  message.channel.send(`<:wrong:893330231954386984> Anti-freeloader for this server is reseted already`)
              } else {
                  await Schema.findOneAndDelete({ Guild: message.guild.id })
                  message.channel.send(`<:right:893330260295311360> | Anti-freeloader Module has been disabled`)
              }
          })
              }

}
}