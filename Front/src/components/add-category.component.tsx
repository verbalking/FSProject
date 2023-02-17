import { Component, ChangeEvent } from "react";
import CategoryDataService from "../services/category.service";
import ICategoryData from "../types/category.type";

type Props = {};

type State = ICategoryData & {
  submitted: boolean
};

export default class AddCategory extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.newCategory = this.newCategory.bind(this);

    this.state = {
      id: null,
      name: "",
      published: false,
      submitted: false
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  saveCategory() {
    const data: ICategoryData = {
      name: this.state.name,
    };

    CategoryDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
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

  newCategory() {
    this.setState({
      id: null,
      name: "",
      published: false,
      submitted: false
    });
  }

  render() {
    const { submitted, name } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCategory}>
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

            <button onClick={this.saveCategory} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
