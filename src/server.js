import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

const port = process.env.PORT || 5000;
const server = express();

server.use(express.json());

mongoose.connect(process.env.MONGOS_CONNECTION);
mongoose.connection.on(`Connected!`, () => {
  console.log(`🎁 mongo connected Successfully!!`);
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`server running on: ${port}`);
  });
});

mongoose.connection.on(`error`, (err) => {
  console.log(`Mongo Error: ${err}`);
});
