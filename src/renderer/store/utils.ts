export type Action<T> = () => { type: T };
export type PayloadAction<T, P> = (payload: P) => { type: T, payload: P };

export type ItemsById<T> = Record<string, T | undefined>;

export const itemsById = <T extends { id: string }>(items: T[]): ItemsById<T> => {
  const result: ItemsById<T> = {};
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, result);
};
