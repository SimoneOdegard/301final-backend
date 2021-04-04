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
  } catch(e) { next(e.message);}
}

// ==================== .GET/READ ====================

Data.getAllItems = async (request, response) => {
  const items = await DataModel.find({});
  response.status(200).send(items);
  console.log('getAllItem', items);
}

Data.getOneItem = async (request, response) => {
  const id = request.params.id;
  const item = await DataModel.find({_id:id});
  response.status(200).json(item[0]);
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
  response.status(200).send('Success! Item deleted.');
  console.log('this is inside deleteOneItem', id)

}


module.exports = Data;
