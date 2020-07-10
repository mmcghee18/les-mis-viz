const _ = require("lodash");
const fs = require("fs");
const { themes } = require("./data/themes.js");

const matrix = [...Array(46).fill(0)].map((e) => Array(46).fill(0));

_.forEach(themes, ({ theme_name, songs_where_it_appears }) => {
  for (let i = 0; i < songs_where_it_appears.length; i++) {
    for (let j = i + 1; j < songs_where_it_appears.length; j++) {
      const song1 = songs_where_it_appears[i];
      const song2 = songs_where_it_appears[j];

      if (matrix[song1.song_id - 1][song2.song_id - 1]) {
        matrix[song1.song_id - 1][song2.song_id - 1] += 100;
      } else {
        matrix[song1.song_id - 1][song2.song_id - 1] = 100;
      }

      if (matrix[song2.song_id - 1][song1.song_id - 1]) {
        matrix[song2.song_id - 1][song1.song_id - 1] += 100;
      } else {
        matrix[song2.song_id - 1][song1.song_id - 1] = 100;
      }
    }
  }
});

fs.writeFileSync("../essay/src/matrix.json", JSON.stringify(matrix), "utf8");
