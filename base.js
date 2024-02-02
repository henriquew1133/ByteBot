// realizar uma embed

const embed = new Discord.EmbedBuilder()
.setTitle(``)
.setDescription(``)
.setColor("Red")

// base para comandos

module.exports = {
    name: "exemplo de comando",
    description: "descrição do comando",
    aliases: ["aliases do comando"],

    run: async(client, message, args) => {
    }
}

// enviar mensagem

message.channel.send([])

// verificar permissoes

if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
    const ErrorRole = new Discord.EmbedBuilder()
        .setDescription(`:x: Você não possui permissão para usar este comando.`)
        .setColor("Red");
    return message.reply({ embeds: [ErrorRole] });
}
// logica rapida do comando: verifica a permissao e caso nao tenha a permissao ele envia a mensagem de erro


// base para schema:

const mongoose = require("mongoose") // setar a mongo

// iniciar um schema
const nomedoschema = new mongoose.Schema({
    userId: String, //userid
    textoqualquer: String, // pode ser qualquer nome, contanto que seja setado em string
    attachments: [String], // imagens
    timestamp: { type: Date, default: Date.now }, // setar a data atual e colocar no modelo da mongo
});

module.exports = mongoose.model('Warn', WarnModel) //importar o schema

//mudar a permissao de um determinado canal

const nomedaembed = new EmbedBuilder()
            .setDescription(`Permissão modificada com sucesso.`)
            .setColor("Green"); 

        interaction.reply({ embeds: [nomedaembed] }).then(() => {
            const channel = interaction.channel;

            channel.permissionOverwrites.edit(interaction.guild.id, {
                SendMessages: false, //nome da permissao, por exemplo: KickMembers e etc, ta tudo la na guilda
            })
        });

        // como setar a mongo

        // const config = require("lugar da config")
        //sempre setar o MONGO_URL no config.json

        //mongoose.set("strictQuery", true);
//mongoose.connect(config.MONGO_URL, {}).then(() => {

//});

//exemplo de config.json:

//
//{
    //"token":"setar o token",
    //"MONGO_URL":"setar a mongo"
    //}

//

//depois eu faço mais, bye!