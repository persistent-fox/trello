import React, { ChangeEvent, useState } from 'react';

type TEditableSpanProps = {
	title: string;
	onChange: (title: string) => void;
};

export const EditableSpan = ({ title, onChange }: TEditableSpanProps) => {
	const [editMode, setEditMode] = useState(false);
	const [value, setValue] = useState('');

	const activateEditMode = () => {
		setEditMode(true);
		setValue(title);
	};

	const activateViewMode = () => {
		setEditMode(false);
		onChange(value);
	};

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	};

	return editMode ? (
		<input value={value} onChange={onChangeValue} onBlur={activateViewMode} type='text' autoFocus />
	) : (
		<span onDoubleClick={activateEditMode}>{title}</span>
	);
};
