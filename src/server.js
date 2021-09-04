import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import {
  badRequestHandler,
  genericErrorHandler,
  forbidenHandler,
  notFoundHandler,
} from "./errorHandlers.js";
import blogsRouter from "./service/blog/index.js";
// import commentRouter from "./service/comments/index.js";

const port = process.env.PORT || 5000;
const server = express();

//later add the origins here brp

server.use(express.json());
server.use(cors());

server.use("/blogs", blogsRouter);
// server.use("/comments", commentRouter);

server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbidenHandler);
server.use(genericErrorHandler);

server.use((req, res) => {
  if (!req.route) {
    res.status(404).send("Buddy! check your route 👁👀👀");
  }
});

mongoose.connect(process.env.MONGOS_CON_LOCAL);
mongoose.connection.on(`connected`, () => {
  // the string "connected" 👆☝ has to be "connected" nothing more nothing less
  console.log(`🎁 mongo connected Successfully!!`);
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`server running on: ${port}`);
  });
});

mongoose.connection.on(`error`, (err) => {
  console.log(`Mongo Error: ${err}`);
});

//-------------------------OR----------------------------------
// THE CODE BELLOW ALSO WORK //

// mongoose
//   .connect(process.env.MONGOS_CON_LOCAL)
//   .then(() => {
//     server.listen(port, () => {
//       console.table(listEndpoints(server));
//       console.log(`server running on: ${port}`);
//     });
//   })
//   .catch(console.log);
