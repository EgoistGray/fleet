// can also use slice(1)
export const capitalize = (val: string) =>
  val ? val.charAt(0).toUpperCase() + val.substring(1) : "";
