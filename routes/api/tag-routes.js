const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  try {
    const tagData = await  Tag.findAll({ include: [ { model: Product} ]});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const tagData = await  Tag.findById( req.params.id, { include: [ { model: Product} ]});
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id found.'});
      return;
    }
      res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {where: { id: req.params.id }});
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id found.'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({where: { id: req.params.id }});
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id found.'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
