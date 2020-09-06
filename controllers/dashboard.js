"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const accounts = require("./accounts.js");
const analytics = require("../models/analytics.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Play Gym Dashboard",
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
      members: memberStore.getMemberById(loggedInMember.id),
      bmi: analytics.bmi(loggedInMember.id),
      bmiCategory: analytics.bmiCategory(loggedInMember.id),
      idealWeight: analytics.idealWeight(loggedInMember.id)
    };
    logger.info(
      "about to render",
      assessmentStore.getMemberAssessments(),
      memberStore.getMemberById()
    );
    response.render("dashboard", viewData);
  },

  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newAssessment = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips
    };

    logger.debug("Creating a new Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
