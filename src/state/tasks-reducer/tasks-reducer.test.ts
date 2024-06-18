import { v1 } from 'uuid';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer } from './tasks-reducer';

test('add correct task', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
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
	const newState = tasksReducer(state, addTaskAC(todolist1, 'New Title'));
	expect(newState[todolist1].length).toBe(6);
	expect(newState[todolist1][5].title).toBe('New Title');
});

test('delete correct task', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
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
	const newState = tasksReducer(state, deleteTaskAC(todolist1, state[todolist1][0].id));
	expect(newState[todolist1].length).toBe(4);
	expect(newState[todolist1][0].title).toBe('CSS');
});

test('change correct status', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
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
	const newState = tasksReducer(state, changeStatusAC(todolist2, state[todolist2][0].id, false));
	expect(newState[todolist2][0].isDone).toBe(false);
	expect(newState[todolist2].length).toBe(3);
});

test('change correct task title', () => {
	const todolist1 = v1();
	const todolist2 = v1();
	const state = {
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
	const newState = tasksReducer(state, changeTaskTitleAC(todolist2, state[todolist2][1].id, 'New title'));
	expect(newState[todolist2].length).toBe(3);
	expect(newState[todolist2][1].title).toBe('New title');
});
