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
}
