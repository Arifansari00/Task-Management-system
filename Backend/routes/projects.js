const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all projects for user
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create project
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = new Project({ title, description, owner: req.user.id });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.owner.toString() !== req.user.id) return res.status(404).json({ msg: 'Project not found' });

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project || project.owner.toString() !== req.user.id) return res.status(404).json({ msg: 'Project not found' });

    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;