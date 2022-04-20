// DO YOUR MAGIC
const Car = require('./cars-model');
const router = require('express').Router();
const { checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

router.get('/', (req, res) => {
    Car.getAll()
        .then(car => {
            res.json(car);
        })
        .catch(() => {
            res.status(500).json({ message: '500 error getAll' });
        })
})

router.get('/:id', (req, res) => {
    Car.getById(req.params.id)
        .then(car => {
            if (car) {
                res.json(car);
            } else {
                res.status(404).json({ message: 'Failed to retrieve car' });
            }
        })
        .catch(() => {
            res.status(500).json({ message: '500 error getById' });
        });
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const data = await Car.create(req.body);
        res.status(201).json(data);
    } catch(err) {
        next(err)
    }
});
  
  module.exports = router;