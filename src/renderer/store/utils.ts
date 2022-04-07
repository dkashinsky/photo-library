export type Action<T> = () => { type: T };
export type PayloadAction<T, P> = (payload: P) => { type: T, payload: P };
