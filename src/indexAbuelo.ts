import './components/indexPadre' //Aquí importa el task form que exporto en el index padre

import { addObserver } from './store/store';

class AppContainer extends HTMLElement {
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
		<task-form></task-form>
		<task-list></task-list>
		<task-item></task-item>
        
		`;
//llama al componente que solo tiene el form y luego llama al array o al componente que tiene el listado de las tareas qu fuero agregadas en el form
	}
}


customElements.define('app-container', AppContainer);