import { Router } from "express";

const blogsRouter = Router();

blogsRouter.post("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogsRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogsRouter.get("/:Id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogsRouter.put("/:Id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
blogsRouter.delete("/:Id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default blogsRouter;
