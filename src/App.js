import "./App.css";
import { Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import Shop from './components/Shop';
import Home from './components/Home'
import ProductItem from './components/ProductItem'

import history from './history'

import { Container } from "semantic-ui-react";

function App() {
  return (
    <div className="">
      <Router history={history}>
        <Header />
        <Container>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/shop/:id' exact component={ProductItem} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
