'use strict';

const Item = require('./item-model.js');
// const DataModel = require('./item-model.js');

const Data = { };

// ==================== .GET/READ ====================

Data.getAllItems = async(request, response) => {
  const id = request.query.id;
  console.log('inside of getAllItems', id);
  const items = await Item.find({id: id}, function(err, items) {
    if (err) return console.log.error(err);
    response.status(200).send(items);
  });
}

Data.getOneItem = async(request, response) => {
  const id = request.param.id;
  const items = await Item.find({_id:id});
  response.status(200).json(items[0]);
}

// ==================== ADD/CREATE/.POST ====================

Data.addAnItem = async(request,response,next) => {
  const id = request.body.id;
  const items = {id};

  await Item.findOne({id}, (err,entry) => {
    if(err) return console.error(err);
    entry.items.push(item);
    entry.save();
    response.status(200).send(entry.items);

    //   const data = request.body;
    //   const item = new Item.post(data);
    //   response.status(404).json(item);
    // } catch(e) { next(e.message); }
  })
}

// ==================== DELETE/.DELETE ====================

Data.deleteOneItem = async(request, response) => {
  const id = parseInt(request.params.id);
  console.log('this is our item array', id)

  await Item.findOne({id: id})

}

// ==================== UPDATE/.PUT ====================

Data.updateOneItem = async(request, response) => {
  const id = request.param.id;
  const data = request.body.data;

  const item = await Item.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  response.status(200).json(item);
}

module.exports = Data;
