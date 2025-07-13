const Home = require("../models/home");
const favourite = require("../models/favourite");
exports.getindex = (req, res, next) => {
  Home.fetchAll().then((registeredhomes) => {
    res.render("store/index", {
      registeredhomes: registeredhomes,
      pagetitle: "index",
      heading: "Welcome to index",
    });
  });
};

exports.getHome = (req, res, next) => {
  Home.fetchAll().then((registeredhomes) => {
    res.render("store/home-list", {
      registeredhomes: registeredhomes,
      pagetitle: "home",
      heading: "Welcome to Airbnb",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/booking", {
    pagetitle: "bookings",
  });
};

exports.getfavouriteslist = (req, res, next) => {
  favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
    Home.fetchAll().then(registeredhomes => {
      const favouriteHomes = registeredhomes.filter((home) =>
        favourites.includes(home._id.toString())
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pagetitle: "my favourites",
        heading: "Welcome to Favouritelist",
      });
    });
  });
};

exports.postAddToFavourites = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new favourite(homeId);
  fav.save().then(result => {
    console.log('fav added:', result);
  }).catch(err => {
    console.log('Error while marking favourite:', err);
  }).finally(() => {
    res.redirect('/favourites');
  })
};

exports.postRemoveFromFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  favourite.deleteById(homeId).then(result => {
    console.log('fav removed:', result);
  }).catch(err => {
    console.log('Error while marking favourite:', err);
  }).finally(() => {
    res.redirect('/favourites');
  })
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/home");
    } else {
      res.render("store/home-detail", {
        home: home,
        pagetitle: "home-detail",
        heading: "Welcome to details Page",
      });
    }
  });
};
