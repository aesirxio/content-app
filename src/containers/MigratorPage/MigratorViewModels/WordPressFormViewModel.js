/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { notify } from 'components/Toast';
import { makeAutoObservable } from 'mobx';

class WordPressFormViewModel {
  migratorStore = null;
  type = 'WORDPRESS';
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
    notify('Migrator data successfully !');
  };
  callbackOnErrorHandler = () => {
    notify('Something when wrong !', 'error');
  };
}

export default WordPressFormViewModel;
