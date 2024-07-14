import express from 'express';  
import cors from 'cors';
import bodyParser from 'body-parser';
import LinksRouter from './Routes/LinkRouter.js';
import UsersRouter from './Routes/UserRouter.js';
import connectDB from './database.js';

// יצירת האובייקט של express
const app = express();
const port = 3000;

// חיבור למסד הנתונים
connectDB();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

// הגדרת הראוטרים
app.use('/links', LinksRouter);
app.use('/users', UsersRouter);

// ראוטר ראשי
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// התחלת האזנה לשרת
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
