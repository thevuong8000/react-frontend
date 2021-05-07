/**
 * Return value corresponding to state
 * @param {boolean} state
 * @param {object} values
 * @returns {any}
 */
const useToggle = (state, { trueValue, falseValue }) => (state ? trueValue : falseValue);

export default useToggle;
