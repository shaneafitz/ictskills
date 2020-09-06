"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const trainerStore = require("../models/trainer-store");
const accounts = require("./accounts.js");
const analytics = require("../models/analytics.js");
const uuid = require("uuid");

const trainerDashboard = {
  index(request, response) {
    logger.info("Trainer dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const viewData = {
      title: "Trainer Dashboard",
      trainer: trainerStore.getTrainerById(loggedInTrainer.id),
      members: memberStore.getAllMembers(),
      assessments: assessmentStore.getAllAssessments()
    };
    logger.info("about to render", trainerStore.getTrainerById());
    response.render("trainerdashboard", viewData);
  },

  trainerAssessmentView(request, response) {
    logger.info("Trainer assessments dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const member = request.params.id;
    const assessments = assessmentStore.getMemberAssessments(member);
    const viewData = {
      title: "Trainer assessment view Dashboard",
      trainer: loggedInTrainer,
      member: member,
      name: memberStore.getMemberById(member).name,
      assessments: assessments,
      bmi: analytics.bmi(member),
      bmiCategory: analytics.bmiCategory(member),
      idealWeight: analytics.idealWeight(member)
    };
    response.render("trainerassessmentview", viewData);
  }
};

module.exports = trainerDashboard;
