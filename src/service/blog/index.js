import { Router } from "express";
import blogModel from "./schema.js";

const blogsRouter = Router();

blogsRouter.post("/", async (req, res, next) => {
  try {
    const post = await blogModel(req.body);
    const { _id } = await post.save();
    res.status(201).send({ _id });
  } catch (error) {
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
    next(error);
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
    next(error);
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
