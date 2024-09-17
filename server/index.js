const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

const userRouter = require('./routes/Users');
app.use('/auth', userRouter);
const artRouter = require('./routes/Arts');
app.use('/art', artRouter);
const commentRouter = require('./routes/Comments');
app.use('/comment', commentRouter);
const categoryRouter = require('./routes/Categorys');
app.use('/category', categoryRouter);
const orderRouter = require('./routes/Order');
app.use('/order', orderRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
