const { MessageEmbed } = require('discord.js');
const db = require('../../../models/afk');

module.exports = {
  name: 'afk',
  run: async(client, message, args) => {
    const afkreason = args.slice(0).join(' ') || 'No reason';
    db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
      if(data) {
        return;
      } else {
        Data = new db({
          Guild: message.guild.id,
          Member: message.author.id,
          Content: afkreason,
          TimeAgo: Date.now()
        })
        Data.save()
        const afksave = new MessageEmbed()
        .setTitle(`<:right:893330260295311360> ${message.author.tag} is now afk`)
        .setDescription(afkreason)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        message.channel.send({ embeds: [afksave]})
      }
    })
  }
}