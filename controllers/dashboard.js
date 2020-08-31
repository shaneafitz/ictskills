"use strict";

const logger = require("../utils/logger");
const assessmentCollection = require("../models/assessment-store.js");
const member = require("../models/member-store.js");




const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Play Gym Dashboard",
      assessments: assessmentCollection,
      members: member,
    };
    logger.info("about to render", assessmentCollection, member);
    response.render("dashboard", viewData);
  },
  
};

module.exports = dashboard;
