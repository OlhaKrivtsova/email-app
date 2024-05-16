import {useReducer} from 'react';

const reducerInput = (prevState, action) => {
  if (action.type === 'USER_ENTER_VALUE')
    return {
      inputValue: action.value,
      isInputWasTouched: prevState.isInputWasTouched,
    };
  if (action.type === 'USER_LEAVE_INPUT')
    return {
      inputValue: prevState.inputValue,
      isInputWasTouched: true,
    };
  if (action.type === 'RESET_INPUT') {
    return {
      inputValue: '',
      isInputWasTouched: false,
    };
  }

  return prevState;
};

const useInput = (valueValidator, initialInputValue = '') => {
  const initialState = {
    inputValue: initialInputValue,
    isInputWasTouched: false,
  };
  const [inputState, dispatchInputState] = useReducer(
    reducerInput,
    initialState
  );

  const isValueValid = valueValidator(inputState.inputValue);
  const hasInputError = !isValueValid && inputState.isInputWasTouched;

  const changeInputHandler = event => {
    dispatchInputState({type: 'USER_ENTER_VALUE', value: event.target.value});
  };

  const blurInputHandler = () => {
    dispatchInputState({type: 'USER_LEAVE_INPUT'});
  };

  const resetInputState = () => {
    dispatchInputState({type: 'RESET_INPUT'});
  };

  return {
    inputValue: inputState.inputValue,
    isValueValid,
    hasInputError,
    changeInputHandler,
    blurInputHandler,
    resetInputState,
  };
};

export default useInput;
