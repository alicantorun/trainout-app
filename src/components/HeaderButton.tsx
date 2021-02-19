import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {AppIcon} from '../AppStyles';

export interface Props {
  // TODO
  icon: any;
  onPress(): void;
}

const HeaderButton: React.FC<Props> = ({onPress, icon}) => {
  return (
    <TouchableOpacity style={AppIcon.container} onPress={onPress}>
      <Image style={AppIcon.style} source={icon} />
    </TouchableOpacity>
  );
};

export default HeaderButton;
