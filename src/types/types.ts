export type TFilter = 'all' | 'active' | 'completed';

export type TTodolist = {
	id: string;
	title: string;
	filter: TFilter;
};

export type TTask = {
	id: string;
	title: string;
	isDone: boolean;
};
