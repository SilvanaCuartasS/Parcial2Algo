export type AppState = {
	screen: string;
	backgroundColor: string;
	username: string;
	id: number;
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
	'CHANGEBACKGROUND' = 'CHANGEBACKGROUND',
	'NAVIGATE' = 'NAVIGATE',
	'REMOVE_TASK' = 'REMOVE_TASK',
	'TOGGLE_TASK' = 'TOGGLE_TASK',
	'ADD_TASK' = 'ADD_TASK'
}

export enum Screens {
	'LOGIN' = 'LOGIN',
	'DASHBOARD' = 'DASHBOARD',
	'REGISTER' = 'REGISTER',
	
}
