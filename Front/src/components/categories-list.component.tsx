import { Component, ChangeEvent } from "react";
import CategoryDataService from "../services/category.service";
import { Link } from "react-router-dom";
import ICategoryData from '../types/category.type';

type Props = {};

type State = {
  categories: Array<ICategoryData>,
  currentCategory: ICategoryData | null,
  currentIndex: number,
  searchCategory: string
};

export default class CategoriesList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.removeAllCategories = this.removeAllCategories.bind(this);
    this.searchCategory = this.searchCategory.bind(this);

    this.state = {
      categories: [],
      currentCategory: null,
      currentIndex: -1,
      searchCategory: ""
    };
  }

  componentDidMount() {
    this.retrieveCategories();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchCategory = e.target.value;

    this.setState({
      searchCategory: searchCategory
    });
  }

  retrieveCategories() {
    CategoryDataService.getAll()
      .then((response: any) => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log("dddddddddddddddddddd");
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCategories();
    this.setState({
      currentCategory: null,
      currentIndex: -1
    });
  }

  setActiveCategory(category: ICategoryData, index: number) {
    this.setState({
      currentCategory: category,
      currentIndex: index
    });
  }

  removeAllCategories() {
    CategoryDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  

  searchCategory() {
    this.setState({
      currentCategory: null,
      currentIndex: -1
    });

    CategoryDataService.findByName(this.state.searchCategory)
      .then((response: any) => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchCategory, categories, currentCategory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchCategory}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCategory}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Categories List</h4>

          <ul className="list-group">
            {console.log(categories)}
            {categories &&
              categories.map((category: ICategoryData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCategory(category, index)}
                  key={index}
                >
                  {category.name}
                </li>
              ))}
          </ul>
                
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCategories}
          >
            Remove All
          </button>


          <Link to={"addCategory"}>
          <button
            className="btn btn-sm"
            onClick={()=>{}}
          >
            Add category
          </button>
              </Link>
        </div>
        <div className="col-md-6">
          {currentCategory ? (
            <div>
              <h4>Category</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCategory.name}
              </div>


              <Link
                to={"/categories/" + currentCategory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a category...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
