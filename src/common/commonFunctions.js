export const getFormattedDate = () => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear().toString().slice(-2);
  const hours = currentDate.getHours();
  const mins = currentDate.getMinutes();

  const formattedDate = `${day}/${month}/${year},${hours}:${mins}`;
  return formattedDate;
};
