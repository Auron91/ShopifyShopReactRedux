import "./App.scss";
import { Router, Route, Switch } from 'react-router-dom';
import { Sidebar } from "semantic-ui-react";
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

function App() {
  const visible = useSelector(state => state.settings.mobileNav)
  const dispatch = useDispatch();

  return (
    <>
      <Router history={history}>
        <Sidebar.Pushable>
          <Header />
          <Sidebar.Pusher onClick={() => dispatch(handlePusher())} dimmed={visible} style={{ minHeight: '100vh' }}>
            <BreadcrumbBar />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/shop' exact component={Shop} />
              <Route path='/shop/:id' exact component={ProductItem} />
            </Switch>
            <Footer />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Router>
    </>
  );
}

export default App;
