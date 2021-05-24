import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';
import config from './config.json';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const API_TOKEN = process.env.TOKEN;
const MESSAGE_EVENT = 'message';
const READY_EVENT = 'ready';
const VALID_REACTIONS = ['🖕', '🤏'];
const INVISIBLE_USER_STATUS = 'invisible';

const { TARGET_USER_IDS } = config;

client.once(READY_EVENT, () => {
    client.user.setStatus(INVISIBLE_USER_STATUS);
});

client.on(MESSAGE_EVENT, (message) => {
	if (TARGET_USER_IDS.some(user_id => user_id === message.author.id)) {
		message.react(selectRandomReaction());
	}
});

const selectRandomReaction = () => {
    const index = Math.floor(Math.random() * VALID_REACTIONS.length);
    return VALID_REACTIONS[index];
};

client.login(API_TOKEN);
