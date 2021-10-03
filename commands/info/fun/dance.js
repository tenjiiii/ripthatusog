const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'dance',
  description: 'dance dance',
  run: async (client, message, args) => {
     const embed = new MessageEmbed()
         .setTitle(`${message.author.username} is dancing...`)
        .setImage(await anime.dance())
        .setColor('#03fcf8')
   message.channel.send({ embeds: [embed]})
}
} 