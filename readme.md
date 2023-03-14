# Discord Bot - Spam Protection

This is a Discord bot that helps protect your server from spam by allowing you to configure white listed domains, black listed domains, and whitelisted roles. The bot will monitor messages sent to your server and filter out any messages that match the configured criteria.

## Features

- Filter messages based on white listed domains.
- Filter messages based on black listed domains.
- Filter messages based on whitelisted roles.

## Installation

1. Clone this repository to your local machine.
2. Run npm install to install the required dependencies.
3. Create a new Discord bot by following the [official Discord bot guide](https://discord.com/developers/applications).
4. Copy the bot token and add it to the config.json file.
5. Configure the config.json file with your desired white listed domains, black listed domains, and whitelisted roles.
6. Start the bot by running `$ npm start`.

#### Configuration

_The config.json file contains the following configuration options:_

```json
{
  "serverName": "",
  "discordCredentials": {
    "token": ""
  },
  "botSettings": {
    "whitelistDomains": [],
    "blacklistDomains": [],
    "whitelistRoles": []
  }
}
```

- serverName (string): Name of your server.
- token (string): Your Discord bot token.
- whitelistDomains (array): An array of strings representing the white listed domains.
- blacklistDomains (array): An array of strings representing the black listed domains.
- whitelistRoles (array): An array of strings representing the whitelisted roles.

### Usage

Once the bot is running, it will automatically monitor messages sent to your server and filter out any messages that match the configured criteria.

This Project is made by ✨ [pennytalks discord server](https://discord.gg/8QF4dqPHuw) ✨
