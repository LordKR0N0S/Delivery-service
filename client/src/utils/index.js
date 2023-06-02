export const convertToNormalFormat = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return `${formattedDate} ${formattedTime}`;
};
