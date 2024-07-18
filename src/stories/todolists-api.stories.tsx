import { useEffect, useState } from 'react';
import { todolistsAPI } from '../api/todolists-api';

export default {
	title: 'API',
};

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null);
	useEffect(() => {
		todolistsAPI.getTodolists();
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
	const [state, setState] = useState(null);
	useEffect(() => {
		todolistsAPI.createTodolist('Tom Riddle');
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};

export const RemoveTodolist = () => {
	const [state, setState] = useState(null);
	useEffect(() => {
		const id = '31098e52-2f9b-41b5-a13d-9c72b5133837';
		todolistsAPI.removeTodolist(id);
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
	const [state, setState] = useState(null);
	useEffect(() => {
		const todolistId = 'af9cc6a5-d6ea-4cc3-8b62-e98172da4380';
		const newTitle = 'Rita Bright';
		todolistsAPI.updateTodolist(todolistId, newTitle);
	}, []);

	return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
	const [state, setState] = useState<any>(null);
	const todolistId = 'af9cc6a5-d6ea-4cc3-8b62-e98172da4380';
	useEffect(() => {
		todolistsAPI.getTasks(todolistId).then(res => setState(res));
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
	const [state, setState] = useState(null);
	const todolistId = 'af9cc6a5-d6ea-4cc3-8b62-e98172da4380';
	useEffect(() => {
		todolistsAPI.createTask(todolistId, 'Albus Dubldore');
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
	const [state, setState] = useState(null);
	const todolistId = 'af9cc6a5-d6ea-4cc3-8b62-e98172da4380';
	const taskId = '83224cab-7896-4895-b779-201c2664c710';
	useEffect(() => {
		todolistsAPI.deleteTask(todolistId, taskId);
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTask = () => {
	const [state, setState] = useState(null);
	const todolistId = 'af9cc6a5-d6ea-4cc3-8b62-e98172da4380';
	const taskId = '2f000680-a060-477d-9a11-0086e29d78ea';
	const newData = {
		title: 'Harry Potter',
		description: 'some description',
		completed: true,
		status: 0,
		priority: 1,
		startDate: null,
		deadline: null,
	};
	useEffect(() => {
		todolistsAPI.updateTask(todolistId, taskId, newData);
	}, []);
	return <div>{JSON.stringify(state)}</div>;
};
