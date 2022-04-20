// DO YOUR MAGIC
const Car = require('./cars-model');
const router = require('express').Router();
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

router.get('/', (req, res next) => {
    Car.getAll()
        .then(car => {
            console.log("getAll");
        })
        .catch(err => {
            res.status(500).json({ message: '500 error getAll' });
        })
})

router.get('/:id', (req, res) => {
    Car.getById(req.params.id)
        .then(car => {
            if (car) {
                console.log('getById');
            } else {
                res.status(404).json({ message: 'Failed to retrieve car' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: '500 error getById' });
        });
});

  router.post('/', (req, res) => {
    Car.create(req.body)
        .then(car => {
            console.log('create');
        })
        .catch(err => {
            res.status(500).json({ message: '500 error create' });
        });
  });
  
  module.exports = router;