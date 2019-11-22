require('dotenv').config();
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const btnGitHub = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'https://github.com/LieutenantKroll')
  ]);
  const btnDelete = Markup.inlineKeyboard([
    Markup.callbackButton('Delete', 'delete')
  ]);

module.exports = Bot =>  {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    bot.use(async (ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log('Response time: %sms', ms)
      });
    bot.start((ctx) => {
        ctx.reply('Привет, я - ChikibamBot, созданый криворуким разработчиком Дмитрием');
    });

    bot.command('stats',(ctx) => {
        let message = ctx.message;
        
        let reply = 'Chat id: ' + message.chat.id + 
        '\nUsername: ' + '@' + message.from.username +
        '\nName: ' + message.from.first_name +
        '\nSurname: ' + message.from.last_name;
        
        ctx.reply(reply, Extra.markup(btnDelete));
    });

    bot.command('name',(ctx)=>{
        let message = ctx.message;
        
        ctx.reply(message.from.first_name, Extra.markup(btnGitHub));
    });

    bot.command('surname',(ctx)=>{
        let message = ctx.message;
        ctx.reply(message.from.last_name, Extra.markup(btnGitHub));
    });

    bot.command('copy', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(btnDelete)));
    
    bot.action('delete', ({ deleteMessage }) => deleteMessage());
    
    bot.launch();
}
