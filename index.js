/* index.js server config */
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


//MongoDB connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.db37z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //এখানে আমরা ডাটাবেজ এবং কালেকশন তৈরি করছি এবং ডাটাবেজ এর নাম হচ্ছে coffeeDB এবং কালেকশন এর নাম হচ্ছে coffee।

        const coffeeCollection =client.db("coffeeDB").collection("coffee");


        // এখানে আমরা ডাটা পোস্ট করতে পারবো আর ডাটা পোস্ট করার পর ডাটা ডাটাবেজে সেভ হবে।
        app.post('/coffee', async (req, res) => {
            const newCoffee = req.body;            
            console.log(newCoffee)

            const result = await coffeeCollection.insertOne(newCoffee);

            res.send(result);
        });






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


// Routes
app.get('/', (req, res) => {
    res.send('Coffee making server is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});