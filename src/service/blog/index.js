import express from "express";
import blogModel from "./schema.js";
import createHttpError from "http-errors";

const blogsRouter = express.Router();

blogsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const post = await blogModel(req.body);
    const { _id } = await post.save();
    res.status(201).send({ _id });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
blogsRouter.get("/", async (req, res, next) => {
  try {
    const posts = await blogModel.find({});
    res.send(posts);
  } catch (error) {
    next(error);
  }
});
blogsRouter.get("/:Id", async (req, res, next) => {
  try {
    const post = await blogModel.findById(req.params.Id);
    if (post) {
      res.send(post);
    } else {
      res.send(`blog ${req.params.Id} NOT found!!`);
    }
  } catch (error) {
    next(createHttpError(404, `post ${req.params.Id} NOT found!!`));
  }
});
blogsRouter.put("/:Id", async (req, res, next) => {
  try {
    const post = await blogModel.findByIdAndUpdate(req.params.Id, req.body, {
      new: true,
    });
    if (post) {
      res.send(post);
    } else {
      res.send(`blog ${req.params.Id} NOT found!!`);
    }
  } catch (error) {
    next(createHttpError(404, `post ${req.params.Id} NOT found!!`));
  }
});
blogsRouter.delete("/:Id", async (req, res, next) => {
  try {
    const post = await blogModel.findByIdAndDelete(req.params.Id);
    if (post) {
      res.status(204).send(`Deleted!!`);
    } else {
      res.send(`${req.params.Id} NOT found!`);
    }
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
