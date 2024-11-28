export function parseToHHMM(dateString: string): string {
  const [, timePart] = dateString.split(" ");
  const [hours, minutes] = timePart.split(":"); // TODO investigate in DB
  return `${parseInt(hours)+1}:${minutes}`;
}
