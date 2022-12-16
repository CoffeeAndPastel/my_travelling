const express = require("express");
const { autorizationHandler } = require("../../middlewares/auth");
const validatorHandler = require("../../middlewares/validator");
const {
  createOfferrSchema,
  updateOfferrSchema,
  getOfferrSchema,
} = require("./schema");
const Offer = require("./service");
const offerRouter = express.Router();
const service = new Offer();

offerRouter.get("/", async (req, res, next) => {
  try {
    const offers = await service.find();
    res.json(offers);
  } catch (error) {
    next(error);
  }
});

offerRouter.get(
  "/:id",
  validatorHandler(getOfferrSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const offer = await service.findOne(id);
      res.json(offer);
    } catch (error) {
      next(error);
    }
  }
);

offerRouter.post(
  "/",
  autorizationHandler("agency"),
  validatorHandler(createOfferrSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const offer = await service.create(body);
      res.status(201).json(offer);
    } catch (error) {
      next(error);
    }
  }
);

offerRouter.patch(
  "/:id",
  validatorHandler(getOfferrSchema, "params"),
  autorizationHandler("agency"),
  validatorHandler(updateOfferrSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const offer = await service.update(id, body);
      res.status(201).json({
        messaje: `Offer with id: ${id} modified`,
        offer,
      });
    } catch (error) {
      next(error);
    }
  }
);

offerRouter.delete(
  "/:id",
  validatorHandler(getOfferrSchema, "params"),
  autorizationHandler("agency"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({
        messaje: `Offer with id: ${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { offerRouter };
