import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StepWizard from 'react-step-wizard';
import JoomlaForm from './MigratorForm/JoomlaForm';
import WordPressForm from './MigratorForm/WordPressForm';
import MergeDataPage from './MigratorForm/MergeDataPage';

export class MigratorPage extends Component {
  render() {
    return (
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
            <JoomlaForm />
            <MergeDataPage />
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
            <WordPressForm />
            <MergeDataPage />
          </StepWizard>
        </Route>
      </div>
    );
  }
}

export default MigratorPage;
