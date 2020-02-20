require('dotenv').config();

const introduction =
`This bot sends you jokes from selected category.

Simply type <code>/select</code> to see the list of available categories.
<b>OR</b>
You can mention the bot (@jokesRandom_bot) and observe the categories there.

Have fun and don't forget to laugh! ✌🏼

<em>P.S. "Dark" category is sometimes really dark. Just so you're aware.</em>`;

module.exports = {
  botToken: process.env.BOT_TOKEN,
  botPort: process.env.PORT,
  botHerokuURL: process.env.BOT_HEROKU_URL || 'https://jokes-tg-bot.herokuapp.com',

  introduction,

  programming: {
    description: 'programming',
    keyboardOption: '👨🏼‍💻 Programming',
    imgURL: 'https://qph.fs.quoracdn.net/main-qimg-011de5342604fe4790a86357beec5ee5'
  },
  dark: {
    description: 'dark',
    keyboardOption: '😈 Dark',
    imgURL: 'https://iconsplace.com/wp-content/uploads/_icons/000000/256/png/comedy-icon-256.png'
  },
  miscellaneous: {
    description: 'miscellaneous',
    keyboardOption: '👾 Miscellaneous',
    imgURL: 'http://static.tumblr.com/ubpcooi/4Olnlis59/icon_humor.png'
  },
  any: {
    description: 'any',
    keyboardOption: '🤡 Any',
    imgURL: 'https://lh3.googleusercontent.com/gFAs0ePPZKu9TKJKdi1i1Jbkh-OXS3DwxiKAR33fhdJccWDvNQP2v0vhU1t8K5h2yw=w300'
  }
}
