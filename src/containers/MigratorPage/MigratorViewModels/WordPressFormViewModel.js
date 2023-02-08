/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';

class WordPressFormViewModel {
  migratorStore = null;
  formPropsData = {
    type: 'WORDPRESS',
  };
  constructor(migratorStore) {
    makeAutoObservable(this);
    this.migratorStore = migratorStore;
  }
  resetData = () => {
    this.formPropsData = { type: 'WORDPRESS' };
  };
  migratorData = () => {};
}

export default WordPressFormViewModel;
