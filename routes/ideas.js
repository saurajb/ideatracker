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
    const ideas = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: 'something went wrong' });
  }
});

// Delete a single idea
router.delete('/:id', async (req, res) => {
  try {
    const ideas = await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: 'something went wrong' });
  }
});

module.exports = router;
