const express = require('express');

const hostRouter = express.Router();

const homesController=require('../controller/host')

hostRouter.get("/add-home", homesController.getAddHome);


hostRouter.post("/add-home", homesController.postAddHome);

hostRouter.get("/host-home-list", homesController.getHostHome);
hostRouter.get("/edit-home/:homeId", homesController.getEditHome);

hostRouter.post("/edit-home", homesController.postEditHome);
hostRouter.post("/delete-home/:homeId", homesController.postDeleteHome);
exports.hostRouter = hostRouter;