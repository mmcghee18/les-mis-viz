const _ = require("lodash");
const fs = require("fs");
const { themes } = require("./data/themes.js");

const themeLookup = {};

_.forEach(themes, ({ theme_name, songs_where_it_appears }) => {
  const sortedSongs = _.sortBy(songs_where_it_appears, "song_id");
  const fromIndex = sortedSongs[0].song_id - 1;

  for (let i = 1; i < sortedSongs.length; i++) {
    const toIndex = sortedSongs[i].song_id - 1;
    const tuple = [fromIndex, toIndex];
    themeLookup[tuple] = theme_name;
  }
});

fs.writeFileSync(
  "../essay/src/data/themeLookup.json",
  JSON.stringify(themeLookup),
  "utf8"
);
