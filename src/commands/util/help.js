const { stripIndents, oneLine } = require('common-tags');
const Command = require('../base');
const Discord = require("discord.js");
module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'util',
			memberName: 'help',
			aliases: ['commands'],
			description: 'Displays a list of available commands, or detailed information for a specified command.',
			details: oneLine`
				The command may be part of a command name or a whole command name.
				If it isn't specified, all available commands will be listed.
			`,
			examples: ['help', 'help prefix'],
			guarded: true,
			guildOnly:true,
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to view the help for?',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(message,{command}) { 
	const author = message.author
	message.delete().catch(console.error);
	if (command.length == 0) {
	const groups = this.client.registry.groups.array();
	const embed = new Discord.RichEmbed()
	.setTitle("Help")
	.setDescription(`You have permission to use the following commands in ${message.guild.name}`)
	.setColor(0xA60A8E)
	.setTimestamp()
	for (var x = 0;x<groups.length;x++){
	var arr = []
	for (var y = 0;y<groups[x].commands.array().length;y++){
	if (groups[x].commands.array()[y].hasPermission(message)) arr.push(' ' + groups[x].commands.array()[y].name);
	}
	if (arr && arr.length !== 0) embed.addField(groups[x].name,`${arr}`);
	}
	author.send({embed}).catch(console.error);
	return undefined
	}
	const command2 = this.client.registry.findCommands(command,true);
	if (command2.length == 0) return message.author.send("Unknown command");
	const embed = new Discord.RichEmbed()
	.setTitle(command2[0].memberName)
	.setColor(0xA60A8E)
	.setDescription(command2[0].description)
	var syntax = "";
	for (var x = 0;x<command2[0].argsCollector.args.length;x++){
		syntax += ` <${command2[0].argsCollector.args[x].type.id}>`;
	}
	embed.addField("Syntax",command2[0].memberName + ' ' + syntax)
	.addField("Example",command2[0].examples)
	.setFooter("Sponsored by axi#0001 @ DataWagon - Dedi, Colocation, VPS & web hosting -- www.datawagon.net")
	.setTimestamp()
	author.send({embed});
	
	
	}
};
