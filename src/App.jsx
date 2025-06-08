import { useState } from 'react';
import './App.css';

const initialState = {
  email: '',
  login: '',
  password: '',
};

const useFormStore = () => {
  const [state, setState] = useState(initialState);

  const updateState = (fieldName, value) => {
    setState(prev => ({ ...prev, [fieldName]: value }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return {
    formData: state,
    updateState,
    resetState,
  };
};

function App() {
  const { formData, updateState, resetState } = useFormStore();
  const { email, login, password } = formData;

  const sendData = (data) => {
    console.log(data);
	resetState()
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendData(formData);
  };

  const onChange = ({ target }) => {
    updateState(target.name, target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Почта"
        onChange={onChange}
      />

      <input
        type="text"
        name="login"
        value={login}
        placeholder="Логин"
        onChange={onChange}
      />

      <input
        type="password"
        name="password"
        value={password}
        placeholder="Пароль"
        onChange={onChange}
      />

      <div>
        <button type="submit">Отправить</button>
        <button type="button" onClick={resetState}>
          Сбросить
        </button>
      </div>
    </form>
  );
}

export default App;
