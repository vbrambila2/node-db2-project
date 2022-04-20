const db = require('../../data/db-config');
var vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.params.id) {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` });
  }

  next();
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json({ message: `vin is missing` });
  } else if (!make) {
    res.status(400).json({ message: `make is missing` });
  } else if (!model) {
    res.status(400).json({ message: `model is missing` });
  } else if (!mileage) {
    res.status(400).json({ message: `mileage is missing` });
  }

  next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  if(vinValidator.validate(`${vin}`) === false) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  }

  next();
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const exists = await db('cars').where('vin', req.body.vin.trim()).first();

    if(exists) {
      next(
        res.status(400).json({ message: `vin ${req.body.vin} already exists` })
      )
    } else {
      next()
    }
  } catch(err) {
    next(err);
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}