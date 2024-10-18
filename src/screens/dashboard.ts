import { addObserver, appState } from "../store/store";
import { addTask } from "../store/actions";
import TaskItem, { TaskItemProps } from '../components/TaskItem/index';


//Import API
import { getProducts } from "../services/getProducts";

class Dashboard extends HTMLElement {

    products: Product[] = [];
    shoppingCart: ShoppingCartItem[] = [];
	dataProducts: any[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this) // voy agregar un observador aquí. eso significa que al arreglo de observadores el store.ts se le agrega esta clase (dashboard.ts)
		
	}

	async connectedCallback() {
		this.dataProducts = await getProducts();
		this.createCardsProduct();
		this.createCardsShoppingItem();
		this.render();
	}

	createCardsProduct ()  {
		this.dataProducts.forEach(productData => {
			const product = this.ownerDocument.createElement('product-card') as Product;
			product.setAttribute(Attribute.image, productData.image);
			product.setAttribute(Attribute.titleproduct, productData.title);
			product.setAttribute(Attribute.description, productData.description);
			product.setAttribute(Attribute.category, productData.category);
			product.setAttribute(Attribute.price, productData.price);
			product.setAttribute(Attribute.rating, productData.rating.rate); 
			
			this.products.push(product);
		 
			});
		}

		createCardsShoppingItem ()  {
            appState.shoppingList.forEach((element: any) => {
                const product = this.ownerDocument.createElement('shopping-card') as ShoppingCartItem; 
                product.setAttribute(AttributeShoppingCart.image, element.image);
                product.setAttribute(AttributeShoppingCart.titleproduct, element.title);
                product.setAttribute(AttributeShoppingCart.price, element.price);
                
                this.shoppingCart.push(product);
        
            });
        }

	render() {
		if (this.shadowRoot){
			this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="../src/index.css">
		   <h1>Store Products</h1>
		   <hr>
		   <div class="container-products"></div>
		   
		   <h1>Added to cart</h1>
		   <hr>
		   <div class="container-shopping"></div>
		   `;
	
		//    const dashboard = this.ownerDocument.createElement('app-dashboard');
		//    this.shadowRoot?.appendChild(dashboard);
	
	
		   const container = this.shadowRoot?.querySelector('.container-products');
		   this.products.forEach((product) => {
			   container?.appendChild(product);
		   });
	
		   const containerShoppingCartItem = this.shadowRoot?.querySelector('.container-shopping');
		   this.shoppingCart.forEach((productShopping) => {
			   containerShoppingCartItem?.appendChild(productShopping);
		   });

		}
		// const btn = this.ownerDocument.createElement('button');
		// btn.innerText = 'Cambiar background';
		// btn.addEventListener('click',()=>{
		// 	dispatch(addProductsList)
		// })
		// this.shadowRoot?.appendChild(btn);
	
	}
}

customElements.define('app-dashboard', Dashboard);