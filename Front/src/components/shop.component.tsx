import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import ShopDataService from "../services/shop.service";
import IShopData from "../types/shop.type";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentShop: IShopData;
  message: string;
}

export default class Shop extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getShop = this.getShop.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateShop = this.updateShop.bind(this);
    this.deleteShop = this.deleteShop.bind(this);

    this.state = {
      currentShop: {
        id: null,
        name: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getShop(this.props.match.params.id);
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentShop: {
          ...prevState.currentShop,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentShop: {
        ...prevState.currentShop,
        description: description,
      },
    }));
  }

  getShop(id: string) {
    ShopDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentShop: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updatePublished(status: boolean) {
    const data: IShopData = {
      id: this.state.currentShop.id,
      name: this.state.currentShop.name,
      description: this.state.currentShop.description,
      published: status,
    };

    ShopDataService.update(data, this.state.currentShop.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentShop: {
            ...prevState.currentShop,
            published: status,
          },
          message: "The status was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateShop() {
    ShopDataService.update(
      this.state.currentShop,
      this.state.currentShop.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The shop was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteShop() {
    ShopDataService.delete(this.state.currentShop.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/shops");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentShop } = this.state;

    return (
      <div>
        {currentShop ? (
          <div className="edit-form">
            <h4>Shop</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentShop.name}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentShop.description}
                  onChange={this.onChangeDescription}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteShop}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateShop}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a shop...</p>
          </div>
        )}
      </div>
    );
  }
}
