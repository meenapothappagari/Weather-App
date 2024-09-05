
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");


app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect("mongodb+srv://meena:meena@cluster0.igx3gzr.mongodb.net/meena?retryWrites=true&w=majority&appName=Cluster0",
        {
            useNewUrlParser: true, // to avoid deprecated warning
            useUnifiedTopology: true, // enable new connection management engine
        }
    )
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Connection failed!", error);
    });


const users = [
    {
        email: "meena123@gmail.com",
        password: "meena",
    
    },
    {
        email: "meenakshi12@gmail.com",
        password: "$2b$12$0gHfSl8i0FM1ovm0f8pVXOH6TH.CrSdTXkbM4Jo.L3IlQZcfQ5TFO",
    },
];

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password

    users.push({
        email: email,
        password: hashedPassword,
    });

    console.log("New user added:", { email, password: hashedPassword }); // Log the email and hashed password

    res.status(200).send(users);
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("Trying to log in with:", email);

    const user = users.find((user) => user.email === email);

    if (!user) {
        console.log("User not found:", email);
        res.status(404).send("User not found");
    }

    console.log("hashed password:", user.password);
    console.log("Password provided:", password);

    const isValidPassword = bcrypt.compare(password, user.password);

    console.log("Password valid:", isValidPassword);

    if (!isValidPassword) {
        console.log("Invalid password for user:", email);
        res.status(400).send("Invalid password");
    }

    res.status(200).send("Logged in successfully");
});


// Flipcart data starting from here...

// const mongoose = require('mongoose');

const flipcartSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_name: String,
    product_category_tree: [String],
    retail_price: Number,
    discounted_price: Number,
    image: [String],
    description: String,
    product_rating: {
        type: String,
        default: "No rating available"
    },
   
        

});
// const Flipcart = mongoose.model('Flipcart', flipcartSchema);
// const Flipcart = mongoose.model('flipcart', flipcartSchema);
const Flipcart = mongoose.model('Flipcart', flipcartSchema, 'flipcart');

app.get("/flipcart", (req, res) => {
    try {
        Flipcart.find()
            .then((result) => {
                res.status(200)
                .send(result)
            })
    } catch (error) {
        res.status(500)
        .send(error)
    }
})














app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
});
