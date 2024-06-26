import { v1 } from 'uuid';
import { TFilter, TTodolist } from '../types/types';

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

export const todolistReducer = (state: Array<TTodolist>, action: ActionsType): Array<TTodolist> => {
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
			throw new Error("I dont't know this type");
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
