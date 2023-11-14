const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const express = require('express')
const app = express()
const TodoListRoutes = require('./routes/api/Todolist')
require('dotenv').config()
const path  = require('path')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/Todolist', TodoListRoutes)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}.`));
