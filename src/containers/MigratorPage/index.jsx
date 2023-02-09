import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StepWizard from 'react-step-wizard';
import JoomlaForm from './MigratorForm/JoomlaForm';
import WordPressForm from './MigratorForm/WordPressForm';
import MergeDataPage from './MigratorForm/MergeDataPage';
import { observer } from 'mobx-react';

import MigratorStore from './MigratorStore/MigratorStore';
import MigratorViewModel from './MigratorViewModels/MigratorViewModel';
import { MigratorViewModelContextProvider } from './MigratorViewModels/MigratorViewModelContextProvider';

const migratorStore = new MigratorStore();
const migratorViewModel = new MigratorViewModel(migratorStore);
const MigratorPage = observer(
  class MigratorPage extends Component {
    constructor(props) {
      super(props);
      this.match = props.match;
    }
    render() {
      return (
        <MigratorViewModelContextProvider viewModel={migratorViewModel}>
          <div className="py-4 px-3 h-100 ">
            <Route exact path="/migrator/joomla">
              <StepWizard
                isLazyMount={true}
                transitions={{
                  enterRight: '',
                  enterLeft: '',
                  exitRight: '',
                  exitLeft: '',
                }}
                initialStep={1}
              >
                <JoomlaForm match={this.match} />
                <MergeDataPage viewModel={migratorViewModel?.getJoomlaFormViewModel()} />
              </StepWizard>
            </Route>
            <Route exact path="/migrator/wordpress">
              <StepWizard
                isLazyMount={true}
                transitions={{
                  enterRight: '',
                  enterLeft: '',
                  exitRight: '',
                  exitLeft: '',
                }}
                initialStep={1}
              >
                <WordPressForm match={this.match} />
                <MergeDataPage viewModel={migratorViewModel?.getWordPressFormViewModel()} />
              </StepWizard>
            </Route>
          </div>
        </MigratorViewModelContextProvider>
      );
    }
  }
);
export default MigratorPage;
