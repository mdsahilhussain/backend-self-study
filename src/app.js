import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.route.js";

// routes declaration
// app.get --> hmlog router 1 hi file me likht rhai thai to get ka use kr letai thai

// but ab hmlog sb kuch alg alg kr diya hai to hmai middleware ka use krna hoga.
// http://localhost:8000/api/v1/users/register

app.use("/api/v1/users", userRouter);

export default app;
