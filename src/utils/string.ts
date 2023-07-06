// can also use slice(1)
export const capitalize = (val: string) =>
  val ? val.charAt(0).toUpperCase() + val.substring(1) : "";

  export const getIniitial = (name: string) => name.split(" ").map(word => word[0].toUpperCase()).join('')
