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
    createCheckout,
    fetchCollections
  } = useShopify();

  useEffect(() => {
    createShop()
    createCheckout()
    fetchCollections()
  }, [])

  const visible = useSelector(state => state.settings.mobileNav)
  const dispatch = useDispatch();

  return (
    <>
      <Router history={history}>
        <Container>
          <Sidebar.Pushable>
            <Header />
            <Sidebar.Pusher onClick={() => dispatch(handlePusher())} dimmed={visible} style={{ minHeight: '100vh' }}>
              <BreadcrumbBar />
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/men' exact >
                  <Shop collection={'Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI2NTczMzc2NzM1MQ=='} />
                </Route>
                <Route path='/women' exact >
                  <Shop collection='Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzI2NTczNDI1ODg3MQ==' />
                </Route>
                <Route path='/kids' exact >
                  <Shop collection='0' />
                </Route>
                <Route path='/shop/:id' exact component={ProductItem} />
                <Route path='/cart' exact component={Cart} />
              </Switch>
              <Footer />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Container>
      </Router>
    </>
  );
}

export default App;
