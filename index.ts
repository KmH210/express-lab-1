import express from 'express';
import cors from "cors";
import itemRoutes from "./item-route";
import item from "./item";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", itemRoutes);


const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});