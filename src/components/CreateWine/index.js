import React, { Component } from "react";
import { Mutation } from "react-apollo";

import CREATE_WINE from "../../graphql/mutations/CREATE_WINE";
import WINES from "../../graphql/queries/WINES";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000
  });

class CreateWine extends Component {
  
  state = {
    isOpen: false,
    name: "",
    grapes: [],
    winery: "",
    year: null,
    alcohol: null,
    price: null,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  inputHandler = e => {
    let { name, value } = e.target;
    if (name === "grapes") {
      this.setState({
        grapes: [...e.target.selectedOptions].map(o => o.value),
      });
    } else {
      if (name === "price" || name === "year" || name === "alcohol")
        value = Number(value);
      this.setState({ [name]: value });
    }
  };

  onCompleted = () => {
    Toast.fire({
      type:"success",
      title:"Wine Added Successfully"
    });
    this.setState({
      name: "",
      grapes: [],
      winery: "",
      year: undefined,
      alcohol: undefined,
      price: undefined,
    });
    this.button.click();
  }

  render() {
    const { name, grapes, winery, year, alcohol, price } = this.state;
    return (
      <div style={{marginTop:"10px"}}>
        <button className="btn btn-outline-primary "
                onClick={this.toggle}
                data-toggle="modal"
                data-target="#exampleModal"
        >Create New Wine</button>
        <div className={"modal fade"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New Wine</h5>
              <button ref={el => this.button = el} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
            <input
              className="form-control"
              name="name"
              value={name}
              onChange={this.inputHandler}
              type="text"
              placeholder="Name"
            />
            <br />
            <select
              className="form-control"
              name="grapes"
              value={grapes}
              onChange={this.inputHandler}
              type="text"
              placeholder="Grapes"
              multiple={true}
            >
              <option value="GEWURZTRAMINER">GEWURZTRAMINER</option>
              <option value="CHARDONNAY">CHARDONNAY</option>
              <option value="SAUVIGNON_BLANC">SAUVIGNON BLANC</option>
              <option value="SYRAH">SYRAH</option>
              <option value="MERLOT">MERLOT</option>
              <option value="CABERNET_SAUVIGNON">CABERNET SAUVIGNON</option>
              <option value="PINOT_NOIR">PINOT NOIR</option>
            </select>
            <br />
            <input
              className="form-control"
              name="winery"
              value={winery}
              onChange={this.inputHandler}
              type="text"
              placeholder="Winery"
            />
            <br />
            <input
              className="form-control"
              name="year"
              value={year}
              onChange={this.inputHandler}
              type="number"
              placeholder="Year"
            />
            <br />
            <input
              className="form-control"
              name="alcohol"
              value={alcohol}
              onChange={this.inputHandler}
              type="number"
              placeholder="Alcohol percentage"
            />
            <br />
            <input
              className="form-control"
              name="price"
              value={price}
              onChange={this.inputHandler}
              type="number"
              placeholder="Price"
            />
          </div>
        </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <Mutation
              mutation={CREATE_WINE}
              refetchQueries={[{
                query: WINES,
              }]}
              variables={{
                name,
                grapes,
                winery,
                year,
                alcohol,
                price,
              }}
              onCompleted={this.onCompleted}
            >
              {postMutation => <button className="btn btn-primary" onClick={postMutation}>Save changes</button>}
            </Mutation>
            </div>
          </div>
        </div>
      </div>
        
          
      </div>
    );
  }
}

export default CreateWine;
