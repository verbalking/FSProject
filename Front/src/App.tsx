import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProductsList from "./components/products-list.component";
import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import AddShop from "./components/add-shop.component";
import ShopsList from "./components/shops-list.component";
import CategoriesList from "./components/categories-list.component";
import Category from "./components/category.component";
import AddCategory from "./components/add-category.component";
import Shop from "./components/shop.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/shops"} className="navbar-brand">
            My Shop
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/shops"} className="nav-link">
                Shops
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/products"} className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Categories
              </Link>
            </li>

          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/shops"]} component={ShopsList} />
            <Route exact path="/addshop" component={AddShop} />
            <Route exact path="/addproduct" component={AddProduct} />
            <Route exact path="/addCategory" component={AddCategory} />
            <Route path="/shops/:id" component={Shop} />
            <Route path="/products/:id" component={Product} />
            <Route path="/categories/:id" component={Category} />
            <Route path="/products" component={ProductsList} />
            <Route path="/categories" component={CategoriesList} />



          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
