import { Component, ChangeEvent } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";
import IProductData from '../types/product.type';

type Props = {};

type State = {
  products: Array<IProductData>,
  currentProduct: IProductData | null,
  currentIndex: number,
  searchProduct: string
};

export default class ProductsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);
    this.searchProduct = this.searchProduct.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
      searchProduct: ""
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchProduct = e.target.value;

    this.setState({
      searchProduct: searchProduct
    });
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then((response: any) => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });
  }

  setActiveProduct(product: IProductData, index: number) {
    this.setState({
      currentProduct: product,
      currentIndex: index
    });
  }

  removeAllProducts() {
    ProductDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  

  searchProduct() {
    this.setState({
      currentProduct: null,
      currentIndex: -1
    });

    ProductDataService.findByName(this.state.searchProduct)
      .then((response: any) => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchProduct, products, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchProduct}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchProduct}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Products List</h4>

          <ul className="list-group">
            {products &&
              products.map((product: IProductData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.name}
                </li>
              ))}
          </ul>
                
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProducts}
          >
            Remove All
          </button>


          <Link to={"/addProduct"}>
          <button
            className="btn btn-sm"
            onClick={()=>{}}
          >
            Add product
          </button>
              </Link>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentProduct.name}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentProduct.price}
              </div>


              <Link
                to={"/products/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
