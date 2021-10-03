const { MessageEmbed } = require("discord.js")
const schema = require("../../../models/erole")

module.exports = {
  name: "setup-event",
  run: async(client, message, args) => {

    

    const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!role) return message.channel.send(`Incorrect Usage. Please mention a role or role ID!`)
    if (!message.member.roles.cache.some(r=>["Event Manager", "EVENT MANAGER", "event manager", "event staff", "EVENT STAFF", "Event Staff", "༓Event Staff༓"].includes(r.name)))
    return message.reply({ content: `You don't have the \`EVENT STAFF\` or \`EVENT MANAGER\` role to host the heist!`, allowedMentions: { repliedUser: false }, ephemeral: true})
 
    let fail = new MessageEmbed()
    .setTitle("FAILED")
    .setColor("RED")
    .setTimestamp()
    .setDescription("\<:wrong:893330231954386984> Event role for this server is already setted up!")
  
    let success = new MessageEmbed()
    .setTitle("SUCCESS")
    .setDescription(`<:right:893330260295311360> Successfully setted up event role as ${role}`)
    .setColor("GREEN")
    .setTimestamp()

    schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(err) throw err
        if(data) {
        message.channel.send({embeds: [fail]})
        } else {
            data = new schema({
                Guild: message.guild.id,
                eventr: role.id,
            })
            await data.save()
           
            message.channel.send({embeds: [success]})
        }
    })
  }
}