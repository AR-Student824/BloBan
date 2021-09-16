// This bot is purposely using v12 and not using Discord's new features like buttons, menus, and slash commands, because Discord has been purposely forcing these features and we feel like they most of them are unneccessary. Because of that, this bot cannot cross 100 servers, do not fork and use for production, not a good idea.

const Discord = require('discord.js')
const client = new Discord.Client()
const cooldown = new Set();

client.on('ready', () => {
	client.user.setActivity('closely at ,help', {
		type: "WATCHING"
	})
	console.log('[Event] BloBan is ready to serve on Discord.')
})


client.on('message', async (message) => {
	if (message.content.startsWith(',help')) {
		message.channel.send('**Staff only commands are marked with <:blobslash:868971925932761088>**\n\n`,help` - Displays information and commands.\n`,ban` <:blobslash:868971925932761088> - Bans a user from Blobby, but you can only ban once every 2 hours.')
	}
	if (message.content.split(' ')[0] == ',ban') {
		if (cooldown.has(message.author.id) && !message.member.roles.cache.find(r => r.name === "+")) {
			message.channel.send(`<:blobexclamationmark:868970594090246184> **Oops.** You can use this command again <t:${(Date.now() / 1000 + 7200).toString().split('.')[0]}:R>`)
		}
		else {
			cooldown.add(message.author.id);
        setTimeout(() => {
          cooldown.delete(message.author.id);
        }, 7200000);
			if (message.member.roles.cache.find(r => r.name === "Moderator")) {
				let User = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(message.content.split(' ')[1])
        if (!User) return message.channel.send("**Ban**\nBans a user from Blobby, but you can only ban once every 2 hours.\n\nUsage: **\`,ban [@user or userid] [reason]\`**\nAccess allowed: **\`true\`**\nRequired role(s): **\`Moderator\`**")

				if (User.user.id == message.author.id) return message.channel.send('<:blobx:868969639915450438> You cannot ban yourself')

				var reason = message.content.split(' ')[2] ? message.content.replace(' ', '').replace(message.content.split(' ')[0], '').replace(message.content.split(' ')[1], '').replace(' ', '') : null
				try {
				User.ban({reason: reason}).then(() => {
					message.channel.send(`<:blobcheck:868969170983878676> Banned **${User.user.tag}**${reason ? ` for **${reason.replace(/@/g, '(at)')}**.` : '.'}`)}).catch(() => {
					message.channel.send('<:blobexclamationmark:868970594090246184> Failed to ban user. Is the user on a higher rank than you or me?')
				})
				} catch (e) 
				{
					message.channel.send('<:blobexclamationmark:868970594090246184> Failed to ban user. Is the user on a higher rank than you or me?')
				}
        
		} else {
			message.channel.send('<:blobx:868969639915450438> You are not allowed to use this command!')
		}
		}
	}
})

client.login(process.env.TOKEN)