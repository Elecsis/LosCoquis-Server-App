const CheatSheet = require("../models/CheatSheet.model");
const express = require("express");

const router = express.Router();

router.post("/create-cheatsheet", (req, res, next) => {
    const { title, players } = req.body;

    console.log(req.body)

    if (title === '' || players.length === 0) {
        res.status(400).json({ message: "Provide title of cheatsheet & pick players" });
        return;
      }

    CheatSheet.findOne({ title })
      .then((foundCheatSheet) => {
        // If the user with the same CheatSheet title, send an error response
        console.log('found title?', foundCheatSheet)
        if (foundCheatSheet) {
          res.status(400).json({ message: "CheatSheet title already exists." });
          return;
        }

        CheatSheet.create({ title, players })
            .then((createdCheatSheet) => {
                // Deconstruct the newly created cheatSheet object to omit the password
                // We should never expose passwords publicly
                console.log('created cheatsheet', createdCheatSheet)
                const { title, players, _id } = createdCheatSheet;
            
                // Create a new object that doesn't expose the password
                const cheatSheet = { title, players, _id };
        
                // Send a json response containing the user object
                res.status(201).json({ cheatSheet: cheatSheet });
                return;
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Internal Server Error" })
                return;
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
        return;
      });
});


module.exports = router