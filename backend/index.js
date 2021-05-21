const express       = require('express'),
      app           = express()
      mongoose      = require('mongoose'),
      quizesRouter    = require('./apis/quizes'),
      categoriesRouter = require('./apis/categories');

const PORT = process.env.PORT || 3001;
const dbURL = 'mongodb://localhost:27017/quiz' 


mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log(" DB connected") })
.catch(err => console.log(err));

app.use(express.json());
app.use('/quizes', quizesRouter);
app.use('/categories', categoriesRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Quiz App' });
});

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`Server started at port ${PORT}`);
    }
})