export type StateType = {
	age: number;
	victimCount: number;
	name: string;
};

export type ActionType = {
	type: string;
	[key: string]: any;
};

export const userReducer = (state: StateType, action: ActionType): StateType => {
	switch (action.type) {
		case 'INCREMENT-AGE':
			return { ...state, age: state.age + 1 };
		case 'INCREMENT-CHILDREN-COUNT':
			return { ...state, victimCount: state.victimCount + 1 };
		case 'CHANGE-NAME':
			return { ...state, name: action.name };
		default:
			return state;
	}
};
