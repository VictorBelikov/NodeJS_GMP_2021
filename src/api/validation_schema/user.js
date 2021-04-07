import Joi from 'joi';

export default Joi.object().keys({
  login: Joi
    .string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/))
    .message('Incorrect data. Password must contain letter and numbers.')
    .required(),
  age: Joi
    .number()
    .integer()
    .min(4)
    .max(130)
    .required(),
});
