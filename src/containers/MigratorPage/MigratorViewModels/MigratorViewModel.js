/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
import JoomlaFormViewModel from './JoomlaFormViewModel';
import WordPressFormViewModel from './WordPressFormViewModel';

class MigratorViewModel {
  joomlaFormViewModel = null;
  wordpressFormViewModel = null;

  constructor(migratorStore) {
    if (migratorStore) {
      this.joomlaFormViewModel = new JoomlaFormViewModel(migratorStore);
      this.wordpressFormViewModel = new WordPressFormViewModel(migratorStore);
    }
  }
  getJoomlaFormViewModel = () => this.joomlaFormViewModel;
  getWordPressFormViewModel = () => this.wordpressFormViewModel;
}

export default MigratorViewModel;
