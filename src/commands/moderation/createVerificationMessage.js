const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "create-verification-message",
    description: "Create the verification message.",
  },

  run: async ({ interaction, client }) => {
    if (interaction.user.id != 726293202642010144) {
      await interaction.reply({
        content: "This is only available for kirkaig",
        flags: MessageFlags.Ephemeral,
      });

      return;
    }

    try {
<<<<<<< HEAD
      const roles = [{ id: "1409638286233960600", label: '"No"' }];
=======
      // list of role IDs
      const negator = "1409638286233960600";

      const roles = [{ id: negator, label: '"No"' }];
>>>>>>> 97e2e4d (Added in a verification command)
      const channel = await client.channels.cache.get(interaction.channelId);

      const row = new ActionRowBuilder();

      roles.forEach((role) => {
        row.components.push(
          new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Primary)
        );
      });

      channel.send({
        content:
          'Click "No" to agree with the rules and accept the word no into your heart.',
        components: [row],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
