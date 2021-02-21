import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../theme';

const { colors } = theme;

const tabIcons = {
  search: <MaterialIcons name="search" color={colors.white} size={25} />,
  home: <MaterialIcons name="home" color={colors.white} size={25} />,
  profile: <MaterialIcons name="person" color={colors.white} size={25} />,
};

export { tabIcons };
