const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'advice',
  aliases: [ 'tips', 'advise' ],
  group: 'fun',
  description: 'Generate a random useless advice',
  clientPermissions: [ 'EMBED_LINKS' ],
  examples: [
    'advice',
    'tips',
    'advise'
  ],
  run: async (client, message, args) => {

    const data = await fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send({content: `Server Error 5xx: Advice API is currently down!`});
    };

    
    message.channel.send({ embeds: [new MessageEmbed().setTitle(data.slip.advice).setFooter(`Advice | \©️${new Date().getFullYear()} vcut.dev`)] })
  }
};