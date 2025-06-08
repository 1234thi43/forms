import './App.css';
import Select from 'react-select';

function App() {
	const productOptions = [
		{ value: 'tv', label: 'Телевизор' },
		{ value: 'phone', label: 'Телефон' },
		{ value: 'laptop', label: 'Ноутбук' },
	];

	const colorOptions = [
		{ value: 'black', label: 'Черный' },
		{ value: 'white', label: 'Белый' },
		{ value: 'silver', label: 'Серебристый' },
		{ value: 'gold', label: 'Золотой' },
		{ value: 'platina', label: 'Платиновый' },
	];

	return (
		<div>
			<Select options={productOptions} defaultValue={productOptions[0]} />
			<Select
				isMulti
				options={colorOptions}
				defaultValue={[colorOptions[0], colorOptions[2]]}
			/>
		</div>
	);
}

export default App;
