"use strict";
const _ = require("lodash");
const JsonStore = require("./json-store");
const memberStore = require("../models/member-store.js");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
    assessmentCollection: []
  }),
  collection: "assessmentCollection",

  getAllAssessments() {
    return this.assessmentCollection;
  },

  getAssessment(id) {
    return _.find(this.assessmentCollection, { id: id });
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberAssessments(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },

  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  }
};

module.exports = assessmentStore;
