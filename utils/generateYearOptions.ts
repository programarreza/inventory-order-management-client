// Generate dynamic year options (current year + next 2 years)
export const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 3 }, (_, index) => {
    const year = currentYear + index;

    return { value: year.toString(), label: year.toString() };
  });
};
