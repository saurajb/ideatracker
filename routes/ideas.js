const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Create an idea
router.post('/', async (req, res) => {
  const newidea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const ideas = await newidea.save();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: 'something went wrong' });
  }
});

// Read/Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status.json({ success: false, data: 'something went wrong' });
  }
});

// Read/Get a single idea
router.get('/:id', async (req, res) => {
  try {
    const ideas = await Idea.findById(req.params.id);
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: 'something went wrong' });
  }
});

// Update a single idea
router.put('/:id', async (req, res) => {
  try {
    const ideas = await Idea.findById(req.params.id);

    // if username match
    if (ideas.username === req.body.username) {
      await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: {} });
    }

    //if usernames dont match
    res.status(403).json({
      success: false,
      data: 'update not possible, your username is invalid/different from what is provided',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: 'something went wrong' });
  }
});

// Delete a single idea
router.delete('/:id', async (req, res) => {
  try {
    const ideas = await Idea.findById(req.params.id);

    // if username match
    if (ideas.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    //if usernames dont match
    res.status(403).json({
      success: false,
      data: 'your username, is invalid/different from what is provided',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: 'something went wrong' });
  }
});

module.exports = router;
