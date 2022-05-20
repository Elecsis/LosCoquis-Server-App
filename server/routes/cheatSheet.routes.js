const CheatSheet = require("../models/CheatSheet.model");
const Coqui = require('../models/Coqui.model')
const express = require("express");


const router = express.Router();


//Post route to add new cheatsheet for user(coqui)
router.post("/create-cheatsheet",  (req, res, next) => {
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

        CheatSheet.create({ title, players, coquiId: req.payload._id })
            .then((createdCheatSheet) => {
                
              Coqui.findByIdAndUpdate(req.payload._id, {
                $push: {
                  cheatsheets: createdCheatSheet._id
                }
              })
                .then((foundCoqui) => {
                  // Send a json response containing the user object
                res.status(201).json({ cheatSheet: createdCheatSheet });
                return;
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({ message: "Internal Server Error" })
                  return;
                 })
                
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


// GET request for cheatsheet list

router.get("/cheatsheet-home", (req, res, next) => {       // <== CREATE NEW ROUTE
 
  const userId = req.payload._id;

  Coqui.findById(userId)
    .populate('cheatsheets')
    .then(coqui => res.json(coqui))
    .catch(err => {
      console.log(err)
      res.json(err)
    })
});

module.exports = router