export const AddTypeToBase64 = (base64: string) => {
  return `data:image/png;base64,${base64}`;
}

export const RemoveTypeFromBase64 = (base64: string) => {
  return base64.split(";base64,").pop();
}