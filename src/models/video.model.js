import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//! Video Schema define kar rahe hain
const videoSchema = new mongoose.Schema(
  {
    // Video file ka URL (Cloudinary se aayega)
    videoFile: {
      type: String,
      required: [true, "Video file is required"], // har video ke liye file zaroori hai
    },

    // Thumbnail ka URL (Cloudinary se aayega)
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"], // har video ke liye thumbnail zaroori hai
    },

    // Title of the video
    title: {
      type: String,
      required: [true, "Title is required"], // har video ka title hoga
    },

    // Description of the video
    description: {
      type: String,
      required: [true, "Description is required"], // har video ka description hoga
    },

    // Duration in seconds
    duration: {
      type: Number,
      required: [true, "Duration is required"], // har video ka duration (seconds me)
    },

    // Views count
    views: {
      type: Number,
      default: 0, // default me 0 views
    },

    // Published status
    isPublished: {
      type: Boolean,
      default: true, // by default video published hoga
    },

    // Owner of the video (relation with User model)
    owner: {
      type: mongoose.Types.ObjectId, // reference ID
      ref: "User",                   // connect with User model
    },
  },
  { timestamps: true } // createdAt & updatedAt auto add ho jayega
);


//! Plugin use kar rahe hain -> Aggregate Paginate
// isse aggregate queries ke results ko paginate karna easy ho jata hai
videoSchema.plugin(mongooseAggregatePaginate);


//! Model banakar export kar diya
export const Video = mongoose.model("Video", videoSchema);

