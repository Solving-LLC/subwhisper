#!/usr/bin/env node
const path = require("path");
const processVideoFiles = require("./index"); // Assuming 'index.js' contains your main script

const args = process.argv.slice(2);
const targetDirectory = args[0] || ".";

processVideoFiles(path.resolve(targetDirectory))
  .then(() => {
    console.log("Processing complete.");
    console.log("");
    console.log("🫶")
    console.log("Made with love by Solving LLC")
    console.log("Contribute: https://github.com/Solving-LLC/subwhisper")
    console.log("Follow http://solving.llc/")
    console.log("Connect http://ceo.solving.llc/")
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
