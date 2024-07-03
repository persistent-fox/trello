import React from 'react';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import IconButton from '@mui/material/IconButton/IconButton';
import { TTask } from '../../types/types';
import { EditableSpan } from '../editable-span/EditableSpan';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';

type TTaskItemProps = {
	task: TTask;
	changeStatus: (taskId: string, isDone: boolean) => void;
	deleteTask: (taskId: string) => void;
	onChangeTitleHandler: (taskId: string, title: string) => void;
};

export const TaskItem = React.memo(({ task, changeStatus, deleteTask, onChangeTitleHandler }: TTaskItemProps) => {
	console.log('taskItem');

	return (
		<li className={`list-item ${task.isDone ? 'completed' : ''}`}>
			<Checkbox
				checked={task.isDone}
				onChange={() => changeStatus(task.id, !task.isDone)}
				icon={<BookmarkBorderIcon />}
				checkedIcon={<BookmarkIcon />}
			/>
			<EditableSpan onChange={title => onChangeTitleHandler(task.id, title)} title={task.title} />
			<IconButton onClick={() => deleteTask(task.id)} aria-label='delete'>
				<DeleteIcon />
			</IconButton>
		</li>
	);
});
