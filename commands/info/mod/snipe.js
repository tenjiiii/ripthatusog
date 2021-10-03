const { MessageEmbed, Client, Message } = require("discord.js");

module.exports = {
  name: "esnipe",
  category: "",
  description: "Gets the edited messages",
  usage: "",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async(client, message, args) => {
    const esnipes = client.esnipes.get(message.channel.id);
    if (!esnipes) return message.reply("There is no message to snipe!");

    const esnipe = +args[0] - 1 || 0;
    const target = esnipes[esnipe];

    
    if (!target) {
      message.reply(`There are ${snipes.length} messages to snipe.`);
    }
    const { newc, msg } = target;
    
    let lol =  new MessageEmbed()
    .setAuthor(
      msg.author.tag,
      msg.author.displayAvatarURL({ dynamic: true })
    )
    .addField("Old Content", msg.content)
    .addField("New Content", newc.content)
    .setFooter(`Message sniped ${esnipe + 1} out of ${esnipes.length}`)
    .setColor("WHITE")


    message.channel.send({embeds: [lol]})
  },
};