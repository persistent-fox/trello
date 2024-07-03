import { AddItemForm } from '../add-item-form/AddItemForm';
import { TFilter, TTask } from '../../types/types';
import { EditableSpan } from '../editable-span/EditableSpan';
import { Button, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { addTaskAC, changeStatusAC, changeTaskTitleAC, deleteTaskAC } from '../../state/tasks-reducer/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeTodolistFilterAC } from '../../state/todolists-reducer';
import { AppRootState } from '../../state/store';
import { useCallback } from 'react';
import React from 'react';
import { TaskItem } from '../task-item/TaskItem';

type TTodolistProps = {
	todoId: string;
	title: string;
	filter: TFilter;
	deleteTodolist: (todoId: string) => void;
	changeTitle: (todoId: string, title: string) => void;
};

export const Todolist = React.memo(({ todoId, title, filter, deleteTodolist, changeTitle }: TTodolistProps) => {
	console.log('Todolist is called');

	const dispatch = useDispatch();
	const tasks = useSelector<AppRootState, TTask[]>(state => state.tasks[todoId]);

	const deleteTask = useCallback(
		(taskId: string) => {
			const action = deleteTaskAC(todoId, taskId);
			dispatch(action);
		},
		[dispatch, todoId]
	);

	const changeStatus = useCallback(
		(taskId: string, status: boolean) => {
			const action = changeStatusAC(todoId, taskId, status);
			dispatch(action);
		},
		[dispatch, todoId]
	);

	const changeFilter = useCallback(
		(todoId: string, filter: TFilter) => {
			const action = changeTodolistFilterAC(todoId, filter);
			dispatch(action);
		},
		[dispatch]
	);

	const addItem = useCallback(
		(title: string) => {
			const action = addTaskAC(todoId, title);
			dispatch(action);
		},
		[dispatch, todoId]
	);

	const changeTodolistTitle = useCallback(
		(title: string) => {
			changeTitle(todoId, title);
		},
		[changeTitle, todoId]
	);

	const changeTaskTitle = useCallback(
		(todoId: string, taskId: string, title: string) => {
			const action = changeTaskTitleAC(todoId, taskId, title);
			dispatch(action);
		},
		[dispatch]
	);

	const onChangeTitleHandler = useCallback(
		(taskId: string, title: string) => {
			changeTaskTitle(todoId, taskId, title);
		},
		[changeTaskTitle, todoId]
	);

	let filteredTasks = tasks;
	if (filter === 'active') {
		filteredTasks = tasks.filter(t => !t.isDone);
	}
	if (filter === 'completed') {
		filteredTasks = tasks.filter(t => t.isDone);
	}

	return (
		<Paper sx={{ padding: '20px', minWidth: '200px' }} elevation={3}>
			<h2>
				<EditableSpan onChange={changeTodolistTitle} title={title} />
			</h2>
			<AddItemForm addItem={addItem} />
			{filteredTasks?.length ? (
				<ul className='list'>
					{filteredTasks.map(item => {
						return (
							<TaskItem
								onChangeTitleHandler={onChangeTitleHandler}
								deleteTask={deleteTask}
								changeStatus={changeStatus}
								task={item}
								key={item.id}
							/>
						);
					})}
				</ul>
			) : (
				<span className='empty-list'>List is empty!</span>
			)}
			<div className='buttons-wrapper'>
				<Button
					variant={filter === 'all' ? 'contained' : 'outlined'}
					onClick={() => changeFilter(todoId, 'all')}
					color='success'
				>
					All
				</Button>
				<Button
					variant={filter === 'active' ? 'contained' : 'outlined'}
					onClick={() => changeFilter(todoId, 'active')}
					color='success'
				>
					Active
				</Button>
				<Button
					variant={filter === 'completed' ? 'contained' : 'outlined'}
					onClick={() => changeFilter(todoId, 'completed')}
					color='success'
				>
					Completed
				</Button>
			</div>
			<Button
				sx={{
					width: '100%',
				}}
				variant={'contained'}
				onClick={() => deleteTodolist(todoId)}
				color='error'
			>
				Delete Todolist
			</Button>
		</Paper>
	);
});
