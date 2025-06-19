import './App.css';
import styles from './app.module.css';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
	email: yup
		.string()
		.required('Поле не должно быть пустым')
		.matches(
			/^[\w_]*$/,
			'Логин может содержать только АНГЛ буквы, цифры и нижнее подчеркивание',
		),
	password: yup
		.string()
		.required('Поле не должно быть пустым')
		.min(6, 'Пароль должен содержать не меньше 6 символов'),
	confirmPassword: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

function Form() {
	const submitButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log('Отправляем форму:', data);
		reset();
	};

	return (
		<div className={styles.app}>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formGroup}>
					<label htmlFor="email">Email:</label>
					<input type="text" id="email" {...register('email')} />
					{errors.email && (
						<span id={styles.emailError} className={styles.errorLabel}>
							{errors.email?.message}
						</span>
					)}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" {...register('password')} />
					{errors.password && (
						<span id={styles.passwordError} className={styles.errorLabel}>
							{errors.password?.message}
						</span>
					)}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						type="password"
						id="confirmPassword"
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword && (
						<span
							id={styles.confirmPasswordError}
							className={styles.errorLabel}
						>
							{errors.confirmPassword?.message}
						</span>
					)}
				</div>

				<button type="submit" ref={submitButtonRef} disabled={!isValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default Form;
