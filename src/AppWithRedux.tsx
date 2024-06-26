import './App.css';
import { Todolist } from './components/todolist/Todolist';
import { AddItemForm } from './components/add-item-form/AddItemForm';
import { TFilter, TTask, TTodolist } from './types/types';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
} from './state/todolists-reducer';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, deleteTaskAC } from './state/tasks-reducer/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';

function AppWithRedux() {
	const dispatch = useDispatch();
	const tasks = useSelector<AppRootState, Record<string, TTask[]>>(state => state.tasks);
	const todolists = useSelector<AppRootState, Array<TTodolist>>(state => state.todolist);

	const AddTask = (todoId: string, title: string) => {
		const action = addTaskAC(todoId, title);
		dispatch(action);
	};

	const deleteTask = (todoId: string, taskId: string) => {
		const action = deleteTaskAC(todoId, taskId);
		dispatch(action);
	};

	const changeStatus = (todoId: string, taskId: string, status: boolean) => {
		const action = changeStatusAC(todoId, taskId, status);
		dispatch(action);
	};

	const changeFilter = (todoId: string, filter: TFilter) => {
		const action = changeTodolistFilterAC(todoId, filter);
		dispatch(action);
	};

	const addTodoList = (title: string) => {
		const action = addTodolistAC(title);
		dispatch(action);
	};

	const deleteTodolist = (todoId: string) => {
		dispatch(removeTodolistAC(todoId));
	};

	const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
		const action = changeTaskTitleAC(todoId, taskId, title);
		dispatch(action);
	};

	const changeTitle = (todoId: string, title: string) => {
		const action = changeTodolistTitleAC(todoId, title);
		dispatch(action);
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

export default AppWithRedux;
