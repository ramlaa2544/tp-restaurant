import Joi from "joi";

export const createCategorieSchema = Joi.object({
  nom: Joi.string().required(),
});

export const updateCategorieSchema = Joi.object({
  nom: Joi.string(),
});