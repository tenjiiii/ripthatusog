const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: 'dm',
    aliases : 'message',
    category: "util",
    description: 'Message someone',
    usage: 'dm <@user> <text>',
    run: async (client, message, args) => {
    let user = message.mentions.users.first()
    if(!user) {
      return message.channel.send('Mention someone first')
    }
    let embed = new MessageEmbed()
    .setTitle(`📨Message From ${message.author.tag}`)
    .setDescription(`💌**__Message:__**
    ${args[1]}`)
    user.send({ embeds: [embed] })
    message.channel.send(`Sending...`).then(m4 => {
setTimeout(() => {
m4.edit(`📮 **Message has been sent!**`)
}, 2000);
});
}
}