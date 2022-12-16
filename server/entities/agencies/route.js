const express = require("express");
const validatorHandler = require("../../middlewares/validator");
const AgencyService = require("./service");
const {
  createAgencySchema,
  updateAgencySchema,
  getAgencySchema,
  loginAgencySchema,
} = require("./schema");
const {
  loginHandler,
  autorizationHandler,
  sameIdHanlder,
} = require("../../middlewares/auth");
const agencyRouter = express.Router();
const service = new AgencyService();

agencyRouter.get("/", async (req, res, next) => {
  try {
    const agencys = await service.find();
    res.json(agencys);
  } catch (error) {
    next(error);
  }
});

agencyRouter.get(
  "/:id",
  autorizationHandler("agency"),
  sameIdHanlder,
  validatorHandler(getAgencySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const agency = await service.findOne(id);
      res.json(agency);
    } catch (error) {
      next(error);
    }
  }
);

agencyRouter.post(
  "/",
  autorizationHandler("agency"),
  validatorHandler(createAgencySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const agency = await service.create(body);
      res.status(201).json(agency);
    } catch (error) {
      next(error);
    }
  }
);

agencyRouter.post(
  "/login",
  validatorHandler(loginAgencySchema, "body"),
  loginHandler(service.findOneByEmail, "agency")
);

agencyRouter.patch(
  "/:id",
  validatorHandler(getAgencySchema, "params"),
  autorizationHandler("agency"),
  sameIdHanlder,
  validatorHandler(updateAgencySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const agency = await service.update(id, body);
      res.status(201).json({
        messaje: `Agency with id: ${id} modified`,
        agency,
      });
    } catch (error) {
      next(error);
    }
  }
);

agencyRouter.delete(
  "/:id",
  autorizationHandler("agency"),
  sameIdHanlder,
  validatorHandler(getAgencySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({
        messaje: `Agency with id: ${id} deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = { agencyRouter };
