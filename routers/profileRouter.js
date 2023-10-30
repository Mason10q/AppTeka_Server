const express = require("express");
const profileRouter = express.Router();
const urlEncodedParser = express.urlencoded({extended: false});

const authController = require("../controllers/authController.js");
const mainController = require("../controllers/mainController.js");

//profileRouter.get("/", userController.getProfile);

profileRouter.post("/changePassword", urlEncodedParser, authController.changePassword);
profileRouter.get("/exit", authController.logOut);
profileRouter.delete("/delete", authController.deleteProfile);


profileRouter.post("/signup", urlEncodedParser, authController.signUp);
profileRouter.post("/signin", urlEncodedParser, authController.signIn);

profileRouter.get("/getAllDrugs", mainController.getAllDrugs);
profileRouter.post("/deleteDrug", mainController.deleteDrug);
profileRouter.post("/getUserByEmail", mainController.getUserByEmail);
profileRouter.post("/checkIfInBasket", mainController.checkIfInBasket);
profileRouter.post("/addToBasket", mainController.addToBasket);
profileRouter.post("/getAllBasket", mainController.getAllBasket);
profileRouter.put("/decrease", mainController.decrease);
profileRouter.put("/increase", mainController.increase);
profileRouter.post("/delete", mainController.delete);



module.exports = profileRouter;