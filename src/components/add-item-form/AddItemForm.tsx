import { ChangeEvent, useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

type TAddItemForm = {
	addItem: (title: string) => void;
};

export const AddItemForm = React.memo(({ addItem }: TAddItemForm) => {
	const [value, setValue] = useState('');
	const [error, setError] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
		error && setError(false);
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
				<Stack display='flex' flexDirection='row' alignItems='center' gap='10px'>
					<TextField
						error={error}
						helperText={error ? 'This field is required' : ''}
						required
						id='outlined-required'
						placeholder='Type something...'
						onChange={handleChange}
						value={value}
						sx={{ flexGrow: 1 }}
					/>
					<IconButton onClick={onChange} aria-label='delete'>
						<AddIcon />
					</IconButton>
				</Stack>
			</div>
		</div>
	);
});
