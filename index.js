/*
 *  Basic Embed Discord Bot Code
 *  For Discord.JS V12
 *  - PrinceBunBun981
*/

const Discord = require("discord.js");
const client = new Discord.Client({disableEveryone: true})
const token = "token" // Your bots token
const prefix = "!" // The prefix your commands will have

client.on('ready', () => {
    console.log(`Started`)
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // Stops the bot from reading every message, including bots

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase()

    switch (command) {
        case "ping": // Just responds with pong, useful to know if the bot is working
            if (message.deletable) message.delete(); // If the command imput can be deleted, delete it
            message.channel.send("pong!");
            break;
        case "embed": // Sends the embed message
            if (message.deletable) message.delete();
            var embed = new Discord.MessageEmbed()
                .setAuthor("Name") // Sets the author, Gives it an icon url, Makes author clickable (Make sure to add the URL's: e.g. ("Name", "URL", "URL"))
                .setColor("#ffffff") // HEX Color
                .setTitle("Title") // Adds a title
                .setDescription("Description") // Adds a description
                .addField("Name", "Text") // Adds a embed field with title and description
                .addField("Name", "Text", true) // Adds an inline field with title and description
            message.channel.send(embed)
            break;
        case "webhookembed":
            if (message.deletable) message.delete();
            var embed = new Discord.MessageEmbed()
                .setAuthor("Name") 
                .setColor("#ffffff")
                .setTitle("This")
                .setDescription("Is") 
                .addField("A", "Basic") 
                .addField("Embed", "Message", true) 
            message.channel.createWebhook(`Webhook Name`, { // Name of the Webhook itself
                avatar: message.author.displayAvatarURL(), // Avatar of the Webhook
            }).then(async webhook => {
                await webhook.send(`Why hello there.`, { // This can be any message, but for this example it just has something random
                    username: message.author.username, // The username of the message sent in chat
                    avatarURL: message.author.displayAvatarURL(), // The avatar of the message sent in chat
                    embeds: [embed], // The embed used
                })
                await webhook.delete() // This will just delete the webhook after it's sent once so you don't have multiple random webhooks
                }).catch(err => console.log(err)) // Catch the error so it doesn't crash the bot
            break;
    }
})

client.login(token);
