import React from 'react';
import { AddItemForm } from '../add-item-form/AddItemForm';
import { TFilter, TTask } from '../../types/types';
import { EditableSpan } from '../editable-span/EditableSpan';
import { Button, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

type TTodolistProps = {
	todoId: string;
	title: string;
	filter: TFilter;
	tasks: TTask[];
	changeStatus: (todoId: string, taskId: string, status: boolean) => void;
	AddTask: (todoId: string, title: string) => void;
	changeFilter: (todoId: string, filter: TFilter) => void;
	deleteTask: (todoId: string, taskId: string) => void;
	deleteTodolist: (todoId: string) => void;
	changeTaskTitle: (todoId: string, taskId: string, title: string) => void;
	changeTitle: (todoId: string, title: string) => void;
};

export const Todolist = ({
	todoId,
	title,
	filter,
	tasks,
	changeStatus,
	AddTask,
	changeFilter,
	deleteTask,
	deleteTodolist,
	changeTaskTitle,
	changeTitle,
}: TTodolistProps) => {
	const addItem = (title: string) => {
		AddTask(todoId, title);
	};

	const changeTodolistTitle = (title: string) => {
		changeTitle(todoId, title);
	};

	return (
		<Paper sx={{ padding: '20px' }} elevation={3}>
			<h2>
				<EditableSpan onChange={changeTodolistTitle} title={title} />
			</h2>
			<AddItemForm addItem={addItem} />
			{tasks?.length ? (
				<ul className='list'>
					{tasks.map(item => {
						const onChangeTitleHandler = (title: string) => {
							changeTaskTitle(todoId, item.id, title);
						};

						return (
							<li className={`list-item ${item.isDone ? 'completed' : ''}`} key={item.id}>
								<Checkbox
									checked={item.isDone}
									onChange={() => changeStatus(todoId, item.id, !item.isDone)}
									icon={<BookmarkBorderIcon />}
									checkedIcon={<BookmarkIcon />}
								/>
								<EditableSpan onChange={onChangeTitleHandler} title={item.title} />
								<IconButton onClick={() => deleteTask(todoId, item.id)} aria-label='delete'>
									<DeleteIcon />
								</IconButton>
							</li>
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
};
