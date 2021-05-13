import Joi from 'joi';

export default Joi.object().keys({
  name: Joi
    .string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
});
