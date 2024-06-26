import { v1 } from 'uuid';
import { TTask } from '../../types/types';
import { AddTodolistActionType, RemoveTodoListActionType } from '../todolists-reducer';
import { todolist1, todolist2 } from '../../mock/data';

export type ActionType = {
	type: string;
	[key: string]: any;
};

export type AddTaskActionType = {
	type: 'ADD-TASK';
	todoId: string;
	title: string;
};

export type DeleteTaskActionType = {
	type: 'DELETE-TASK';
	todoId: string;
	taskId: string;
};
export type ChangeStatusActionType = {
	type: 'CHANGE-STATUS';
	todoId: string;
	taskId: string;
	status: boolean;
};
export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLTE';
	todoId: string;
	taskId: string;
	title: string;
};

export type ActionsType =
	| AddTaskActionType
	| DeleteTaskActionType
	| ChangeStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodoListActionType;

const initialState = {
	[todolist1]: [
		{ id: v1(), title: 'HTML', isDone: true },
		{ id: v1(), title: 'CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'React', isDone: false },
		{ id: v1(), title: 'Typescript', isDone: false },
	],
	[todolist2]: [
		{ id: v1(), title: 'Harry Potter and The Chamber of Secrets', isDone: true },
		{ id: v1(), title: '', isDone: false },
		{ id: v1(), title: 'Typescript', isDone: false },
	],
};

export const tasksReducer = (
	state: Record<string, TTask[]> = initialState,
	action: ActionsType
): Record<string, TTask[]> => {
	switch (action.type) {
		case 'ADD-TASK':
			return { ...state, [action.todoId]: [...state[action.todoId], { id: v1(), title: action.title, isDone: false }] };
		case 'DELETE-TASK':
			return { ...state, [action.todoId]: state[action.todoId].filter((item: TTask) => item.id !== action.taskId) };
		case 'CHANGE-STATUS':
			return {
				...state,
				[action.todoId]: state[action.todoId].map((item: TTask) =>
					item.id === action.taskId ? { ...item, isDone: action.status } : item
				),
			};
		case 'CHANGE-TASK-TITLTE':
			return {
				...state,
				[action.todoId]: state[action.todoId].map(item =>
					item.id === action.taskId ? { ...item, title: action.title } : item
				),
			};
		case 'ADD-TODOLIST':
			return { ...state, [action.todolistId]: [] };
		case 'REMOVE-TODOLIST':
			const stateCopy = { ...state };
			delete stateCopy[action.id];
			return stateCopy;
		default:
			return state;
	}
};

export const addTaskAC = (todoId: string, title: string): AddTaskActionType => {
	return { type: 'ADD-TASK', todoId: todoId, title: title };
};

export const deleteTaskAC = (todoId: string, taskId: string): DeleteTaskActionType => {
	return { type: 'DELETE-TASK', todoId: todoId, taskId: taskId };
};

export const changeStatusAC = (todoId: string, taskId: string, status: boolean): ChangeStatusActionType => {
	return { type: 'CHANGE-STATUS', todoId: todoId, taskId: taskId, status: status };
};

export const changeTaskTitleAC = (todoId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLTE', todoId: todoId, taskId: taskId, title: title };
};
