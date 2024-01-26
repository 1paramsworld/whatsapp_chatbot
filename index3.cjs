const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const hbs = require("hbs");
const mongoose=require("mongoose")

const app = express();
const templatePath = path.join(__dirname, "../templates");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://0.0.0.0:27017/CID", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("CID", userSchema);

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/insertuser", async (req, res) => {
    try {
        // Manually creating a user (replace this with data from the request body if needed)
        const newUser = new User({
            name: "John Doe",
            email: "john.com",
            age: 25,
        });

        // Save the new user to the database
        const result = await newUser.save();

        console.log("User saved successfully:", result);
        res.send("User saved successfully");
    } catch (error) {
        if (error.code === 11000) {
            console.error("Duplicate key error: Email address already exists");
            res.status(400).send("Email address already exists");
        } else {
            console.error("Error saving user:", error);
            res.status(500).send("Internal Server Error");
        }
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
