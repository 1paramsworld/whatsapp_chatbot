const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

whatsapp.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

whatsapp.on("message", async message => {
    const lowercaseBody = message.body.toLowerCase();

    if (lowercaseBody === "menu") {
        const response = "Please choose from the following options:\n" +
            "1. Type 'help' for assistance\n" +
            "2. Type 'inquiry' to make an inquiry\n" +
            "3. Type 'customer_care' for customer care";

        await whatsapp.sendMessage(message.from, response);
    } else if (lowercaseBody === "help") {
        await whatsapp.sendMessage(message.from, "You selected Help. How can we assist you?");
    } else if (lowercaseBody === "inquiry") {
        await whatsapp.sendMessage(message.from, "You selected Inquiry. Please provide details of your inquiry.");
    } else if (lowercaseBody === "customer_care") {
        await whatsapp.sendMessage(message.from, "You selected Customer Care. Our customer care team will assist you shortly.");
    } else if (lowercaseBody === "hello") {
        await whatsapp.sendMessage(message.from, "Welcome to Fit Bit Gym");
    }
});

whatsapp.on("ready", () => {
    console.log("The client is ready");
});

whatsapp.initialize();
