const Discord = require("discord.js")
const config = require("./config.js")
const dbcm = require("dbcm")
const chalk = require("chalk")
const fs = require("fs")
const client = new dbcm.Client({
    dev: config.dev,
    autoReconnect: true,
    locale: "en-US"
})

client.registerCommands(__dirname + "/commands", { createSample: false })

client.database.connect("mongodb://localhost/example", { useFindAndModify: false })

if (fs.existsSync(__dirname + "/models") === false) { return console.warn("An attempt to read the \"models\" folder has been blocked because it does not exist. If you want to use dbcm database functions, create a folder \"models\", please.") }
else if(config.database === true) client.database.registerModels(__dirname + "/models")

client.on("ready", () => {
    console.log(config.readyMsg(client))
})

client.on("message", async message => {
    if (message.system || message.author.bot || message.channel.type === "dm") return

    if (config.logMessages === true) console.log(`[MESSAGE] [Guild: ${message.guild.name}] [Channel: ${message.channel.name}] [Author: ${message.author.tag}] - ${message.content}`)

    if (config.database === true) {
        client.database.models.get("user").findById(message.author.id, (err, res) => {
            if (err) throw new Error(err)

            if (!res) client.database.models.get("user").create({ _id: message.author.id, name: message.author.username })

            let pointToUp = Math.round(Math.random() * 7)

            client.database.models.get("user").findByIdAndUpdate(message.author.id, {
                $set: {
                    point: res.point + pointToUp
                }
            }).catch(err => { throw new Error(err) })
        })
    }

    if (!message.content.startsWith(config.prefix)) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    client.runCommand(command, message, args).catch(err => { throw new Error(err) })
})

client.login(config.token)

process.on("uncaughtException", error => {
    console.error(error)
})

