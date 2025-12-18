module.exports = async (interaction, client) => {
  if (!interaction.isButton()) return;
  if (
    interaction.message.content !=
    'Click "No" to agree with the rules and accept the word no into your heart.'
  )
    return;

  const role = interaction.guild.roles.cache.get(interaction.customId);
  const firstWarning = "1396596327265337366";

  const hasRole = interaction.member.roles.cache.has(role.id);
  const lesserRoles = [firstWarning];

  const hasLesserRole = lesserRoles.some((roleId) =>
    interaction.member.roles.cache.has(roleId)
  );

  if (!role) {
    interaction.reply("Role doesn't exist.");
  }

  if (hasRole) {
    interaction.reply({
      content: "You already have the role.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  if (hasLesserRole) {
    interaction.reply({
      content: "You can't get this role.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await interaction.member.roles.add(role);
  interaction.reply({
    content: "You now have access to the server.",
    flags: MessageFlags.Ephemeral,
  });
};
