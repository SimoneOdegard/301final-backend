'use strict';

// const Item = require('./item-model.js');
const DataModel = require('./item-model.js');

const Data = {};

// ==================== ADD/CREATE/.POST ====================

Data.addAnItem = async (request, response, next) => {
  try {
    const data = request.body;
    const item = new DataModel(data);
    console.log(item);
    await item.save();
    response.status(200).send(item);
  } catch (err) { next(err.message); }
}

// ==================== .GET/READ ====================

Data.getAllItems = async (request, response) => {
  const items = await DataModel.find({}, function (err, items) {
    if (err) return console.log.error(err);
  });
  response.status(200).send(items);
  console.log('getAllItem', items);
}

Data.getOneItem = async (request, response) => {
  const id = request.params.id;
  await DataModel.findById(id, function (err, item) {
    if (err) { return (err.message) }
    else {
      response.status(200).send(item);
    }
  });
  console.log('inside of getOneItem', id);
}

// ==================== UPDATE/.PUT ====================

Data.updateOneItem = async (request, response) => {
  const id = request.params.id;
  const data = request.body;
  const item = await DataModel.findByIdAndUpdate(id, data, { new: true, useFindAndModify: false });
  response.status(200).json(item);
}

// ==================== DELETE/.DELETE ====================

Data.deleteOneItem = async (request, response) => {
  const id = request.params.id;
  await DataModel.deleteOne({ _id: id });
  response.status(200).send('success! item deleted.');
  console.log('this is inside deleteOneItem', id)

  // await Item.findOne({_id: id})

}


module.exports = Data;
