import Client from "../../apis/shopify-buy-custom"
// import Client from "shopify-buy/index.unoptimized.umd"
import { useSelector, useDispatch } from "react-redux"
import { PRODUCTS_FOUND, PRODUCT_FOUND, CHECKOUT_FOUND, SHOP_FOUND, ADD_VARIANT_TO_CART, UPDATE_QUANTITY_IN_CART, REMOVE_LINE_ITEM_IN_CART, OPEN_CART, CLOSE_CART, CART_COUNT, COLLECTION_FOUND, CUSTOM_QUERY } from '../types'
// Creates the client with Shopify-Buy and store info
//
const client = Client.buildClient({
	storefrontAccessToken: "4b62fd62d8cd4cd65f885c66ddf7e5a6",
	domain: "auron-react.myshopify.com",
})


// Gets all the products from Shopify
function getProducts() {
	return (dispatch) => {
		client.product.fetchAll().then((resp) => {
			dispatch({
				type: PRODUCTS_FOUND,
				payload: resp,
			})
		})
	}
}

// // Custom query
const customQuery = client.graphQLClient.query((root) => {
	root.addConnection('products', (product) => {
		product.add('tags');
	})
})



const getCustomProducts = () => {
	return async (dispatch) => {
		const resp = await client.graphQLClient.send(customQuery).then((resp) => {
			dispatch({
				type: CUSTOM_QUERY,
				payload: resp
			})
		})
	}
}

// Gets individual item based on id
function getProduct(id) {
	return async (dispatch) => {
		const resp = await client.product.fetch(id)
		dispatch({
			type: PRODUCT_FOUND,
			payload: resp,
		})
		return resp
	}
}


// Gets a  collection based on that collection's id

function getCollection(collectionId) {
	// const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzIwODAyMDYwMzAzMw=="
	return async (dispatch) => {
		await client.collection.fetchWithProducts(collectionId).then((resp) => {
			dispatch({
				type: COLLECTION_FOUND,
				payload: resp.products,
			})
		})
	}
}

// Creates initial checkout state from Shopify
function checkout() {
	return (dispatch) => {
		client.checkout.create().then((resp) => {
			dispatch({
				type: CHECKOUT_FOUND,
				payload: resp,
			})
		})
	}
}

// Gets Shopify store information
function shopInfo() {
	return (dispatch) => {
		client.shop.fetchInfo().then((resp) => {
			dispatch({
				type: SHOP_FOUND,
				payload: resp,
			})
		})
	}
}

// Adds variants to cart/checkout
function addVariantToCart(checkoutId, lineItemsToAdd) {
	return async (dispatch) => {
		const response = await client.checkout.addLineItems(
			checkoutId,
			lineItemsToAdd
		)
		dispatch({
			type: ADD_VARIANT_TO_CART,
			payload: response,
		})
		return response
	}
}

// Updates quantity of line items in cart and in checkout state
function updateQuantityInCart(lineItemId, quantity, checkoutId) {
	const lineItemsToUpdate = [
		{ id: lineItemId, quantity: parseInt(quantity, 10) },
	]

	return async (dispatch) => {
		const resp = await client.checkout.updateLineItems(
			checkoutId,
			lineItemsToUpdate
		)
		dispatch({
			type: UPDATE_QUANTITY_IN_CART,
			payload: resp,
		})
		return resp
	}
}

// Removes line item from cart and checkout state
function removeLineItemInCart(checkoutId, lineItemId) {
	return (dispatch) => {
		client.checkout.removeLineItems(checkoutId, [lineItemId]).then((resp) => {
			dispatch({
				type: REMOVE_LINE_ITEM_IN_CART,
				payload: resp,
			})
		})
	}
}

// To close the cart
function handleCartClose() {
	return {
		type: CLOSE_CART,
	}
}

// To open the cart
function handleCartOpen() {
	return {
		type: OPEN_CART,
	}
}

// Set the count of items in the cart
function handleSetCount(count) {
	return {
		type: CART_COUNT,
		payload: count,
	}
}


export function useShopify() {
	const dispatch = useDispatch()
	const cartStatus = useSelector((appState) => appState.shopifyState.isCartOpen)
	const cartCount = useSelector((appState) => appState.shopifyState.cartCount)
	const products = useSelector((appState) => appState.shopifyState.products)
	const product = useSelector((appState) => appState.shopifyState.product)
	const featured = useSelector((appState) => appState.shopifyState.featured)
	const checkoutState = useSelector(
		(appState) => appState.shopifyState.checkout
	)
	const shopDetails = useSelector((appState) => appState.shopifyState.shop)
	const fetchProducts = () => dispatch(getProducts())
	const fetchCustomQuery = () => dispatch(getCustomProducts());
	const fetchProduct = (id) => dispatch(getProduct(id))
	const fetchCollection = (id) => dispatch(getCollection(id))
	const createCheckout = () => dispatch(checkout())
	const createShop = () => dispatch(shopInfo())
	const closeCart = () => dispatch(handleCartClose())
	const openCart = () => dispatch(handleCartOpen())
	const setCount = (count) => dispatch(handleSetCount(count))

	const addVariant = (checkoutId, lineItemsToAdd) =>
		dispatch(addVariantToCart(checkoutId, lineItemsToAdd))
	const updateQuantity = (lineItemId, quantity, checkoutID) =>
		dispatch(updateQuantityInCart(lineItemId, quantity, checkoutID))
	const removeLineItem = (checkoutId, lineItemId) =>
		dispatch(removeLineItemInCart(checkoutId, lineItemId))
	return {
		products,
		product,
		featured,
		cartStatus,
		checkoutState,
		cartCount,
		shopDetails,
		addVariant,
		fetchProducts,
		fetchCustomQuery,
		fetchProduct,
		fetchCollection,
		createCheckout,
		createShop,
		closeCart,
		openCart,
		updateQuantity,
		removeLineItem,
		setCount,
	}
}