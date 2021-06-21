const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({include: [{model: Product}], });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
 try{
   const categoryData = await Category.findById(req.params.id, {include: [{ model: Product}], });
   if (!categoryData) {
     res.status(404).json({message:'No category with this id was found.'});
     return;
   }
   res.status(200).json(categoryData);
 } catch (err) {
   res.status(500).json(err);
 }
});

router.post('/', (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  try{
    const categoryData = await Category.update(req.body, {where: { id: req.params.id }});
    if (!categoryData) {
      res.status(404).json({message:'No category with this id was found.'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try{
    const categoryData = await Category.destroy({where: { id: req.params.id }});
    if (!categoryData) {
      res.status(404).json({message:'No category with this id was found.'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
