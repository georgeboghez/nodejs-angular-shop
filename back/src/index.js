const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use('/files', express.static("files"));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

require("./config/mongoose.js")(app);
require('./app/routeHandler')(app)

app.use(morgan('dev'));
app.use(cors());
// app.use(express.urlencoded({extended: true}));
// app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        message: 'Arise MEAN developers'
    });
});
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});