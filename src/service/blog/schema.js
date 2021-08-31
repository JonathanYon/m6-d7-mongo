import mongoose from "mongoose";

const { Schema, model } = mongoose;

const readTimeSchema = new Schema({
  value: Number,
  unit: String,
});

const authorSchem = new Schema({
  name: String,
  avatar: String,
});

const blogSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      type: readTimeSchema,
      required: true,
    },
    author: {
      type: authorSchem,
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default model(`blog`, blogSchema);
