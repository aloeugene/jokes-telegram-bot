const TelegramBot = require('node-telegram-bot-api');
const {fetchJoke} = require('./helpers/jokeAPI');
const {
  botToken,
  botPort,
  botHerokuURL,
  programming,
  dark,
  miscellaneous,
  any,
  introduction,
} = require('./constants');

const botOptions = {
  webHook: {
    port: botPort,
  },
};

// const bot = new TelegramBot(botToken, { polling: true });
const bot = new TelegramBot(botToken, botOptions);
bot.setWebHook(`${botHerokuURL}/bot${botToken}`);

const checkWordPresence = (word, msg) => msg.text.toLowerCase().includes(word);

const displayJoke = (category, msg) => {
  let jokeInfo = {};

  fetchJoke(category)
    .then(response => response.json())
    .then(data => (jokeInfo = data))
    .then(() => {
      jokeInfo && jokeInfo.type === 'single'
        ? bot.sendMessage(
            msg.chat.id,
            `<em>Here's your ${category} joke:</em> \n\n${jokeInfo.joke}`,
            {parse_mode: 'HTML'},
          )
        : bot.sendMessage(
            msg.chat.id,
            `<em>Here's your joke:</em> \n\n${jokeInfo.setup} \n<b>${jokeInfo.delivery}</b>`,
            {parse_mode: 'HTML'},
          );
    })
    .catch(err => console.error(err));
};

bot.onText(/\/help/, msg => {
  bot.sendMessage(msg.chat.id, introduction, {parse_mode: 'HTML'});
});

bot.onText(/\/start|\/select/, msg => {
  bot.sendMessage(msg.chat.id, 'Which topic would you like to laugh at today?', {
    reply_markup: {
      inline_keyboard: [
        [
          {text: programming.keyboardOption, callback_data: programming.description},
          {text: dark.keyboardOption, callback_data: dark.description},
        ],
        [
          {text: miscellaneous.keyboardOption, callback_data: miscellaneous.description},
          {text: any.keyboardOption, callback_data: any.description},
        ],
      ],
    },
  });
});

bot.on('callback_query', callbackQuery => {
  const queryId = callbackQuery.id;
  const queryData = callbackQuery.data;
  const msg = callbackQuery.message;

  bot.answerCallbackQuery(queryId, {text: 'Enjoy the joke!'});

  if (queryData.includes(programming.description)) {
    displayJoke(programming.description, msg);
  } else if (queryData.includes(dark.description)) {
    displayJoke(dark.description, msg);
  } else if (queryData.includes(miscellaneous.description)) {
    displayJoke(miscellaneous.description, msg);
  } else if (queryData.includes(any.description)) {
    displayJoke(any.description, msg);
  }
});

bot.on('inline_query', msg => {
  bot.answerInlineQuery(msg.id, [
    {
      type: 'article',
      id: programming.description,
      title: programming.description,
      thumb_url: programming.imgURL,
      input_message_content: {
        message_text: programming.description,
      },
    },
    {
      type: 'article',
      id: dark.description,
      title: dark.description,
      thumb_url: dark.imgURL,
      input_message_content: {
        message_text: dark.description,
      },
    },
    {
      type: 'article',
      id: miscellaneous.description,
      title: miscellaneous.description,
      thumb_url: miscellaneous.imgURL,
      input_message_content: {
        message_text: miscellaneous.description,
      },
    },
    {
      type: 'article',
      id: any.description,
      title: any.description,
      thumb_url: any.imgURL,
      input_message_content: {
        message_text: any.description,
      },
    },
  ]);
});

bot.on('message', msg => {
  if (checkWordPresence(programming.description, msg)) {
    displayJoke(programming.description, msg);
  } else if (checkWordPresence(dark.description, msg)) {
    displayJoke(dark.description, msg);
  } else if (checkWordPresence(miscellaneous.description, msg)) {
    displayJoke(miscellaneous.description, msg);
  } else if (checkWordPresence(any.description, msg)) {
    displayJoke(any.description, msg);
  }
});
