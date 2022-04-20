const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('cars').where('id', id).first();
}

async function create(car) {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert(car);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create
}