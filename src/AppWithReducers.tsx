import { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/add-item-form/AddItemForm';
import { TFilter, TTask, TTodolist } from './types/types';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistReducer,
} from './state/todolists-reducer';
import {
	addTaskAC,
	changeStatusAC,
	changeTaskTitleAC,
	deleteTaskAC,
	tasksReducer,
} from './state/tasks-reducer/tasks-reducer';

function AppWithReducers() {
	const todolist1 = v1();
	const todolist2 = v1();

	const [todolists, dispatchTodolists] = useReducer(todolistReducer, [
		{ id: todolist1, title: 'What to learn', filter: 'all' },
		{ id: todolist2, title: 'What to watch', filter: 'all' },
	]);
	const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
	});

	const AddTask = (todoId: string, title: string) => {
		const action = addTaskAC(todoId, title);
		dispatchTasks(action);
	};

	const deleteTask = (todoId: string, taskId: string) => {
		const action = deleteTaskAC(todoId, taskId);
		dispatchTasks(action);
	};

	const changeStatus = (todoId: string, taskId: string, status: boolean) => {
		const action = changeStatusAC(todoId, taskId, status);
		dispatchTasks(action);
	};

	const changeFilter = (todoId: string, filter: TFilter) => {
		const action = changeTodolistFilterAC(todoId, filter);
		dispatchTodolists(action);
	};

	const addTodoList = (title: string) => {
		const action = addTodolistAC(title);
		dispatchTodolists(action);
	};

	const deleteTodolist = (todoId: string) => {
		const action = removeTodolistAC(todoId);
		dispatchTodolists(action);
	};

	const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
		const action = changeTaskTitleAC(todoId, taskId, title);
		dispatchTasks(action);
	};

	const changeTitle = (todoId: string, title: string) => {
		const action = changeTodolistTitleAC(todoId, title);
		dispatchTodolists(action);
	};
	return (
		<div className='App'>
			<div>
				<h2>Add new todolist</h2>
				<AddItemForm addItem={addTodoList} />
			</div>
			{todolists.map(item => {
				let filteredTasks = tasks[item.id];
				if (item.filter === 'active') {
					filteredTasks = filteredTasks.filter(task => !task.isDone);
				}
				if (item.filter === 'completed') {
					filteredTasks = filteredTasks.filter(task => task.isDone);
				}
				return (
					<Todolist
						changeStatus={changeStatus}
						key={item.id}
						title={item.title}
						filter={item.filter}
						tasks={filteredTasks}
						todoId={item.id}
						AddTask={AddTask}
						changeFilter={changeFilter}
						deleteTask={deleteTask}
						deleteTodolist={deleteTodolist}
						changeTaskTitle={changeTaskTitle}
						changeTitle={changeTitle}
					/>
				);
			})}
		</div>
	);
}

export default AppWithReducers;
