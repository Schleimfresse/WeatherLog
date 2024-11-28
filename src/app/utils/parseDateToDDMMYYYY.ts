export function parseToDDMMYYYY(dateString: string): string {
  const [datePart] = dateString.split(" ");

  const [year, month, day] = datePart.split("-");

  return `${day}-${month}-${year}`;
}
