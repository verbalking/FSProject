import { Component, ChangeEvent } from "react";
import ShopDataService from "../services/shop.service";
import { Link } from "react-router-dom";
import IShopData from '../types/shop.type';

type Props = {};

type State = {
  shops: Array<IShopData>,
  currentShop: IShopData | null,
  currentIndex: number,
  searchShop: string
};

export default class ShopsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveShops = this.retrieveShops.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveShop = this.setActiveShop.bind(this);
    this.removeAllShops = this.removeAllShops.bind(this);
    this.searchShop = this.searchShop.bind(this);

    this.state = {
      shops: [],
      currentShop: null,
      currentIndex: -1,
      searchShop: ""
    };
  }

  componentDidMount() {
    this.retrieveShops();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchShop = e.target.value;

    this.setState({
      searchShop: searchShop
    });
  }

  retrieveShops() {
    ShopDataService.getAll()
      .then((response: any) => {
        this.setState({
          shops: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveShops();
    this.setState({
      currentShop: null,
      currentIndex: -1
    });
  }

  setActiveShop(shop: IShopData, index: number) {
    this.setState({
      currentShop: shop,
      currentIndex: index
    });
  }

  removeAllShops() {
    ShopDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchShop() {
    this.setState({
      currentShop: null,
      currentIndex: -1
    });

    ShopDataService.findByName(this.state.searchShop)
      .then((response: any) => {
        this.setState({
          shops: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchShop, shops, currentShop, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchShop}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchShop}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Shops List</h4>

          <ul className="list-group">
            {shops &&
              shops.map((shop: IShopData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveShop(shop, index)}
                  key={index}
                >
                  {shop.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllShops}
          >
            Remove All
          </button>

          <Link to={"/addshop"}>
          <button
            className="btn btn-sm"
            onClick={()=>{}}
          >
            Add shop
          </button>
              </Link>
        </div>
        <div className="col-md-6">
          {currentShop ? (
            <div>
              <h4>Shop</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentShop.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentShop.description}
              </div>


              <Link
                to={"/shops/" + currentShop.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a shop...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
