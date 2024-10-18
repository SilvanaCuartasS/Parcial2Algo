import { addTask } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/store";
import { Task } from "../../types/task";

//Esta clase es solo el formulario
class TaskForm extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
        addObserver(this)
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = `
        <h2>PreParcial 2</h2>
         <form class="task-form">
            <input type="text" id="text-input" placeholder="Nombre de tarea" required />
            <button type="submit" id="add-btn">Agregar</button>
         </form>
        `;

        const formElement = this.shadowRoot?.querySelector('.task-form') //Con el query selector se trae la referencia del form y la guarda en formElement.


        //Esta parte del código crea la tarea cuando el fromulario hace el submit
        
        formElement?.addEventListener("submit", (e) => {
            e.preventDefault() //paras que al enviarse no se refresque la página.
            
            const inputValue = this.shadowRoot?.querySelector("#text-input") as HTMLInputElement // el HTMLInputElement permite acceder a su valor (.value)
        
            const newTask: Task = {
                id: new Date().getTime(), //Ese id es algo que se crea dependiendo de la fecha horaria. Es un id único
                
                title: inputValue.value,
                state: false
            }

            dispatch(addTask(newTask))            
            
        })

		
		}
	
}

customElements.define('task-form', TaskForm);
export default TaskForm;