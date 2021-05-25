const express       = require('express'),
      app           = express()
      mongoose      = require('mongoose'),
      cors          = require('cors'),
      quizesRouter    = require('./apis/quizes.api'),
      authRouter      = require('./apis/user.api'),
      categoriesRouter = require('./apis/categories.api');

const PORT = process.env.PORT || 3001;
const localDbURL = 'mongodb://localhost:27017/quiz'
const prodDbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ueoao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


mongoose.connect(localDbURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => { console.log(" DB connected") })
.catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use('/', authRouter);
app.use('/quizes', quizesRouter);
app.use('/categories', categoriesRouter);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Quiz App' });
});

app.use((req, res) => {
    res.status(404).json({ message: "No such url exists" });
})

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log(`Server started at port ${PORT}`);
    }
})