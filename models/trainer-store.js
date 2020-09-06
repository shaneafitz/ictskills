"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const memberStore = require("../models/member-store.js");

const trainerStore = {
  store: new JsonStore("./models/trainer-store.json", { trainers: [] }),
  collection: "trainers",

  getAllTrainers() {
    return this.store.findAll(this.collection);
  },

  addTrainer(trainer) {
    this.store.add(this.collection, trainer);
    this.store.save();
  },

  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  checkTrainerPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  }
};

module.exports = trainerStore;
