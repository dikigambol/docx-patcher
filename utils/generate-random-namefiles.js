const generateRandomFileName = () => {
  try {
    const randomString = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    return `${randomString}_${timestamp}`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateRandomFileName;
