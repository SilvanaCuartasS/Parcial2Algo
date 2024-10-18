import { Actions } from '../types/store';
import { Screens } from '../types/store';
import { Task } from '../types/task';

export const changeBackground = (payload: any) => {
	return {
		action: Actions.CHANGEBACKGROUND,
		payload,
	};
};

export const addTask = (payload: Task) => {
	return {
		action: Actions.ADD_TASK, // "ADD_TASK" ---> esto está en el tipado
		payload,
			// id: number,
			// title: string,
			// state: boolean
	};
};

export const removeTask = (payload: number) => { //lo que va a recibir será el id que se crea de la tarea, para así eliminarla con ese identificador
	return {
		action: Actions.REMOVE_TASK,
		payload,
	};
};

export const toggleTask = (payload: number) => {
	return {
		action: Actions.TOGGLE_TASK,
		payload,
	};
};

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};
