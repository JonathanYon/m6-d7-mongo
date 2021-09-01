import express from "express";
import blogModel from "./schema.js";
import commentModel from "../comments/schema.js";
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

//*********************************comment routes******************************** */

//post comment

blogsRouter.post("/post/:id", async (req, res, next) => {
  try {
    const post = await blogModel.findById(req.params.id);
    if (post) {
      const postComment = await blogModel.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: req.body } },
        { new: true }
      );
      res.send(postComment);
    } else {
      next(
        createHttpError(404, `The Post you are looking for does NOT exist!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(createHttpError(404));
  }
});
blogsRouter.get("/post/:id/comments", async (req, res, next) => {
  try {
    const post = await blogModel.findById(req.params.id);
    if (post) {
      const allComments = post.comments;
      res.send(allComments);
    } else {
      next(
        createHttpError(404, `The Post you are looking for does NOT exist!`)
      );
    }
  } catch (error) {
    next(createHttpError(404));
  }
});
blogsRouter.get("/post/:id/comments/:commentId", async (req, res, next) => {
  try {
    const post = await blogModel.findById(req.params.id);
    if (post) {
      const comment = post.comments.find(
        (com) => com._id.toString() === req.params.commentId
      );
      if (comment) {
        res.send(comment);
      } else {
        next(
          createHttpError(
            404,
            `The comment you are looking for does NOT exist!`
          )
        );
      }
    } else {
      next(
        createHttpError(404, `The Post you are looking for does NOT exist!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(createHttpError(404));
  }
});
blogsRouter.put("/post/:id/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await blogModel.findOneAndUpdate(
      { _id: req.params.id, "comments._id": req.params.commentId },
      {
        $set: {
          "comments.$": req.body,
        },
      },
      { new: true }
    );

    // if (comment) {
    //   res.send(comment);
    // } else {

    //   next(
    //     createHttpError(404, `The Post you are looking for does NOT exist!`)
    //   );
    // }
  } catch (error) {
    console.log(error);
    next(createHttpError(404));
  }
});
blogsRouter.delete("/post/:id/comments/:commentId", async (req, res, next) => {
  try {
    const comment = await blogModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: { _id: req.params.commentId },
        },
      },
      { new: true }
    );
    res.send(comment);
  } catch (error) {
    next(createHttpError(404));
  }
});

export default blogsRouter;
