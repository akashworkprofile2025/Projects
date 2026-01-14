// mongoose import
import mongoose from "mongoose";

// user schema create
const userSchema = new mongoose.Schema(
  {
    // user name
    name: {
      type: String,
      required: true,
    },

    // user email
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // password (hashed)
    password: {
      type: String,
      required: true,
    },

    // role (admin / user)
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

// user model export
export default mongoose.model("User", userSchema);
