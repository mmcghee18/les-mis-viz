const _ = require("lodash");
const fs = require("fs");
const { themes } = require("./data/themes.js");

const matrix = [...Array(46).fill(0)].map((e) => Array(46).fill(0));

_.forEach(themes, ({ songs_where_it_appears }) => {
  const sortedSongs = _.sortBy(songs_where_it_appears, "song_id");
  const fromSong = songs_where_it_appears[0];

  for (let i = 1; i < sortedSongs.length; i++) {
    const toSong = sortedSongs[i];

    if (matrix[fromSong.song_id - 1][toSong.song_id - 1]) {
      matrix[fromSong.song_id - 1][toSong.song_id - 1] += 100;
      //matrix[toSong.song_id - 1][fromSong.song_id - 1] += 100;
    } else {
      matrix[fromSong.song_id - 1][toSong.song_id - 1] = 100;
      //matrix[toSong.song_id - 1][fromSong.song_id - 1] = 100;
    }
  }
});

fs.writeFileSync(
  "../essay/src/data/matrix.json",
  JSON.stringify(matrix),
  "utf8"
);
