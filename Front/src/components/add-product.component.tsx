import { Component, ChangeEvent } from "react";
import ProductDataService from "../services/product.service";
import IProductData from "../types/product.type";

type Props = {};

type State = IProductData & {
  submitted: boolean
};

export default class AddProduct extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      name: "",
      price: 0,
      published: false,
      submitted: false
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      price: parseInt(e.target.value)
    });
  }

  saveProduct() {
    const data: IProductData = {
      name: this.state.name,
      price: this.state.price
    };

    ProductDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          published: response.data.published,
          submitted: true
        });
        ;
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: "",
      price: 0,
      published: false,
      submitted: false
    });
  }

  render() {
    const { submitted, name, price } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
