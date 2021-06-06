export {};

declare global {
  var _DEV_: boolean;

  export type Nullable<T> = T | null;

  export interface ModalBase {
    onClose(): void;
  }

  export interface EventTargetBase<T = string> {
    value?: T;
  }

  /**
   * Value or function returns Value
   */
  export type FunctionValue<T, P> = T extends Function ? (props: P) => T : T;
}
