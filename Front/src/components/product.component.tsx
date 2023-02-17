import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import ProductDataService from "../services//product.service";
import IProductData from "../types//product.type";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentProduct: IProductData;
  message: string;
}

export default class Product extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: "",
        price: 0,
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentProduct: {
        ...prevState.currentProduct,
        description: description,
      },
    }));
  }

  getProduct(id: string) {
    ProductDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updatePublished(status: boolean) {
    const data: IProductData = {
      id: this.state.currentProduct.id,
      name: this.state.currentProduct.name,
      price: this.state.currentProduct.price,
      published: status,
    };

    ProductDataService.update(data, this.state.currentProduct.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentProduct: {
            ...prevState.currentProduct,
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

  updateProduct() {
    ProductDataService.update(
      this.state.currentProduct,
      this.state.currentProduct.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The product was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteProduct() {
    ProductDataService.delete(this.state.currentProduct.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/products");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        {currentProduct ? (
          <div className="edit-form">
            <h4>Product</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentProduct.name}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProduct.price}
                  onChange={this.onChangeDescription}
                />
              </div>

            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduct}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a product...</p>
          </div>
        )}
      </div>
    );
  }
}
