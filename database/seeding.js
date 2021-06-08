const createSeedData = (connection) => {
  const query = `create table if not exists discord_users(id int primary key auto_increment, discord_id varchar(255) not null, guild_id varchar(255) not null, reputation int not null)`;
  connection.query(query);
};
module.exports = { createSeedData };
