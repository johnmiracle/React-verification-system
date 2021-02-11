/** @format */

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import indexRouter from './routes/index.js';
import adminRouter from './routes/admin.js';
import userRouter from './routes/users.js';

const port = 4000;

// .env setup
dotenv.config();

// index
import './config/passport.js';

// mongoDb setup
mongoose.set('useCreateIndex', true);
mongoose
	.connect(process.env.Database, {
		useNewUrlParser: true,
		autoReconnect: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// passport
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', indexRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/client/build', 'index.html')));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use((err, req, res, next) => {
	console.log(err.message)
	res.status(500).send({ message: "internet down, please try again." });
});

app.listen(process.env.PORT || port, () => {
	console.log(`Server at http://127.0.0.1:${port}`);
});
