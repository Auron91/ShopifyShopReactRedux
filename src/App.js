import "./App.scss";
import { Router, Route, Switch } from 'react-router-dom';
import { Sidebar, Container } from "semantic-ui-react";
// components
import Header from "./components/Header";
import BreadcrumbBar from "./components/BreadcrumbBar";
import Home from './components/Home'
import Shop from './components/Shop';
import ProductItem from './components/ProductItem'
import Footer from "./components/Footer";
import history from './history'

import { useSelector, useDispatch } from 'react-redux'
import { handlePusher } from './redux/actions/index'

import { useShopify } from './hooks'
import { useEffect } from "react";
import Cart from "./components/cart/Cart";

function App() {
  const {
    createShop,
    createCheckout
  } = useShopify();

  useEffect(() => {
    createShop()
    createCheckout()
  }, [])
  const visible = useSelector(state => state.settings.mobileNav)
  const dispatch = useDispatch();

  return (
    <>
      <Router history={history}>
        <Sidebar.Pushable>
          <Container>
            <Header />
            <Sidebar.Pusher onClick={() => dispatch(handlePusher())} dimmed={visible} style={{ minHeight: '100vh' }}>
              <BreadcrumbBar />
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/men' exact >
                    <Shop sex='male' />
                </Route>
                <Route path='/women' exact >
                    <Shop sex='female' />
                </Route>
                <Route path='/kids' exact >
                    <Shop sex='kids' />
                </Route>
                <Route path='/shop/:id' exact component={ProductItem} />
                <Route path='/cart' exact component={Cart} />
              </Switch>
              <Footer />
            </Sidebar.Pusher>
          </Container>
        </Sidebar.Pushable>
      </Router>
    </>
  );
}

export default App;
