import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class MergeDataPage extends Component {
  render() {
    const { previousStep, viewModel } = this.props;
    const handleClick = () => {
      console.log(viewModel);
    };
    return (
      <>
        <div className="bg-white p-4 rounded-2">
          <Button onClick={handleClick} variant="success" className="fw-semibold px-4">
            Merge Data
          </Button>
        </div>
        <Button
          onClick={previousStep}
          variant="outline-secondary"
          className=" fs-14 fw-semibold p-2 mt-4"
        >
          Previous Step
        </Button>
      </>
    );
  }
}
