#!/usr/bin/env node
const path = require("path");
const processVideoFiles = require("./index"); // Assuming 'index.js' contains your main script

const args = process.argv.slice(2);
const targetDirectory = args[0] || ".";

processVideoFiles(path.resolve(targetDirectory))
  .then(() => {
    console.log("Processing complete.");
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
