
import { PRODUCTS_FOUND, PRODUCT_FOUND, COLLECTION_FOUND, CHECKOUT_FOUND, SHOP_FOUND, ADD_VARIANT_TO_CART, UPDATE_QUANTITY_IN_CART, REMOVE_LINE_ITEM_IN_CART, OPEN_CART, CLOSE_CART, CART_COUNT, CUSTOM_QUERY, COLLECTIONS_FOUND } from '../types'

const initialState = {
	isCartOpen: false,
	cartCount: 0,
	checkout: {},
	products: [],
	featured: [],
	product: {},
	shop: {},
	custom: {},
	collections: [],
	settings: {
		sizeFilter: [],
		colorFilter: [],
		sort: 'New Arrivals'
	}
}

//helpers
const filterSizeProducts = (products, sizeFilter) => {

	if (sizeFilter.length === 0) {
		return products
	} else {
		let resp = products.filter(product => {
			return product.variants.map((variant) => {
				return sizeFilter.includes(variant.selectedOptions[0].value) && variant.available
			}).includes(true)
		})
		return resp
	}

}

const shopifyReducer = (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_FOUND:
			return { ...state, products: action.payload }
		case PRODUCT_FOUND:
			return { ...state, product: action.payload }
		case COLLECTION_FOUND:
			return { ...state, featured: action.payload, products: action.payload }
		case CHECKOUT_FOUND:
			return { ...state, checkout: action.payload }
		case SHOP_FOUND:
			return { ...state, shop: action.payload }
		case ADD_VARIANT_TO_CART:
			return { ...state, checkout: action.payload }
		case UPDATE_QUANTITY_IN_CART:
			return { ...state, checkout: action.payload }
		case REMOVE_LINE_ITEM_IN_CART:
			return { ...state, checkout: action.payload }
		case OPEN_CART:
			return { ...state, isCartOpen: true }
		case CLOSE_CART:
			return { ...state, isCartOpen: false }
		case CART_COUNT:
			return { ...state, cartCount: action.payload }
		case CUSTOM_QUERY:
			return { ...state, custom: action.payload }
		case COLLECTIONS_FOUND:
			return { ...state, collections: action.payload }
		case 'HANDLE_SIZE_FILTER':
			let filteredProducts = filterSizeProducts(action.payload.products, action.payload.sizeFilter)
			return {
				...state,
				settings: { sizeFilter: action.payload.sizeFilter },
				products: filteredProducts
			}
		default:
			return state
	}
}

export default shopifyReducer