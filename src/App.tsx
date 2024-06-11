import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/add-item-form/AddItemForm';
import { TFilter, TTask, TTodolist } from './types/types';

function App() {
	const todolist1 = v1();
	const todolist2 = v1();

	const [todolists, setTodolists] = useState<Array<TTodolist>>([
		{ id: todolist1, title: 'What to learn', filter: 'all' },
		{ id: todolist2, title: 'What to watch', filter: 'all' },
	]);
	const [tasks, setTasks] = useState<Record<string, TTask[]>>({
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
		const task = { id: v1(), title: title, isDone: false };
		const newTasks = [...tasks[todoId], task];
		setTasks({ ...tasks, [todoId]: newTasks });
	};

	const deleteTask = (todoId: string, taskId: string) => {
		setTasks({ ...tasks, [todoId]: tasks[todoId].filter(t => t.id !== taskId) });
	};

	const changeStatus = (todoId: string, taskId: string, status: boolean) => {
		const task = tasks[todoId].find(el => el.id === taskId);
		if (task) {
			task.isDone = status;
			setTasks({ ...tasks });
		}
	};

	const changeFilter = (todoId: string, filter: TFilter) => {
		setTodolists([...todolists.map(item => (item.id === todoId ? { ...item, filter: filter } : item))]);
	};

	const addTodoList = (title: string) => {
		const newTodoList: TTodolist = { id: v1(), title: title, filter: 'all' };
		setTodolists([...todolists, newTodoList]);
		const newTasks = { ...tasks, [newTodoList.id]: [] };
		setTasks(newTasks);
	};

	const deleteTodolist = (todoId: string) => {
		setTodolists([...todolists.filter(todo => todo.id !== todoId)]);
		delete tasks[todoId];
		setTasks({ ...tasks });
	};

	const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
		const newTask = tasks[todoId].find(t => t.id === taskId);
		if (newTask) {
			newTask.title = title;
			setTasks({ ...tasks });
		}
	};

	const changeTitle = (todoId: string, title: string) => {
		const newTodolist = todolists.find(todo => todo.id === todoId);
		if (newTodolist) {
			newTodolist.title = title;
			setTodolists([...todolists]);
		}
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

export default App;
