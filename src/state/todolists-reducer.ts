import { v1 } from 'uuid';
import { TFilter, TTodolist } from '../types/types';
import { todolist1, todolist2 } from '../mock/data';

export type ActionType = {
	type: string;
	[key: string]: any;
};

export type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST';
	id: string;
};
export type AddTodolistActionType = {
	type: 'ADD-TODOLIST';
	title: string;
	todolistId: string;
};
export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE';
	title: string;
	id: string;
};
export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER';
	id: string;
	filter: TFilter;
};

type ActionsType =
	| RemoveTodoListActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType;

const initialState: Array<TTodolist> = [
	{ id: todolist1, title: 'What to learn', filter: 'all' },
	{ id: todolist2, title: 'What to watch', filter: 'all' },
];

export const todolistReducer = (state: Array<TTodolist> = initialState, action: ActionsType): Array<TTodolist> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(item => item.id !== action.id);
		case 'ADD-TODOLIST':
			return [...state, { id: action.todolistId, title: action.title, filter: 'all' }];
		case 'CHANGE-TODOLIST-TITLE':
			return state.map(item => (item.id === action.id ? { ...item, title: action.title } : item));
		case 'CHANGE-TODOLIST-FILTER':
			return state.map(item => (item.id === action.id ? { ...item, filter: action.filter } : item));
		default:
			return state;
	}
};

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST' as const, title: title, todolistId: v1() };
};

export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
	return {
		type: 'CHANGE-TODOLIST-TITLE' as const,
		id: todolistId,
		title: newTitle,
	};
};

export const changeTodolistFilterAC = (todolistId: string, newFilter: TFilter): ChangeTodolistFilterActionType => {
	return {
		type: 'CHANGE-TODOLIST-FILTER' as const,
		id: todolistId,
		filter: newFilter,
	};
};
