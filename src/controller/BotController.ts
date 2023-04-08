require('dotenv').config();

export class BotController {
    private ctx;
    private text: string;
    private chat;
    private readonly id: number;
    private readonly first_name?: string;
    private readonly last_name?: string;
    private readonly username?: string;
    private isAdmin;

    constructor(ctx: any) {
        this.ctx = ctx;
        this.text = ctx.message.text;
        this.chat = ctx.message.chat;
        this.id = this.chat.id;
        this.first_name = this.chat.first_name;
        this.last_name = this.chat.last_name;
        this.username = this.chat.username;
        this.isAdmin = false;
    }

    async init() {
        this.text = this.text[0] == '/' ? this.text.slice(1) : this.text;
        await this.watch();
    }

    async watch() {
        if (this.text == "start" || this.text == "restart") {
            await this.ctx.reply(`Welcome ${this.first_name}!\n\nsend /invoice to receive your invoice`);
        }
        else if (this.text == "invoice") {
               const invoice: any = {
                   title: "Chapa Test Payment",
                   photo_url: "https://pbs.twimg.com/media/FtIGHFzXwAYRsGE?format=jpg&name=large",
                   description: "do your thing",
                   prices: [{label: "ዶሮ", amount: 800 * 100}],
                   suggested_tip_amounts: [50 * 100, 100*100, 300*100],
                   max_tip_amount: 30000,
                   currency: "ETB",
                   payload: `payload`,
                   start_parameter: "start",
                   provider_token: process.env.PAYMENT_KEY!
               }
               await this.ctx.replyWithInvoice(invoice);
        } else {
            await this.unknownCommand();
        }
    }

    async unknownCommand() {
        await this.ctx.reply("Unknown command", {parse_mode: "HTML"});
    }
}