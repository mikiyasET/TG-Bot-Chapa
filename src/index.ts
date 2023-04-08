require('dotenv').config();
import {Telegraf} from "telegraf";
import {BotController} from "./controller/BotController";
import {message} from "telegraf/filters";

const express = require('express')
const app = express();
const port = process.env.PORT ?? 3000;
const bot = new Telegraf(process.env.BOT_TOKEN!);
bot.on(message('text'), async (ctx: any) => {
    const bc = new BotController(ctx);
    await bc.init();
});

bot.on('pre_checkout_query', async (ctx:any) => {
    await ctx.answerPreCheckoutQuery(true);
});

bot.on('successful_payment', async (ctx: any, next: any) => {
    const success = ctx.message.successful_payment;
    await ctx.reply(`You have paid $${success.total_amount / 100} for test product`);
    return true;
});


app.listen(port, async () => {
    console.log(`Bot started`)
    await bot.launch();
});