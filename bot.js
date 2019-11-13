const Discord = require("discord.js")
const config = require("./config.js")
const dbcm = require("dbcm")
const client = new dbcm.Client({
    dev: config.dev,
    autoReconnect: true,
    locale: "en-US"
})

client.registerCommands(require.resolve("./commands"), { createSample: false })

client.login(config.token)

//Wait a minute, I'll write this later ~~sorry!~~
