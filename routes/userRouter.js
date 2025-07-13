const express = require("express");

const userRouter = express.Router();

const homesController = require("../controller/store");
userRouter.get("/", homesController.getindex);
userRouter.get("/home", homesController.getHome);
userRouter.get("/bookings", homesController.getBookings);
userRouter.get("/favourites", homesController.getfavouriteslist);
userRouter.get("/home/:homeId", homesController.getHomeDetails);
userRouter.post("/favourites", homesController.postAddToFavourites);
userRouter.post(
  "/favourites/delete/:homeId",
  homesController.postRemoveFromFavourites
);
module.exports = userRouter;
