const fromModelInstanceToObject = (modelInstance) => {
  if (!modelInstance) return modelInstance;

  if (!modelInstance.get) return modelInstance;

  if (typeof modelInstance.get !== "function") return modelInstance;

  return modelInstance.get();
};

module.exports = {
  fromModelInstanceToObject,
};
