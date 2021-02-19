import { Appearance } from 'react-native';

import { lightTheme } from './light-theme';
import { darkTheme } from './dark-theme';

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

export { theme };
