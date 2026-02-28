let CarModel = require('../models/cars');


module.exports.getCar = async function (req, res, next) {
  try {
    
    let car = await CarModel.findOne({ _id: req.params.carId });
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Car retrieved successfully.",
      data: car
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.create = async function (req, res, next) {
  try {
    let car = req.body;
    let result = await CarModel.create(car);
    
    res.status(200).json({
      success: true,
      message: "Car created successfully.",
      data: result
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.getAll = async function (req, res, next) {
  try {
    let list = await CarModel.find({});
    
    res.status(200).json({
      success: true,
      message: "Car list retrieved successfully.",
      data: list
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let result = await CarModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Car updated successfully."
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Car not found or no changes made."
      });
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    let result = await CarModel.deleteOne({ _id: req.params.id });
    
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Car deleted successfully."
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Car not found."
      });
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}