const { MessageEmbed } = require("discord.js")
const schema = require("../../../models/heistrole")

module.exports = {
  name: "setup-heist",
  run: async(client, message, args) => {
    const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!role) return message.channel.send(`Incorrect Usage. Please mention a role or role ID!`)
    if (!message.member.roles.cache.some(r=>["Heist Manager", "HEIST STARTER", "heist manager", "heist starter", "HEIST MANAGER", "Heist Starter", "⊹𓂃heist manager"].includes(r.name)))
    return message.reply({ content: `You don't have the \`HEIST STARTER\` or \`HEIST MANAGER\` role to host the heist!`, allowedMentions: { repliedUser: false }, ephemeral: true})
 
    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(err) throw err
        if(data) {
          let fail = new MessageEmbed()
    .setTitle("FAILED")
    .setColor("RED")
    .setTimestamp()
    .setDescription("\<:wrong:893330231954386984> Heist role for this server is already setted up!")
  
            message.channel.send({embeds: [fail]})
        } else {
            data = new schema({
                Guild: message.guild.id,
                heistr: role.id,
            })
            await data.save()
            let success = new MessageEmbed()
            .setTitle("SUCCESS")
            .setDescription(`<:right:893330260295311360> Successfully setted up heist role as ${role}`)
            .setColor("GREEN")
            .setTimestamp()
            message.channel.send({embeds: [success]})
        }
    })
  }
}