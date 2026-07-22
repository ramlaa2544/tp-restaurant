import Joi from "joi";

export const createMenuSchema = Joi.object({
  nom: Joi.string().required(),
  prix: Joi.number().min(0).required(),
  description: Joi.string().required(),
  restoId: Joi.number().required(),
});

export const updateMenuSchema = Joi.object({
  nom: Joi.string(),
  prix: Joi.number().min(0),
  description: Joi.string(),
  restoId: Joi.number(),
});