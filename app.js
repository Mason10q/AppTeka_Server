const express = require("express");
const multer  = require("multer");

const profileRouter = require("./routers/profileRouter.js");

global.__approot = __dirname;
 
const app = express();

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, __dirname + "/drug_images/");
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

app.use(express.json());
app.use(multer({storage: storageConfig}).single("image"));
app.use("/drug_images/", express.static(__dirname + '/drug_images/'));


app.use("", profileRouter);

app.listen(3000);