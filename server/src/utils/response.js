export const sendSuccess = (res, statusCode, message, data = null) => {
  const response = { success: true };
  if (message) response.message = message;
  if (data) response.data = data;
  
  return res.status(statusCode).json(response);
};

export const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};
