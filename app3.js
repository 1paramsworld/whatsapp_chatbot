// const qrcode=require("qrcode-terminal");
// const { Message } = require("twilio/lib/twiml/MessagingResponse");

// const {Client,LocalAuth}=require("whatsapp-web.js");

// const whatsapp=new Client({
//     authStrategy:new LocalAuth()
// })

// whatsapp.on("qr",qr=>{
//     qrcode.generate(qr,{
//         small:true
//     })
// });

// whatsapp.on("message",async message=>{
//     if(message.body==="hello"){
//         message.reply("welcome to fit bit gym")
//     }
// })

// whatsapp.on("ready",()=>{
//     console.log("the client is ready")
// })

// whatsapp.initialize()

const qrcode = require("qrcode-terminal");
const { MessagingResponse } = require("twilio").twiml;
const { Client, LocalAuth } = require("whatsapp-web.js");

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

whatsapp.on("qr", qr => {
    qrcode.generate(qr, {
        small: true
    });
});

whatsapp.on("message", async message => {
    if (message.body === "hello") {
        message.reply("Welcome to Fit Bit Gym");
    }
});

whatsapp.on("ready", () => {
    console.log("The client is ready");
});

whatsapp.initialize();
