const { Client, Collection, MessageEmbed } = require("discord.js");
const GuildConfig = require("./models/GuildConfig")


const client = new Client({
    intents: 32767,
        disableMention: 'everyone',
        shards: 'auto',
        restTimeOffset: 0
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

const progressBar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';

const target = 100;
const current = 50;

const ratio = Math.floor((current / target) * progressBar.length);

const newProgressBar = progressBar.substring(0, ratio) + '🔵' + progressBar.substring(ratio + 1, progressBar.length)
console.log(newProgressBar)


// Initializing the project
require("./handler")(client);

const RoleSchema = require('./models/autorole')
client.on("guildMemberAdd", async (member, guild) => {
    RoleSchema.findOne({ Guild: member.guild.id }, async (err, data) => {
          if (!data) return;
          if (data) {
              const role = member.guild.roles.cache.find(role => role.id == data.Role);
              if (!role) {
                  console.log(
                      `Auto Role: ${data.Role} for ${member.guild.id} was deleted`
                  );
                  return data.delete()
              }
              member.roles.add(role.id);
          }
        })
    })

  // mongoose  
   const db = require("./models/afk")
   const moment = require('moment');
  client.on('messageCreate', async(message) => {
    if(message.author.bot) return;
    db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
      if(err) throw err;
      if(data) {
        data.delete()
        const afk = new MessageEmbed()
        .setTitle('Afk Removed')
        .setDescription(`${message.author.tag} afk has been removed`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        message.channel.send({ embeds: [afk]})
      } else return;
    })
    
    if(message.mentions.members.first()) {
      db.findOne({ Guild: message.guild.id, Member: message.mentions.members.first().id }, async(err, data) => {
        if(err) throw err;
        if(data) {
          const member = message.guild.members.cache.get(data.Member);
          const afk = new MessageEmbed()
          .setTitle(`${member.user.tag} is Afk`)
          .setDescription(`${data.Content} - ${moment(parseInt(data.TimeAgo)).fromNow()}`)
          .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          
          message.channel.send({ embeds: [afk]})
        } else return;
      })
    }

})

  //for esnipe command

client.esnipes = new Collection();
client.on("messageUpdate", async (oldMsg, newMsg) => {
  let esnipes = client.esnipes.get(oldMsg.channel.id) || [];
  if (esnipes.length > 5) esnipes = esnipes.slice(0, 4);
  esnipes.unshift({
    msg: oldMsg,
    newc: newMsg,
    author: oldMsg.author,
  });
  client.esnipes.set(oldMsg.channel.id, esnipes);
});
  
const Enmap = require("enmap");
client.points = new Enmap("points");

client.on("messageCreate", message => {
  // As usual, ignore all bots.
  if (message.author.bot) return;

  // If this is not in a DM, execute the points code.
  if (message.guild) {
    // We'll use the key often enough that simplifying it is worth the trouble.
    const key = `${message.guild.id}-${message.author.id}`;

    // Triggers on new users we haven't seen before.
    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 1
    });

    client.points.inc(key, "points");

    // Calculate the user's current level
    const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));

    // Act upon level up by sending a message and updating the user's level in enmap.
    if (client.points.get(key, "level") < curLevel) {
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that \`cool\`?`);
      client.points.set(key, curLevel, "level");
    }
  }
});



client.login(client.config.token);