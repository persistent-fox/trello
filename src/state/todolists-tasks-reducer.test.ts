import { addTodolistAC, todolistReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer/tasks-reducer';
import { TTask, TTodolist } from '../types/types';

test('ids should be equals', () => {
	const startTasksState: Record<string, TTask[]> = {};
	const startTodolistsState: Array<TTodolist> = [];
	const action = addTodolistAC('new title');
	const newTasksState = tasksReducer(startTasksState, action);
	const newTodolistsState = todolistReducer(startTodolistsState, action);

	const keys = Object.keys(newTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = newTodolistsState[0].id;
	expect(idFromTasks).toBe(action.todolistId);
	expect(idFromTodolists).toBe(action.todolistId);
});
