const Discord = require("discord.js")
const WarnModel = require("../../../schema/warn")

module.exports = {
    name: "warn",
    aliases: ["aviso"],
    run: async (client, message, args) => {
        // ...
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
            const ErrorRole = new Discord.EmbedBuilder()
              .setDescription(`<:Recused_Emoji:1061019407725363280> **Você não possuí permissão para usar este comando.**`)
              .setColor("Red")
            return message.reply({ embeds: [ErrorRole] })}

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const nenhumidfornecido = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`<:Recused_Emoji:1061019407725363280> Forneça um ID ou menção válida para dar um aviso.`)

        if (!user) {
            return message.reply({embeds: [nenhumidfornecido]});
        }



        const attachments = message.attachments.map(attachment => attachment.url);


let reason = args.slice(2).join(' ') || "Nenhuma razão fornecida.";
if (attachments.length > 0) {
    reason += `\n\n**Anexos:**\n${attachments.join('\n')}`;
}


        const warnData = new WarnModel({
            userId: user.id,
            moderatorId: message.author.id,
            reason: reason,
            attachments: attachments,
        });

        warnData.save()

        const embedprivado = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`Você recebeu um aviso em ${message.guild.name}
        \nRazão: ${reason}
        Moderador: ${message.author.id}`)

        const userDM = await user.user.createDM();
      userDM.send({embeds: [embedprivado]});

        const embed = new Discord.EmbedBuilder()
        .setDescription(`<:Correct:1061058269109559326> ${user} foi avisado.`)
        .setColor("Green")

        message.reply({embeds: [embed]})

    }}
