const _ = require("lodash");
const fs = require("fs");
const mkdirp = require("mkdirp");
const d3 = require("d3");

const extractSpeaker = (line) => {
  const badChars = ["[", "]"];
  const removeBrackets = line
    .split("")
    .filter((i) => !badChars.includes(i))
    .join("");
  const removeParentheses = removeBrackets.split("(")[0].trim();
  const speakerArray = removeParentheses.split("and");

  const final = _.map(speakerArray, (speaker) =>
    _.startCase(speaker.trim().toLowerCase())
  );
  return final;
};

const createLyricsTable = () => {
  const songs = d3.csvParse(fs.readFileSync("./songs.csv", "utf-8"));
  // .slice(24, 25); // temporarily make it simpler

  const rows = [];
  _.forEach(songs, (songObject) => {
    const lyrics = fs.readFileSync(
      `./lyrics/${songObject["lyrics_file_path"]}`,
      "utf-8"
    );
    const lines = lyrics.split("\n");

    let currentSpeaker = null;
    _.forEach(lines, (line) => {
      if (line.includes("[") && line.includes("]")) {
        currentSpeaker = extractSpeaker(line);
      } else if (line.trim() !== "") {
        const row = {
          song_name: songObject.song_name,
          song_id: songObject.song_id,
          theme_id: "",
          lyric: line,
          characters: currentSpeaker,
        };
        rows.push(row);
      }
    });
  });

  const output = d3.csvFormat(rows);
  mkdirp.sync("./output");
  fs.writeFileSync("./output/lyrics.csv", output);
};

createLyricsTable();
