export default (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
  if (error?.isJoi) {
    error.statusCode = 400;
    return next(error);
  }
  next();
};
