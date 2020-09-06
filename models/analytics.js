"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const uuid = require("uuid");

const analytics = {
  bmi(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    if (assessments.length === 0) {
      const bmi = member.startingWeight / Math.pow(member.height, 2);
      return Math.round(bmi * 100) / 100;
    } else {
      const bmi =
        assessments[assessments.length - 1].weight / Math.pow(member.height, 2);
      return Math.round(bmi * 100) / 100;
    }
  },

  bmiCategory(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    const bmi = this.bmi(id);

    if (bmi < 16) {
      return "Very Severly Underweight";
    } else if (bmi >= 16 && bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25.0) {
      return "Normal";
    } else if (bmi >= 25.0 && bmi < 30.0) {
      return "Overweight";
    } else if (bmi >= 30.0 && bmi < 35.0) {
      return "Moderately Obese";
    } else if (bmi >= 35.0) {
      return "Severly Obese";
    }
  },

  //Made with help from Tadhg Ó Conghaile
  idealWeight(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    let idealWeight = 0;
    const minHeight = 152;
    let weight = member.startingweight;
    if (assessments.length > 0) {
      weight = assessments[assessments.length - 1].weight;
    }

    if (member.height < minHeight) {
      if (member.gender === "Male" || "male" || "m") {
        idealWeight = 50;
      } else {
        idealWeight = 45.5;
      }
    } else {
      if (member.gender === "Male" || "male" || "m") {
        idealWeight = 50 + ((member.height - minHeight) * 5.85);
      } else {
        idealWeight = 45.5 + ((member.height - minHeight) * 5.85);
      }
    }
    return ((idealWeight <= (weight + 2.0)) && (idealWeight >= (weight - 2.0)));
  }
};

module.exports = analytics;
