const _ = require("lodash");
const fs = require("fs");
const d3 = require("d3");

const myArgs = process.argv.slice(2);

const songNumber = myArgs[0];
const startPhrase = myArgs[1];
const endPhrase = myArgs[2];

const songs = d3.csvParse(fs.readFileSync("./songs.csv", "utf-8"));
const songObject = songs[songNumber - 1];
const songLyrics = fs.readFileSync(
  `./lyrics/${songObject["lyrics_file_path"]}`,
  "utf-8"
);

const startIndex = songLyrics.toLowerCase().indexOf(startPhrase.toLowerCase());
const endIndex = songLyrics.toLowerCase().indexOf(endPhrase.toLowerCase());

if (startIndex === -1 || endIndex === -1) {
  console.log("one or both phrases not found");
} else {
  let firstSpeaker = "";
  for (let i = startIndex; i >= 0; i--) {
    if (songLyrics[i] === "]" || firstSpeaker !== "") {
      firstSpeaker = songLyrics[i] + firstSpeaker;
    }
    if (songLyrics[i] === "[") {
      break;
    }
  }

  const selectedSection =
    firstSpeaker +
    "\\n" +
    songLyrics
      .substring(startIndex, endIndex + endPhrase.length)
      .replace(/\n/gi, "\\n");

  console.log(selectedSection);
}
