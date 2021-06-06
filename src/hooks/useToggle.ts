interface ToggleValue<T> {
  trueValue: T;
  falseValue: T;
}

/**
 * Return value corresponding to state
 * @param {boolean} state
 * @param {object} values
 * @returns {any}
 */
const useToggle = <T>(state: boolean, { trueValue, falseValue }: ToggleValue<T>): T =>
  state ? trueValue : falseValue;

export default useToggle;
