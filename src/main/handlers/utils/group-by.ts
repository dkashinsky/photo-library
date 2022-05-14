export const groupBy = <Ti, To>(
  array: Ti[],
  key: keyof {
    [Key in keyof Ti as Ti[Key] extends string ? Key : never]: Ti[Key]
  },
  project: (item: Ti) => To
): Record<string, To[]> => {
  const dictionary: Record<string, To[]> = {};

  array.forEach(item => {
    const groupKey: string = item[key] as unknown as string;
    dictionary[groupKey] = dictionary[groupKey] || [];
    dictionary[groupKey].push(project(item));
  });

  return dictionary;
};
