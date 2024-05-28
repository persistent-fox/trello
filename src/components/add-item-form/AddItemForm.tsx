import { ChangeEvent, useState } from 'react';

type TAddItemForm = {
	addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: TAddItemForm) => {
	const [value, setValue] = useState('');
	const [error, setError] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
		setError(false);
	};

	const onChange = () => {
		if (value.trim() !== '') {
			addItem(value);
			setValue('');
		} else {
			setError(true);
		}
	};

	return (
		<div className='item-form'>
			<div className='wrapper'>
				<input className={error ? 'input-error' : ''} value={value} onChange={handleChange} type='text' />
				<button onClick={onChange}>+</button>
			</div>
			{error && <span className='error'>This field is required</span>}
		</div>
	);
};
