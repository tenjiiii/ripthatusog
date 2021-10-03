
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "level",
    aliases: ['lvl', 'levl', 'lvel'],

    run: async(client, message, args) => {
        const key = `${message.guild.id}-${message.author.id}`;
        return message.channel.send(`You currently have ${client.points.get(key, "points")} points`);
    }
}