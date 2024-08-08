const onlyString = ['1', '2', '3'];
const onlyNumbers = [1, 2, 3];

const spreadArray = [
  ...onlyString
]; // 이경우 string[] 으로 유추됨

const spreadTypes = [
  ...onlyString,
  ...onlyNumbers,
]; // 이경우 (string | number)[]로 유추됨