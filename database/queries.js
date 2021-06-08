require("dotenv").config();

const guild_id = process.env.GUILD_ID;

const insertMemberIfDoesNotExist = ({ discord_id, connection }) => {
  const query = `select id from discord_users where discord_id='${discord_id}' and guild_id='${guild_id}'`;
  connection.query(query, (err, resulst) => {
    if (!resulst.length) {
      const insert = `insert into discord_users(discord_id, guild_id, reputation) values ('${discord_id}', '${guild_id}', 100)`;
      connection.query(insert);
    }
  });
};

const getMemberReputation = ({ discord_id, connection, callback }) => {
  const query = `select reputation from discord_users where discord_id='${discord_id}' and guild_id='${guild_id}'`;
  connection.query(query, (err, resulst) => {
    let reputation = 0;
    if (resulst.length) {
      reputation = resulst[0].reputation;
    }
    callback(reputation);
  });
};

const updateMemberReputation = ({ up_discord_id, down_discord_id, connection }) => {
  const downQuery = `select reputation from discord_users where discord_id='${down_discord_id}' and guild_id='${guild_id}'`;
  connection.query(downQuery, (err, resulst) => {
    if (resulst.length) {
      reputation = resulst[0].reputation;
      const _nReputation = reputation - 1;
      const updateQuery = `update discord_users set reputation=${_nReputation} where discord_id='${down_discord_id}' and guild_id='${guild_id}'`
      connection.query(updateQuery)
    }
  });
  const upQuery = `select reputation from discord_users where discord_id='${up_discord_id}' and guild_id='${guild_id}'`;
  connection.query(upQuery, (err, resulst) => {
    if (resulst.length) {
      reputation = resulst[0].reputation;
      const _nReputation = reputation + 1;
      const updateQuery = `update discord_users set reputation=${_nReputation} where discord_id='${up_discord_id}' and guild_id='${guild_id}'`
      connection.query(updateQuery)
    }
  });
};

const upReputation = ({discord_id, connection}) => {
  const query = `select reputation from discord_users where discord_id='${discord_id}' and guild_id='${guild_id}'`;
  connection.query(query, (err, resulst) => {
    if (resulst.length) {
      reputation = resulst[0].reputation;
      const _nReputation = reputation + 1;
      const updateQuery = `update discord_users set reputation=${_nReputation} where discord_id='${discord_id}' and guild_id='${guild_id}'`
      connection.query(updateQuery)
    }
  });
}

const downReputation = ({discord_id, connection}) => {
  const query = `select reputation from discord_users where discord_id='${discord_id}' and guild_id='${guild_id}'`;
  connection.query(query, (err, resulst) => {
    if (resulst.length) {
      reputation = resulst[0].reputation;
      const _nReputation = reputation - 1;
      const updateQuery = `update discord_users set reputation=${_nReputation} where discord_id='${discord_id}' and guild_id='${guild_id}'`
      connection.query(updateQuery)
    }
  });
}

module.exports = { insertMemberIfDoesNotExist, getMemberReputation, updateMemberReputation, upReputation, downReputation };
