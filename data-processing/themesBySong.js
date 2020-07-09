const _ = require("lodash");
const fs = require("fs");
const mkdirp = require("mkdirp");
const d3 = require("d3");
const { themes } = require("./data/themes.js");

const songs = d3.csvParse(fs.readFileSync("./songs.csv", "utf-8"));

const themesBySong = {};

_.forEach(songs, (song) => {
  const themesInThisSong = [];
  const { song_name } = song;
  const song_id = parseInt(song.song_id);

  _.forEach(themes, (theme) => {
    const songsInThisTheme = theme.songs_where_it_appears;
    const foundInThisTheme = _.find(
      songsInThisTheme,
      (song) =>
        song.song_id === song_id &&
        song.song_name.toLowerCase() === song_name.toLowerCase()
    );
    if (foundInThisTheme) {
      themesInThisSong.push(theme.theme_name);
    }
  });

  themesBySong[song_name] = themesInThisSong;
});

fs.writeFileSync(
  "../essay/src/themesBySong.json",
  JSON.stringify(themesBySong),
  "utf8",
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  }
);
