const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const db = require('./models');

const userRouter = require('./routes/Users');
app.use('/auth', userRouter);
const artRouter = require('./routes/Arts');
app.use('/art', artRouter);
const commentRouter = require('./routes/Comments');
app.use('/comment', commentRouter);
const orderRouter = require('./routes/Order');
app.use('/order', orderRouter);
const billRouter = require('./routes/Bill');
app.use('/bill', billRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
