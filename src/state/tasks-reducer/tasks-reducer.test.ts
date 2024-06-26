import { v1 } from 'uuid';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer } from './tasks-reducer';
import { addTodolistAC, removeTodolistAC } from '../todolists-reducer';

test('correct task should be added', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
		[todolist1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: true },
			{ id: '4', title: 'React', isDone: false },
			{ id: '5', title: 'Typescript', isDone: false },
		],
		[todolist2]: [
			{ id: '1', title: 'Harry Potter and The Chamber of Secrets', isDone: true },
			{ id: '2', title: '', isDone: false },
			{ id: '3', title: 'Typescript', isDone: false },
		],
	};
	const newState = tasksReducer(state, addTaskAC(todolist1, 'Tom Riddle'));
	expect(newState[todolist1].length).toBe(6);
	expect(newState[todolist2].length).toBe(3);
	expect(newState[todolist1][5].title).toBe('Tom Riddle');
	expect(newState[todolist1][5].isDone).toBe(false);
});

test('correct task should be deleted', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
		[todolist1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: true },
			{ id: '4', title: 'React', isDone: false },
			{ id: '5', title: 'Typescript', isDone: false },
		],
		[todolist2]: [
			{ id: '1', title: 'Harry Potter and The Chamber of Secrets', isDone: true },
			{ id: '2', title: '', isDone: false },
			{ id: '3', title: 'Typescript', isDone: false },
		],
	};
	const newState = tasksReducer(state, deleteTaskAC(todolist1, '1'));
	expect(newState[todolist1].length).toBe(4);
	expect(newState[todolist2].length).toBe(3);
	expect(newState[todolist1].every(t => t.id !== '1')).toBeTruthy();
});

test('status of specified task should be changed', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
		[todolist1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: true },
			{ id: '4', title: 'React', isDone: false },
			{ id: '5', title: 'Typescript', isDone: false },
		],
		[todolist2]: [
			{ id: '1', title: 'Harry Potter and The Chamber of Secrets', isDone: true },
			{ id: '2', title: '', isDone: false },
			{ id: '3', title: 'Typescript', isDone: false },
		],
	};
	const newState = tasksReducer(state, changeStatusAC(todolist2, '1', false));
	expect(newState[todolist2][0].isDone).toBeFalsy();
	expect(newState[todolist1][0]).toBeTruthy();
});

test('change correct task title', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
		[todolist1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: true },
			{ id: '4', title: 'React', isDone: false },
			{ id: '5', title: 'Typescript', isDone: false },
		],
		[todolist2]: [
			{ id: '1', title: 'Harry Potter and The Chamber of Secrets', isDone: true },
			{ id: '2', title: '', isDone: false },
			{ id: '3', title: 'Typescript', isDone: false },
		],
	};
	const newState = tasksReducer(state, changeTaskTitleAC(todolist2, '2', 'Lord Voldemort'));
	expect(newState[todolist2].length).toBe(3);
	expect(newState[todolist2][1].title).toBe('Lord Voldemort');
	expect(newState[todolist1][1].title).toBe('CSS');
});

test('new property with new array should be added when new todolist created', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const todolist3 = v1();
	const state = {
		[todolist1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: true },
			{ id: '4', title: 'React', isDone: false },
			{ id: '5', title: 'Typescript', isDone: false },
		],
		[todolist2]: [
			{ id: '1', title: 'Harry Potter and The Chamber of Secrets', isDone: true },
			{ id: '2', title: '', isDone: false },
			{ id: '3', title: 'Typescript', isDone: false },
		],
	};
	const action = addTodolistAC(todolist3);
	const newState = tasksReducer(state, action);
	const keys = Object.keys(newState);
	const newKey = Object.keys(newState).find(k => k !== todolist1 && k !== todolist2);
	if (!newKey) {
		throw new Error('new key should be added');
	}
	expect(keys.length).toBe(3);
	expect(newState[newKey]).toStrictEqual([]);
});

test('property with todolistId should be deleted', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
		[todolist1]: [
			{ id: '1', title: 'HTML', isDone: true },
			{ id: '2', title: 'CSS', isDone: true },
			{ id: '3', title: 'JS', isDone: true },
			{ id: '4', title: 'React', isDone: false },
			{ id: '5', title: 'Typescript', isDone: false },
		],
		[todolist2]: [
			{ id: '1', title: 'Harry Potter and The Chamber of Secrets', isDone: true },
			{ id: '2', title: '', isDone: false },
			{ id: '3', title: 'Typescript', isDone: false },
		],
	};
	const action = removeTodolistAC(todolist1);
	const newState = tasksReducer(state, action);
	const keys = Object.keys(newState);

	expect(keys.length).toBe(1);
	expect(newState[todolist1]).toBeUndefined();
});
