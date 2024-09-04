export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "INR",
  }).format(value);
};
