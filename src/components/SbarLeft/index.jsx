/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { mainMenu } from 'routes/menu';
import { Menu } from 'aesirx-uikit';

const SbarLeft = () => {
  return (
    <>
      <Menu dataMenu={mainMenu} />
    </>
  );
};

export default SbarLeft;
