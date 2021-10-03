const { MessageEmbed, Message } = require("discord.js")
const schemaheist = require("../../../models/heistrole")
const schemaga = require("../../../models/garole")
const e = require("../../../models/erole")

module.exports = {
  name: "roleping",
  run: async(client, message, args) => {
     if (args[0] === "heist") {
      if (!message.member.roles.cache.some(r=>["Heist Manager", "HEIST STARTER", "heist manager", "heist starter", "HEIST MANAGER", "Heist Starter", "⊹𓂃heist manager"].includes(r.name)))
      return message.reply({ content: `You don't have the \`HEIST STARTER\` or \`HEIST MANAGER\` role to host the heist!`, allowedMentions: { repliedUser: false }, ephemeral: true})
   
         let sponsor = args[1]
         let amount = args[2]
         const req = args.slice(3).join(" ") || "None";

         let embed = new MessageEmbed()
         .setTitle("HEIST")
         .setDescription(`<:emoji_10:893332405316907028> Sponsor: **${sponsor}**\n<:shieldasd:893330777486553129> Amount: **${amount}**\n<:emoji_11:893332549068292118> Requirement: **${req}**`)

       schemaheist.findOne({Guild: message.guild.id}, async (err, data) => {
         if (!data) return message.reply("There is no heist role setted up")
         if (data) {
           const heist = message.member.guild.roles.cache.find(role => role.id == data.heistr)
           if (!heist) {
             message.reply("Can\'t find role!")
             return data.delete();
           }
           message.channel.send({content: `${heist}`,  embeds: [embed]})
         }
       })
      }
      if (args[0] === "giveaway") {
        
        if (!message.member.roles.cache.some(r=>["Giveaway Manager", "GIVEAWAY MANAGER", "giveaway manager", "giveaway staff", "Giveaway staff", "GIVEAWAY STAFF", "༓Giveaway Staff༓"].includes(r.name)))
        return message.reply({ content: `You don't have the \`GIVEAWAY\` or \`GIVEAWAY STAFF\` role to ping the giveaway role!`, allowedMentions: { repliedUser: false }, ephemeral: true})
     

        let sponsor = args[1]
        let time = args[2]
        let req = args[3]
        let prize = args.slice(4).join(" ")

         let embed = new MessageEmbed()
         .setTitle("GIVEAWAY")
         .setDescription(`<:shieldasd:893330777486553129> Prize: **${prize}**\n<:emoji_10:893332405316907028> Sponsor: **${sponsor}**\n<:emoji_10:893332486166298634> Time: **${time}**\n<:emoji_11:893332549068292118> Requirement: **${req}**`)
        schemaga.findOne({Guild: message.guild.id}, async (err, data) => {
          if (!data) return message.reply("There is no giveaway role setted up")
          if (data) {
            const giv = message.member.guild.roles.cache.find(role => role.id == data.giveawayr)
            if (!giv) {
              message.reply("Can\'t find role!")
              return data.delete();
            }
            message.channel.send({content: `${giv}`, embeds: [embed]})
          }
        })
      }
      if (args[0] === "event") {

        if (!message.member.roles.cache.some(r=>["Event Manager", "EVENT MANAGER", "event manager", "event staff", "EVENT STAFF", "Event Staff", "༓Event Staff༓"].includes(r.name)))
        return message.reply({ content: `You don't have the \`EVENT STAFF\` or \`EVENT MANAGER\` role to host the heist!`, allowedMentions: { repliedUser: false }, ephemeral: true})
     

        let sponsor = args[1]
        let req = args[2] || "none"
        const prize = args[3] || "EVENT"
        const event = args.slice(4).join(" ")
       
        let embed = new MessageEmbed()
        .setTitle(`${event}`)
        .setDescription(`<:emoji_10:893332405316907028> Sponsor **${sponsor}**\n<:shieldasd:893330777486553129> Prize: **${prize}**\n<:emoji_11:893332549068292118> Requirement: **${req}**`)
        e.findOne({Guild: message.guild.id}, async (err, data) => {
          if (!data) return message.reply("There is no event role setted up")
          if (data) {
            const ev = message.member.guild.roles.cache.find(role => role.id == data.eventr)
            if (!ev) {
              message.reply("Can\'t find role!")
              return data.delete();
            }
          message.channel.send({content: `${ev}`, embeds: [embed]})
          }
        })
      }
  }
}