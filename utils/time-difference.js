import { differenceInYears, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

export const timeDifference = (createdDate) => {
  const now = new Date();
  const createdAt = new Date(createdDate);

  const yearsDifference = differenceInYears(now, createdAt);
  const monthsDifference = differenceInMonths(now, createdAt);
  const weeksDifference = differenceInWeeks(now, createdAt);
  const daysDifference = differenceInDays(now, createdAt);
  const hoursDifference = differenceInHours(now, createdAt);
  const minutesDifference = differenceInMinutes(now, createdAt);
  const secondsDifference = differenceInSeconds(now, createdAt);

  if (yearsDifference > 0) {
    return `${yearsDifference}y`;
  } else if (monthsDifference > 0) {
    return `${monthsDifference}m`
  }
  else if (weeksDifference > 0) {
    return `${weeksDifference}s`;
  } else if (daysDifference > 0) {
    return `${daysDifference}d`;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}h`;
  } else if (minutesDifference > 0) {
    return `${minutesDifference}min`;
  } else {
    return `${secondsDifference}s`;
  };
};
