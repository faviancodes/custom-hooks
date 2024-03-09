import { useState } from "react";

export const useForm = (initialValue = {}) => {
  const [formState, setformState] = useState(initialValue);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setformState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setformState(initialValue);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
