import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import  {mongoose}  from "mongoose";
import QuoteRoutes from './routes/QuoteRoutes.js'
import cors from 'cors';
const app = express();

//Middleware for parsing request body
app.use(express.json());
app.use(cors());
//connecting db using mongoose
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDBURL);
//   console.log("Database connected!");
// }

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.get("/", (req, res) => {
  res.send("Working!!");
});

app.use('/quotes', QuoteRoutes);

//listening port
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
