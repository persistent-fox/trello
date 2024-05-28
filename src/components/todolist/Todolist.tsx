import React from 'react';
import { AddItemForm } from '../add-item-form/AddItemForm';
import { TFilter, TTask } from '../../types/types';

type TTodolistProps = {
	todoId: string;
	title: string;
	filter: TFilter;
	tasks: TTask[];
	changeStatus: (todoId: string, taskId: string, status: boolean) => void;
	AddTask: (todoId: string, title: string) => void;
	changeFilter: (todoId: string, filter: TFilter) => void;
	deleteTask: (todoId: string, taskId: string) => void;
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
}: TTodolistProps) => {
	const addItem = (title: string) => {
		AddTask(todoId, title);
	};
	return (
		<div className='todolist'>
			<h2>{title}</h2>
			<AddItemForm addItem={addItem} />
			{tasks.length ? (
				<ul className='list'>
					{tasks?.map(item => (
						<li className={`list-item ${item.isDone ? 'completed' : ''}`} key={item.id}>
							<input
								id={item.id}
								onChange={() => changeStatus(todoId, item.id, !item.isDone)}
								checked={item.isDone}
								type='checkbox'
							/>
							<label htmlFor={item.id}>{item.title}</label>
							<button onClick={() => deleteTask(todoId, item.id)}>x</button>
						</li>
					))}
				</ul>
			) : (
				<span className='empty-list'>List is empty!</span>
			)}
			<div className='buttons-wrapper'>
				<button className={filter === 'all' ? 'active' : ''} onClick={() => changeFilter(todoId, 'all')}>
					All
				</button>
				<button className={filter === 'active' ? 'active' : ''} onClick={() => changeFilter(todoId, 'active')}>
					Active
				</button>
				<button className={filter === 'completed' ? 'active' : ''} onClick={() => changeFilter(todoId, 'completed')}>
					Completed
				</button>
			</div>
		</div>
	);
};
