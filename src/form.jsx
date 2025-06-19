import './App.css';
import styles from './app.module.css';
import { useState, useEffect, useRef } from 'react';

function Form() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [isFormValid, setIsFormValid] = useState(false);

	const submitButtonRef = useRef(null);

	useEffect(() => {
		const isValid =
			!Object.values(errors).some((error) => error) &&
			Object.values(formData).every((field) => field);
		setIsFormValid(isValid);

		if (isValid && submitButtonRef.current) {
			// без задержки не срабатывает фокус
			const timer = setTimeout(() => {
				submitButtonRef.current.focus();
			}, 10);
			return () => clearTimeout(timer);
		}
	}, [errors, formData]);

	const validateField = (name, value) => {
		let error = '';

		switch (name) {
			case 'email':
				if (!value) {
					error = 'Поле не должно быть пустым';
				} else if (!/^[\w_]*$/.test(value)) {
					error =
						'Логин может содержать только АНГЛ буквы, цифры и нижнее подчеркивание';
				}
				break;
			case 'password':
				if (!value) {
					error = 'Поле не должно быть пустым';
				} else if (value.length < 6) {
					error = 'Пароль должен содержать не меньше 6 символов';
				}
				break;
			case 'confirmPassword':
				if (!value) {
					error = 'Повторите пароль';
				} else if (value !== formData.password) {
					error = 'Пароли не совпадают';
				}
				break;
			default:
				break;
		}

		return error;
	};

	const onChangeInput = (event) => {
		const { name, value } = event.target;
		const error = validateField(name, value);

		setFormData({
			...formData,
			[name]: value,
		});

		setErrors({
			...errors,
			[name]: error,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (isFormValid) {
			console.log('Отправляем форму:', formData);
		}

		setFormData({
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	return (
		<div className={styles.app}>
			<h2>Регистрация</h2>
			<form onSubmit={onSubmit}>
				<div className={styles.formGroup}>
					<label htmlFor="email">Email:</label>
					<input
						type="text"
						id="email"
						name="email"
						value={formData.email}
						onChange={onChangeInput}
						aria-describedby="emailError"
						aria-invalid={!!errors.email}
					/>
					{errors.email && (
						<span id={styles.emailError} className={styles.error}>
							{errors.email}
						</span>
					)}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={onChangeInput}
						aria-describedby="passwordError"
						aria-invalid={!!errors.password}
					/>
					{errors.password && (
						<span id={styles.passwordError} className={styles.error}>
							{errors.password}
						</span>
					)}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={onChangeInput}
						aria-describedby="confirmPasswordError"
						aria-invalid={!!errors.confirmPassword}
					/>
					{errors.confirmPassword && (
						<span id={styles.confirmPasswordError} className={styles.error}>
							{errors.confirmPassword}
						</span>
					)}
				</div>

				<button type="submit" ref={submitButtonRef} disabled={!isFormValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default Form;
