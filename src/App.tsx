import { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/add-item-form/AddItemForm';
import { TTask, TTodolist } from './types/types';

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
			{ id: v1(), title: 'React', isDone: false },
			{ id: v1(), title: 'Typescript', isDone: false },
		],
	});

	const AddTask = (todoId: string, title: string) => {
		const task = { id: v1(), title: title, isDone: false };
		const newTasks = [...tasks[todoId], task];
		setTasks({ ...tasks, [todoId]: newTasks });
	};

	const changeStatus = (todoId: string, taskId: string, status: boolean) => {
		const task = tasks[todoId].find(el => el.id === taskId);
		if (task) {
			task.isDone = status;
			setTasks({ ...tasks });
		}
	};

	return (
		<div className='App'>
			<div>
				<h2>Add new todolist</h2>
				<AddItemForm />
			</div>
			{todolists.map(item => (
				<Todolist
					changeStatus={changeStatus}
					key={item.id}
					title={item.title}
					filter={item.filter}
					tasks={tasks[item.id]}
					todoId={item.id}
					AddTask={AddTask}
				/>
			))}
		</div>
	);
}

export default App;
