type TAddItemForm = {
	addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: TAddItemForm) => {
	return (
		<div className='wrapper'>
			<input type='text' />
			<button onClick={() => addItem()}>+</button>
		</div>
	);
};
