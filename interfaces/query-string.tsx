export type TParam = string | string[] | undefined;
export type TRecord<K extends keyof any, T> = {
    [P in K]: T;
};
