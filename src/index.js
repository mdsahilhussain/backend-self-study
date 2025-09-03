/*
! yh require hamare code continuesly ko kharab krta hai like require then import. 
require("dotenv").config({ path: "./env" });
*/

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./env" });
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("Express app error:", error);
      throw error;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  });
//!  "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js "

/*
! this approach is good but not not industrial standard way of doing things, its polluting the index.js file
import express from "express";
const app = express();

(async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error)=>{
        console.error("Express app error:", error);
        throw error;
    })

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    }
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
})();
*/
 