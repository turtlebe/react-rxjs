export const unFuckedIsoDate = (inputDate?: Date | null) => {
  if (!inputDate || inputDate === null) {
    return '';
  }
  const utcDate = new Date(
    Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate())
  );
  const isoDate = utcDate.toISOString();
  return isoDate;
};
