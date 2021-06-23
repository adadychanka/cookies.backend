const toApiResult = (data, error = null) => {
  return {
    data: data,
    error,
  };
};

module.exports = {
  toApiResult,
};
