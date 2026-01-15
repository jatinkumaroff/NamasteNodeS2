const express = require("express");
const app = express();

app.use("/route",
    (req, res, next) => {
        console.log("first working");
        // res.send("first");
        next();
    },
    (req, res, next) => {
        console.log("second working");
        next();
        res.send("second");
    }
)

app.listen(3000);