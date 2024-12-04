import { useState, useEffect } from "react";

const store = {
  state: {
    show: false,
    message: "",
    severity: "",
    autoClose: true,
  },
  setState(value) {
    if (value) {
      this.state = value;
      this.setters.forEach((setter) => setter(this.state));
    }
  },
  setters: [],
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
store.setState = store.setState.bind(store);

// this is the custom hook we'll call on components.
export function useToastStore() {
  const [state, set] = useState(store.state);
  if (!store.setters.includes(set)) {
    store.setters.push(set);
  }

  useEffect(
    () => () => {
      store.setters = store.setters.filter((setter) => setter !== set);
    },
    []
  );

  return [state, store.setState];
}

// For non component usage
export function setToastState(value) {
  store.setState(value);
}
