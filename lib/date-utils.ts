export const nbno_dateFormatter_dateAndTime = new Intl.DateTimeFormat("nb-NO", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export const nbno_dateFormatter_date = new Intl.DateTimeFormat("nb-NO", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const get_nbNO_formattedDate = (date: Date) => {
  return nbno_dateFormatter_dateAndTime.format(date).replace(",", "");
};

export const dateFormatter = {
  datetime: (date: Date) =>
    new Intl.DateTimeFormat("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  date: (date: Date) =>
    new Intl.DateTimeFormat("nb-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date),
};
