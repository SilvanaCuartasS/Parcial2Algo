import { removeTask, toggleTask } from "../../store/actions";
import { addObserver, dispatch } from "../../store/store";

export enum TaskItemProps {
	'uid' = 'uid',
	'tasktitle' = 'tasktitle',
	'state' = 'state',
}

class TaskItem extends HTMLElement {
	uid?: number;
	tasktitle?: string;
	state?: boolean;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this) //observador

	}

	static get observedAttributes() {
		return Object.values(TaskItemProps);
	}

	connectedCallback() {
		this.render();

	}

	attributeChangedCallback(propName: TaskItemProps, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case TaskItemProps.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case TaskItemProps.state:
				this.state = newValue ? newValue === 'true' : undefined;
				break;


			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `
			<article>
				<h3>${this.tasktitle}</h3>
				<button class="delete-task">Delete</button>
				<input type="checkbox" ${this.state ? 'checked' : ''} class="check-task">
			</article>
		`;

		//En el input type="checkbox": si el estado de la tarea es true va a darle el atributo de check sino se va a quedar en blanco. *Muestra el checkbox relleno o sin rellenar*

		const deleteButton = this.shadowRoot?.querySelector('.delete-task')//Traigo la referencia del boton eliminar

		const checkButton = this.shadowRoot?.querySelector('.check-task') //Traigo la referencia del check

		deleteButton?.addEventListener('click', () => {
			console.log("click", this.uid);

			dispatch(removeTask(this.uid!)) //Como la tarea esta identificada con un id entonves gracias a la acción se remueve toda la tarea
		})

		checkButton?.addEventListener('change', () => {
			dispatch(toggleTask(this.uid!))
		})

	}

	// El signo de admiración (!) en TypeScript se usa para indicar que el desarrollador está seguro de que una variable no es null ni undefined en ese punto del código

}

customElements.define('task-item', TaskItem);
export default TaskItem;