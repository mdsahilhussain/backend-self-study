import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//! User Schema define kar rahe hain
const userSchema = new mongoose.Schema(
  {
    // Username field
    username: {
      type: String,
      required: [true, "Username is required"], // username hona hi chahiye
      unique: true,                             // same username repeat nahi hoga
      lowercase: true,                          // store hote waqt lowercase ho jayega
      trim: true,                               // extra spaces hata dega
      minlength: 3,                             // min 3 characters
      index: true,                              // fast searching ke liye index create hoga
    },

    // Email field
    email: {
      type: String,
      required: [true, "Email is required"],    // email compulsory hai
      trim: true,                               // spaces remove
      unique: true,                             // ek hi email bar bar use nahi ho sakta
      lowercase: true,                          // lowercase store hoga
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."], // regex check karega ki email valid hai ya nahi
    },

    // Full name field
    fullname: {
      type: String,
      required: [true, "Full name is required"], // naam compulsory
      trim: true,                                // trim spaces
      index: true,                               // searchable
    },

    // Avatar image (profile photo)
    avatar: {
      type: String,                              // Cloudinary ya koi bhi image URL
      required: [true, "Avatar is required"],    // avatar compulsory hai
    },

    // Cover image (optional)
    coverImage: {
      type: String,                              // optional image URL
    },

    // User ke watch history (related to Video model)
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,   // Video ka reference id
        ref: "Video",                           // link to Video collection
      },
    ],

    // Password field
    password: {
      type: String,
      required: [true, "Password is required"], // password compulsory hai
      minlength: 6,                             // minimum 6 chars
    },

    // Refresh token (long-lived token)
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // timestamps add karega (createdAt, updatedAt)
);



//! Password hashing before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // agar password modify nahi hua toh skip
  this.password = await bcrypt.hash(this.password, 10); // password ko hash karke save karo
  next();
});

//! Note: Hmlog custom methods bhi desgin kr sktai hai
//! yeh methods instance pe call hongi, yh check krge kya password sahi hai ya nahi
//! Instance Method: check password correct hai ya nahi
userSchema.methods.isPasswordCorrect = async function (password) {
  // user input password vs hashed password compare karega
  return await bcrypt.compare(password, this.password);
};



//! Instance Method: Access Token generate karna
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,         // user ki id
      email: this.email,     // user email
      username: this.username, // username
      fullname: this.fullname, // fullname
    },
    process.env.ACCESS_TOKEN_SECRET, // secret key env se
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // expiry env se
    }
  );
};



//! Instance Method: Refresh Token generate karna
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id }, // sirf id save kiya hai
    process.env.REFRESH_TOKEN_SECRET, // refresh token secret
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY } // expiry env se
  );
};



//! Model create karke export kar diya
export const User = mongoose.model("User", userSchema);