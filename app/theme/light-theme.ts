import { Dimensions } from 'react-native';
import { lightThemeColors } from './light-theme-colors';

const { width, height } = Dimensions.get('screen');

import { Theme } from './../interfaces';

export const lightTheme: Theme = {
  button: {
    backgroundColor: lightThemeColors.primary,
  },
  header: {
    backgroundColor: lightThemeColors.primary,
  },
  colors: {
    ...lightThemeColors,
  },
  screen: {
    width,
    height,
  },
};
