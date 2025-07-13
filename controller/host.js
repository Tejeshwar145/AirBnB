const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  console.log(req.url, req.method);
  res.render("host/edit-home", {
    pagetitle: "add-home",
    editing: false,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then(home => {
      if (!home) {
        console.log("home not found for editing ");
        return res.redirect("/host/host-home-list");
      }
      console.log(homeId, home);
      console.log(req.url, req.method);
      res.render("host/edit-home", {
        home: home,
        pagetitle: "edit-home",
        editing: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getHostHome = (req, res, next) => {
  Home.fetchAll().then(registeredhomes => {
    res.render("host/host-home-list", {
      registeredhomes: registeredhomes,
      pagetitle: "home",
      heading: "here are your homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.url, req.method, req.body);
  const { housename, price, rating, imageurl, description } = req.body;
  const home = new Home(housename, price, rating, imageurl, description);
  home.save().then(() => {
    console.log('home saved successfully');
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, housename, price, rating, imageurl, description } = req.body;
  const home = new Home(housename, price, rating, imageurl, description, id);
  home.save().then(result => {
    console.log('home updated', result);
  });
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then (()=> {
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log("error while deleting", error);
  }
  )
};
