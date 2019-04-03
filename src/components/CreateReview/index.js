import React, { Component } from "react";
import { Mutation } from "react-apollo";
import CREATE_REVIEW from "../../graphql/mutations/CREATE_REVIEW";

class CreateReview extends Component {
  state = {
    yearPredict: undefined,
    pricePredict: undefined,
    score: undefined,
    tastingNotes: [],
    pairing: undefined,
  };

  inputHandler = e => {
    let { name, value } = e.target;
    switch (name) {
      case 'tastingNotes':
        this.setState({ tastingNotes: [...e.target.selectedOptions].map(o => o.value) });
        break;
      case 'score':
      case 'yearPredict':
        value = Number(value);
        this.setState({ [name]: value });
        break;
      case 'pricePredict':
        value = parseFloat(value);
        this.setState({ [name]: value });
        break;
      case 'pairing':
        this.setState({ [name]: value });
        break;
      default:
      break;
    }
  }

  render() {
    const { score, tastingNotes ,pricePredict, yearPredict, pairing } = this.state;
    const { wineTaster, wine, tastingSession } = this.props;
    return (
      <div>
        <div>
          <input className="form-control"
            name="score"
            value={score}
            onChange={this.inputHandler}
            type="number"
            placeholder="Score"
          />
          <br />
          <input className="form-control"
            name="pricePredict"
            value={pricePredict}
            onChange={this.inputHandler}
            type="float"
            placeholder="Price"
          />
          <br />
          <input className="form-control"
            name="yearPredict"
            value={yearPredict}
            onChange={this.inputHandler}
            type="int"
            placeholder="Year"
          />
          <br />
          <input className="form-control"
            name="pairing"
            value={pairing}
            onChange={this.inputHandler}
            type="text"
            placeholder="Pairing"
          />
          <br />
          <select className="form-control"
            name="tastingNotes"
            value={tastingNotes}
            onChange={this.inputHandler}
            type="text"
            placeholder="Tasting Notes"
            multiple={true}
          >
            <option value="ACIDIC">ACIDIC</option>
            <option value="BARNYARD">BARNYARD</option>
            <option value="BRIGHT">BRIGHT</option>
            <option value="BUTTERY">BUTTERY</option>
            <option value="COMPLEX">COMPLEX</option>
            <option value="OAKED">OAKED</option>
            <option value="JUICY">JUICY</option>
            <option value="CRISP">CRISP</option>
            <option value="EARTHY">EARTHY</option>
          </select>
          <br />
        </div>
        <Mutation
          mutation={CREATE_REVIEW}
          variables={{
            wine,
            wineTaster,
            tastingSession,
            score,
            tastingNotes,
            yearPredict,
            pricePredict,
            pairing
          }}
        >
          {postMutation => <button className="btn btn-outline-primary" onClick={postMutation}>Submit Review</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateReview;
