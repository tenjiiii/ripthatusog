let { MessageEmbed } = require("discord.js")
var em = require("../../../embed.json")
module.exports = {
  name: "choose",
  description: 'trash cmd',
   run: async (client, message, args) => { 

      let umay = new MessageEmbed()
      .setTitle("<:wrong:893330231954386984> Wrong Usage")
      .setDescription("<:right:893330260295311360> Right usage: \`,choose item1/item2\`")
      .setFooter(em.footer)
      .setColor(em.wcolor)


     const text1 = args.join(" ").split("/")[0]
const text2 = args.join(" ").split("/")[1]
if (!text1) return message.channel.send({embeds: [umay]})
if (!text2) return message.channel.send({embeds: [umay]})
let t = [`${text1}`, `${text2}`]
let ichoose = t[Math.floor(Math.random()*t.length)];
let e = new MessageEmbed()

.setTitle("Chooser Machine")
.setDescription(`I choose: \`${ichoose}\``)
.setColor("GREEN")
.setFooter(em.footer)
message.channel.send({embeds: [e]})
   }
}