export function useState<T>(initialValue?: T) {
  const state = {
    value: initialValue,
  }

  function getState() {
    return state
  }

  function setState(value: T) {
    state.value = value
  }

  return [getState(), setState]
}
