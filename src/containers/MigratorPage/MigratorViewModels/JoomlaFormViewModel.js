/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';

class JoomlaFormViewModel {
  migratorStore = null;
  processPercent = 0;
  type = 'JOOMLA';
  formPropsData = {};

  constructor(migratorStore) {
    makeAutoObservable(this);
    this.migratorStore = migratorStore;
  }

  migratorData = () => {
    this.migratorStore.migratorData(this.type, this.formPropsData);
  };
}

export default JoomlaFormViewModel;
