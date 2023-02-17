import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';

import CategoryDataService from "../services/category.service";
import ICategoryData from "../types/category.type";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentCategory: ICategoryData;
  message: string;
}

export default class Category extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCategory = this.getCategory.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      currentCategory: {
        id: null,
        name: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getCategory(this.props.match.params.id);
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCategory: {
          ...prevState.currentCategory,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCategory: {
        ...prevState.currentCategory,
        description: description,
      },
    }));
  }

  getCategory(id: string) {
    CategoryDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentCategory: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updatePublished(status: boolean) {
    const data: ICategoryData = {
      id: this.state.currentCategory.id,
      name: this.state.currentCategory.name,
      published: status,
    };

    CategoryDataService.update(data, this.state.currentCategory.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentCategory: {
            ...prevState.currentCategory,
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

  updateCategory() {
    CategoryDataService.update(
      this.state.currentCategory,
      this.state.currentCategory.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The category was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteCategory() {
    CategoryDataService.delete(this.state.currentCategory.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/categories");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentCategory } = this.state;

    return (
      <div>
        {currentCategory ? (
          <div className="edit-form">
            <h4>Category</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCategory.name}
                  onChange={this.onChangeTitle}
                />
              </div>

            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCategory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCategory}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a category...</p>
          </div>
        )}
      </div>
    );
  }
}
