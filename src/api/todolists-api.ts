import axios from 'axios';

type TTodolist = {
	id: string;
	title: string;
	addedDate: string;
	order: number;
};

type TTask = {
	description: string;
	title: string;
	completed: boolean;
	status: number;
	priority: number;
	startDate: string;
	deadline: string;
	id: string;
	todoListId: string;
	order: number;
	addedDate: string;
};

type TTaskModel = {
	title: string;
	description: string;
	completed: boolean;
	status: number;
	priority: number;
	startDate: string | null;
	deadline: string | null;
};

type TTasks = {
	items: TTask[];
	totalCount: number;
	error: string | null;
};

type ResponseType<D = {}> = {
	resultCode: number;
	messages: string[];
	fieldsErrors: string[];
	data: D;
};

export const settings = {
	withCredentials: true,
	headers: {
		'API-KEY': '6a69262c-0594-4381-b2a3-2130fbd1da6b',
	},
};

const instanсe = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	...settings,
});

export const todolistsAPI = {
	getTodolists() {
		return instanсe.get<TTodolist[]>('todo-lists', settings);
	},

	createTodolist(title: string) {
		return instanсe.post<ResponseType<Record<string, TTodolist>>>('todo-lists', { title }, settings);
	},

	updateTodolist(todolistId: string, title: string) {
		return instanсe.put<ResponseType>(`todo-lists/${todolistId}`, { title }, settings);
	},

	removeTodolist(todolistId: string) {
		return instanсe.delete<ResponseType>(`todo-lists/${todolistId}`, settings);
	},

	getTasks(todolistId: string) {
		return instanсe.get<TTasks>(`todo-lists/${todolistId}/tasks`, settings);
	},

	createTask(todolistId: string, title: string) {
		const data = {
			title,
		};
		return instanсe.post<ResponseType<Record<string, TTodolist>>>(`todo-lists/${todolistId}/tasks`, data, settings);
	},

	deleteTask(todolistId: string, taskId: string) {
		return instanсe.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, settings);
	},

	updateTask(todolistId: string, taskId: string, newData: TTaskModel) {
		return instanсe.post<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, newData, settings);
	},
};
