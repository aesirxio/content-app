/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';

class JoomlaFormViewModel {
  migratorStore = null;
  formPropsData = {
    type: 'JOOMLA',
  };

  constructor(migratorStore) {
    makeAutoObservable(this);
    this.migratorStore = migratorStore;
  }

  migratorData = () => {};
}

export default JoomlaFormViewModel;
