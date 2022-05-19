const { Schema, model } = require("mongoose");

// CheatSheet model is to build a custom list of 200 players in order of draft importance
const cheatSheet = new Schema(
    {
        title: String,
        players: [ {
            player: String,
            no: String,
            pos: String,
            status: String,
            height: String,
            weight: String,
            experience: String,
            college: String,
            team: String
        } ]
    }
);

const CheatSheet = model("CheatSheet", cheatSheet);

module.exports = CheatSheet;