import { v1 } from 'uuid';
import { addTaskAC, tasksReducer } from './tasks-reducer';

test('add task', () => {
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
