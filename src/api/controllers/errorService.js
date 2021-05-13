export default (status, message) => {
  const error = new Error(`status: ${status}; message: ${message}`);
  error.statusCode = status;
  return error;
};
