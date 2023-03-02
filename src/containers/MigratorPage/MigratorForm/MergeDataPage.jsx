import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';

const MergeDataPage = observer(
  class MergeDataPage extends Component {
    constructor(props) {
      super(props);
      this.viewModel = props.viewModel;
      this.state = {
        isMerging: false,
        percent: 0,
      };
    }
    increasePercentPerSecond = () => {
      if (this.state.percent < 99) {
        this.setState({ percent: this.state.percent + 3 });
      }
    };
    handleClick = async () => {
      this.setState({ isMerging: true });
      const increasePercent = setInterval(this.increasePercentPerSecond, 500);
      const response = await this.viewModel.migratorData();
      if (response) {
        this.setState({ percent: 100 });
      }
      clearInterval(increasePercent);
      this.setState({ isMerging: false });
    };
    render() {
      const { previousStep, t } = this.props;
      const { isMerging, percent } = this.state;
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
              <div className="col-10">
                <ProgressBar
                  className="fw-bold"
                  striped
                  animated
                  variant="success"
                  now={percent}
                  label={`${percent}%`}
                />
              </div>
            </div>
          </div>
          <Button
            onClick={previousStep}
            variant="outline-secondary"
            className=" fs-14 fw-semibold p-2 mt-4"
          >
            {t('txt_previous_step')}
          </Button>
        </>
      );
    }
  }
);
export default withTranslation('common')(MergeDataPage);
