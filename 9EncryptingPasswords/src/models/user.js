const mongoose = require("mongoose");
const validator = require("validator");
//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("invalid email" + value);
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        //CUSTOME VALIDATOR  => doesnt work on UPDATION by default
        if (!["male", "female", "others"].includes(value)) {
          // turn it on in the patch api in findByIdAndUpdate options(3rd args)
          throw new Error("Gender not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1740779693~exp=1740783293~hmac=3ffc11733917c931bddeec957e8fa649e6a1590282b3210d816ccbf54dab2e94&w=900",
    },
    about: {
      type: String,
      default: "this is default about of user",
    },
    skills: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
); /// INCLUDES TIMESTAMPS

module.exports = mongoose.model("User", userSchema);
