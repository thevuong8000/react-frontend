export {};

declare global {
	var _DEV_: boolean;

	export type Nullable<T> = T | null;

	/**
	 * non-function type
	 */
	export type NonFunction<T> = T extends Function ? never : T;
}
