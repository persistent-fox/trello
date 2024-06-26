import { v1 } from 'uuid';
import { TFilter, TTodolist } from '../types/types';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistReducer,
} from './todolists-reducer';

test('correct todolist should be removed', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const startState: Array<TTodolist> = [
		{ id: todolist1, title: 'What to learn', filter: 'all' },
		{ id: todolist2, title: 'What to watch', filter: 'all' },
	];

	const newState = todolistReducer(startState, removeTodolistAC(todolist1));
	expect(newState.length).toBe(1);
	expect(newState[0].id).toBe(todolist2);
});

test('correct todolist should be added', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const startState: Array<TTodolist> = [
		{ id: todolist1, title: 'What to learn', filter: 'all' },
		{ id: todolist2, title: 'What to watch', filter: 'all' },
	];

	const newState = todolistReducer(startState, addTodolistAC('New Task'));

	expect(newState.length).toBe(3);
	expect(newState[2].title).toBe('New Task');
	expect(newState[2].filter).toBe('all');
});

test('correct title should be changed in todolist', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const startState: Array<TTodolist> = [
		{ id: todolist1, title: 'What to learn', filter: 'all' },
		{ id: todolist2, title: 'What to watch', filter: 'all' },
	];

	const newState = todolistReducer(startState, changeTodolistTitleAC(todolist1, 'New Title Task'));
	expect(newState.length).toBe(2);
	expect(newState[0].title).toBe('New Title Task');
	expect(newState[1].title).toBe('What to watch');
	expect(newState[0].filter).toBe('all');
});

test('correct filter should be changed in todolist', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const newFilter: TFilter = 'active';
	const startState: Array<TTodolist> = [
		{ id: todolist1, title: 'What to learn', filter: 'all' },
		{ id: todolist2, title: 'What to watch', filter: 'all' },
	];

	const newState = todolistReducer(startState, changeTodolistFilterAC(todolist1, newFilter));
	expect(newState[0].filter).toBe(newFilter);
	expect(newState[1].filter).toBe('all');
	expect(newState.length).toBe(2);
});
