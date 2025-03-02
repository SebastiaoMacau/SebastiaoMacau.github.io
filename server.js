const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);


const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

// Route to count visitors
app.get("/visit", async (req, res) => {
    let visitor = await Visitor.findOne();
    if (!visitor) {
        visitor = new Visitor({ count: 1 });
        await visitor.save();
    } else {
        visitor.count++;
        await visitor.save();
    }
    res.json({ count: visitor.count });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
