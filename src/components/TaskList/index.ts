import { addObserver, appState } from "../../store/store";
import TaskItem, { TaskItemProps } from "../TaskItem/index";
import "../TaskItem/index";

//El task list solo es el conjunto de varias TaskItem
class TaskList extends HTMLElement {

	taskItems: TaskItem[] = []

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)

		appState.tasks.forEach((task: any) => { //Recorre el arreglo que tiene el appState para crear cada componente
			const { id, title, state } = task
			const taskItem = this.ownerDocument.createElement('task-item') as TaskItem;
			taskItem.setAttribute(TaskItemProps.uid, id);
			taskItem.setAttribute(TaskItemProps.tasktitle, title);
			taskItem.setAttribute(TaskItemProps.state, state);
			this.taskItems.push(taskItem);
		})
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.taskItems.forEach((taskItem) => { //Recorre el arreglo de tareas que estan todas las tareas gracias al proceso de la linea 15
				this.shadowRoot?.appendChild(taskItem)
			})
		}



	}

}

customElements.define('task-list', TaskList);
export default TaskList;