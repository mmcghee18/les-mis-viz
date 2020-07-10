const _ = require("lodash");
const fs = require("fs");
const mkdirp = require("mkdirp");
const d3 = require("d3");
const { themes } = require("./data/themes.js");

const songs = d3.csvParse(fs.readFileSync("./songs.csv", "utf-8"));

const songNames = _.map(songs, (song) => song.song_name);

fs.writeFileSync(
  "../essay/src/data/songNames.json",
  JSON.stringify(songNames),
  "utf8",
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  }
);
