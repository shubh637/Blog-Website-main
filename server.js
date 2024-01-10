const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts');
const dotenv = require("dotenv");

const path = require('path');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', postRoutes);

const username=process.env.MONGO_USERNAME;
const password=process.env.MONGO_PASSWORD;

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.4iaupa4.mongodb.net/Blog2`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
    res.send('Hello, this is your blog website!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
