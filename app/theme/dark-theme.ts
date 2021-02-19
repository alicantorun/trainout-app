import { Dimensions } from 'react-native';
import { darkThemeColors } from './dark-theme-colors';

const { width, height } = Dimensions.get('screen');

import { Theme } from './../interfaces';

export const darkTheme: Theme = {
  button: {
    backgroundColor: darkThemeColors.primary,
  },
  header: {
    backgroundColor: darkThemeColors.primary,
  },
  colors: {
    ...darkThemeColors,
  },
  screen: {
    width,
    height,
  },
};
