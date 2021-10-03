const { MessageEmbed, permissionOverwrites } = require("discord.js")
const ms = require("ms")

module.exports = {
  name: "heist",
  aliases: ['h'],

  run: async(client, message, args) => {
      if (!message.member.roles.cache.some(r=>["Heist Manager", "HEIST STARTER", "heist manager", "heist starter", "HEIST MANAGER", "Heist Starter", "⊹𓂃heist manager"].includes(r.name)))
      return message.reply({ content: `You don't have the \`HEIST STARTER\` or \`HEIST MANAGER\` role to host the heist!`, allowedMentions: { repliedUser: false }, ephemeral: true})
     
    let time = 500000
     let req = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
     
     let succembed = new MessageEmbed()
     .setTitle("UNLOCKED")
     .setDescription(`Locked for \`@everyone\` and unlocked for ${req}\n-Withdraw 2000\n-Click the button once started\n-Enjoy the cool heist`)
     .setFooter("Unlocking for @everyone after the heist")
     .setTimestamp()
     .setColor("GREEN")
    
    let embedgg = new MessageEmbed()
    .setTitle("GG")
    .setDescription("Unlocked for \`@everyone\`")
    .setColor("GREEN")
    .setTimestamp()

    if (!req) return message.channel.send(`Please mention or put a role ID!`)

    message.channel.send({embeds: [succembed]})
message.channel.permissionOverwrites.edit(req, { VIEW_CHANNEL: true}) 
 message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: false})
    
    setTimeout(async () => {
     message.channel.permissionOverwrites.edit(req, { VIEW_CHANNEL: false}) 
 message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { VIEW_CHANNEL: true})
   
 message.channel.send({embeds: [embedgg]})
}, time) 
}

}
