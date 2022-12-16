const express = require("express");
const { autorizationHandler } = require("../../middlewares/auth");
const validatorHandler = require("../../middlewares/validator");
const {
  createDriverOpinionSchema,
  updateDriverOpinionSchema,
  getDriverOpinionSchema,
} = require("./schema");
const DriversOpinionsService = require("./service");
const driverOpinionRouter = express.Router();
const service = new DriversOpinionsService();

driverOpinionRouter.get("/", async (req, res, next) => {
  try {
    const driversOpinions = await service.find();
    res.json(driversOpinions);
  } catch (error) {
    next(error);
  }
});

driverOpinionRouter.get(
  "/:id",
  validatorHandler(getDriverOpinionSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const driverOpinion = await service.findOne(id);
      res.json(driverOpinion);
    } catch (error) {
      next(error);
    }
  }
);

driverOpinionRouter.post(
  "/",
  autorizationHandler("driver"),
  validatorHandler(createDriverOpinionSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const driverOpinion = await service.create(body);
      res.status(201).json(driverOpinion);
    } catch (error) {
      next(error);
    }
  }
);

driverOpinionRouter.patch(
  "/:id",
  validatorHandler(getDriverOpinionSchema, "params"),
  autorizationHandler('driver'),
  validatorHandler(updateDriverOpinionSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const driverOpinion = await service.update(id, body);
      res.status(201).json({
        messaje: `Opinion with id: ${id} modified`,
        driverOpinion,
      });
    } catch (error) {
      next(error);
    }
  }
);

driverOpinionRouter.delete(
  "/:id",
  autorizationHandler('driver'),
  validatorHandler(getDriverOpinionSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({
        messaje: `Opinion with id: ${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { driverOpinionRouter };
