import React from 'react';
import { AddItemForm } from '../add-item-form/AddItemForm';
import { TFilter, TTask } from '../../types/types';

type TTodolistProps = {
	todoId: string;
	title: string;
	filter: TFilter;
	tasks: TTask[];
	changeStatus: (todoId: string, taskId: string, status: boolean) => void;
	AddTask: (todoId: string, title: boolean) => void;
};

export const Todolist = ({ todoId, title, tasks, changeStatus, AddTask }: TTodolistProps) => {
	return (
		<div className='todolist'>
			<h2>{title}</h2>
			<AddItemForm addItem={AddTask} />
			<ul className='list'>
				{tasks.map(item => (
					<li className='list-item' key={item.id}>
						<input onChange={() => changeStatus(todoId, item.id, !item.isDone)} checked={item.isDone} type='checkbox' />
						<span>{item.title}</span>
						<button>x</button>
					</li>
				))}
			</ul>
		</div>
	);
};
