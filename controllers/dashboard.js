"use strict";

const logger = require("../utils/logger");
const assessmentCollection = require('../models/assessment-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Play Gym Dashboard",
      assessments: assessmentCollection,
    };
    logger.info('about to render', assessmentCollection);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
