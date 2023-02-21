import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { observer } from 'mobx-react';

const MergeDataPage = observer(
  class MergeDataPage extends Component {
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel;
      this.state = {
        isMerging: false,
      };
    }
    handleClick = () => {
      // this.setState({ isMerging: true });
      this.viewModel.migratorData();
    };
    render() {
      const { previousStep } = this.props;
      const { isMerging } = this.state;
      return (
        <>
          <div className="bg-white p-4 rounded-2 ">
            <div className="row align-items-center">
              <div className="col-2">
                <Button
                  disabled={isMerging}
                  onClick={this.handleClick}
                  variant="success"
                  className="fw-semibold px-4"
                >
                  {isMerging ? 'Merging...' : 'Merge Data'}
                </Button>
              </div>
              {this.viewModel?.processPercent ? (
                <div className="col-10">
                  <ProgressBar
                    className="fw-bold"
                    striped
                    animated
                    variant="success"
                    now={this.viewModel?.processPercent}
                    label={`${this.viewModel?.processPercent}%`}
                  />
                </div>
              ) : null}
            </div>
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
);
export default MergeDataPage;
