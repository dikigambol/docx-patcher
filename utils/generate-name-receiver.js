const generateNameReceiver = (userData, tujuan) => {
  const ttdMerged = tujuan.map((id) => {
    const user_data = userData.find((item) => item.user_id === id);

    return user_data ? user_data.name : id;
  });

  return ttdMerged;
};

module.exports = generateNameReceiver;
