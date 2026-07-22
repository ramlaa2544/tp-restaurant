import Joi from "joi";

export const createRestaurantSchema = Joi.object({
  nom: Joi.string().required(),
  cuisine: Joi.string().required(),
  note: Joi.number().min(0).max(5).required(),
  prix: Joi.number().min(0).required(),
  ville: Joi.string().required(),
  categorieId: Joi.number().required(),
  popularite: Joi.number().min(0).max(100).required(),
  distance: Joi.number().min(0).required(),
});

export const updateRestaurantSchema = Joi.object({
  nom: Joi.string(),
  cuisine: Joi.string(),
  note: Joi.number().min(0).max(5),
  prix: Joi.number().min(0),
  ville: Joi.string(),
  categorieId: Joi.number(),
  popularite: Joi.number().min(0).max(100),
  distance: Joi.number().min(0),
});