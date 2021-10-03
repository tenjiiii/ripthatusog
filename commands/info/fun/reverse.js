const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "reverse",
    description: "reverse your text!",
    category: "Fun",
    /**
     * @param {Client} client
     * @param {Message} message 
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args.length) return message.reply({content: ` Please supply some text!`})
        message.reply({content: `<${args.join(" ").split("").reverse().join("")}`})
    }
}