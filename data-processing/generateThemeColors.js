const _ = require("lodash");
const fs = require("fs");
const { themes } = require("./data/themes.js");

const theme_names = themes.map((theme) => theme.theme_name);

const themeColors = {};
_.forEach(theme_names, (theme_name) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  themeColors[theme_name] = randomColor;
});

fs.writeFileSync(
  "../essay/src/data/themeColors.json",
  JSON.stringify(themeColors),
  "utf8"
);
