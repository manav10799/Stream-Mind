const useCanPerformActions = (input) => {
  const data = JSON.parse(localStorage.getItem(input)) || {
    count: 0,
    timeStamp: Date.now(),
  };

  const OneDay = 24 * 60 * 60 * 1000;
  if (Date.now() - data.timeStamp > OneDay) {
    data.count = 0;
    data.timeStamp = Date.now();
  }

  if (data.count >= 10) {
    return false;
  }
  data.count++;
  localStorage.setItem(input, JSON.stringify(data));
  return true;
};

export default useCanPerformActions;
