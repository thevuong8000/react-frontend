export {};

declare global {
  var _DEV_: boolean;

  export type Nullable<T> = T | null | undefined;

  export interface ModalBase {
    onClose(): void;
  }

  export interface EventTargetBase<T = string> {
    value: T;
  }

  /**
   * non-function type
   */
  export type NonFunction<T> = T extends Function ? never : T;

  /**
   * Value or function returns Value
   */
  export type FunctionValue<T, P> = T extends Function ? never : T | ((props: P) => T);

  /**
   * message
   */
  export interface Message {
    message: string;
  }
}
