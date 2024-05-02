function getIntFromFormData(formData: FormData, field: string) {
  return formData.get(field) === null
    ? null
    : parseInt(formData.get(field) as string);
}

export { getIntFromFormData };
