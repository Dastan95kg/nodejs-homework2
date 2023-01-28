import Joi from "joi";
import validation from "express-joi-validation";

export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required().alphanum(),
  age: Joi.number().required().min(4).max(130),
});

export const userValidator = validation.createValidator({});
