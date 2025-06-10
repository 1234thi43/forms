import { useForm } from 'react-hook-form';
import './App.css';
import styles from './app.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldScheme = yup.object().shape({
	login: yup
		.string()
		.matches(/^[\w_]*$/, 'Цифры буквы и нижнее подчеркивание')
		.max(20, 'Не более 20 символов')
		.min(3, 'Не менее 3 символов'),
});

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
		},
		// mode: 'onChange',
		resolver: yupResolver(fieldScheme),
	});

	const loginError = errors.login?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{loginError && <div className={styles.errorLabel}>{loginError}</div>}
			<input name="login" type="text" {...register('login')} />
			<button type="submit" disabled={!!loginError}>
				Отправить
			</button>
		</form>
	);
}

export default App;
