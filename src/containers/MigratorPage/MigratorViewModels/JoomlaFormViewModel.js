/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from 'components/Toast';

class JoomlaFormViewModel {
  migratorStore = null;
  type = 'JOOMLA';
  formPropsData = {};

  constructor(migratorStore) {
    makeAutoObservable(this);
    this.migratorStore = migratorStore;
  }

  migratorData = async () => {
    return await this.migratorStore.migratorData(
      this.type,
      this.formPropsData,
      this.callbackOnSucessHandler,
      this.callbackOnErrorHandler
    );
  };
  callbackOnSucessHandler = () => {
    this.processPercent == 100;
    notify('Migrator data successfully !');
  };
  callbackOnErrorHandler = () => {
    notify('Something when wrong !', 'error');
  };
}

export default JoomlaFormViewModel;
