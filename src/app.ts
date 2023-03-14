import config from "./config.json";
const token = config.discordCredentials.token;
import * as Discord from "discord.js"; // import discord.js
import psl from "psl";

// make a sample discord client
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

// when the client is ready, log "Ready!"
client.on("ready", () => {
  console.log("Ready!");
});

// login to the client with your token
client.login(token);

const { blacklistDomains, whitelistDomains, whitelistRoles } =
  config.botSettings;

client.on("messageCreate", (message) => {
  // listen for messages
  if (!message.content) {
    return;
  }
  if (!hasLink(message.content)) {
    return;
  }

  const linksInMessage = extractUrlFromMessage(message.content);

  // if one of the links in the message is in the blacklist then delete the message
  if (linksInMessage) {
    for (let i = 0; i < linksInMessage.length; i++) {
      const domain = getDomainName(linksInMessage[i]);
      if (blacklistDomains.includes(domain as never)) {
        message.delete();
        return;
      }
    }
  }

  // if the message is from a whitelisted role then return
  if (
    message.member?.roles.cache.some((role) =>
      whitelistRoles.includes(role.name as never)
    )
  ) {
    return;
  }

  // if message links are in whitelist then return
  if (linksInMessage) {
    for (let i = 0; i < linksInMessage.length; i++) {
      const domain = getDomainName(linksInMessage[i]);
      if (whitelistDomains.includes(domain as never)) {
        return;
      }
    }
  }

  // delete the message if it has a link and is not from a whitelisted role or a whitelisted domain
  message.delete();
});

// This function takes a message and returns true if it has a link and false otherwise
// It takes a string as input and returns a boolean as output
function hasLink(message: string | undefined | null) {
  const regex = /(https?:\/\/[^\s]+)/g;
  if (!message) return false;
  return regex.test(message);
}

/**
 * Returns the domain name of a given URL.
 *
 * @param url - the URL to parse
 *
 * @returns the domain name
 */
function getDomainName(url: string) {
  const nonce = new URL(url);
  const domain: any = psl.parse(nonce.host);
  return domain.domain as string;
}

//  this function takes a string message and returns an array of domains
//  if no domains are found, the function returns null
//  the regex searches for any string that starts with http or https, ends with a space, and has a word character in between
//  the match function returns an array of all the matches found
function extractUrlFromMessage(message: string) {
  //  return array of domain names
  const regex = /(https?:\/\/[^\s]+)/g;
  const domains = message.match(regex);
  return domains;
}
