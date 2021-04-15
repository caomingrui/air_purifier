import React from 'react';
import { TopBar, TYSdk } from 'tuya-panel-kit';
import ProfileScreenNavigationProp from '@/interface/PropsTypes';
import { Platform } from 'react-native';

interface DataType {
  text?: string;
  image?: number;
  textColor?: string;
  imageColor?: string;
  textPress?: () => void;
  imagePress?: () => void;
}

interface topBarsType {
  navigation: ProfileScreenNavigationProp;
  left: DataType;
  right: DataType;
  title: string;
  isShowRight: boolean;
  isShowleft: boolean;
  backgroundColor: string;
  color: string;
  goLeft: () => void;
  goRight: () => void;
}

const getAction = (
  isShow: boolean,
  data: DataType,
  defaultPress: any,
  color: string,
  type: string
): Array<any> => {
  const action = [];
  if (isShow) {
    if (data === undefined) {
      action.push({
        name: type === 'left' ? backIcon : 'pen',
        color,
        onPress: defaultPress,
      });
    } else {
      const { image, text } = data;
      if (image !== undefined) {
        const { imageColor, imagePress } = data;
        const onPress = imagePress === undefined ? defaultPress : imagePress;
        if (typeof image === 'number') {
          action.push({
            source: image,
            color: imageColor !== undefined ? imageColor : color,
            onPress: () => onPress(),
          });
        } else {
          action.push({
            name: image,
            color: imageColor !== undefined ? imageColor : color,
            onPress: () => onPress(),
          });
        }
      }

      if (text !== undefined) {
        const { textColor, textPress } = data;
        const onPress = textPress === undefined ? defaultPress : textPress;
        action.push({
          source: text,
          color: textColor !== undefined ? textColor : color,
          onPress: () => onPress(),
        });
      }
    }
  }
  return action;
};

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

const TopBars = ({ ...props }: topBarsType): JSX.Element => {
  const {
    navigation: navigator,
    title,
    isShowRight,
    backgroundColor,
    color,
    goLeft,
    left,
    right,
    isShowleft,
    goRight,
  } = props;

  let leftClick: any = () => TYSdk.native.back();
  if (navigator && navigator.canGoBack()) {
    leftClick = goLeft ? () => goLeft() : () => navigator.pop();
  }

  const rightClick = goRight ? () => goRight() : () => TYSdk.native.showDeviceMenu();

  const leftAction: Array<any> = getAction(isShowleft, left, leftClick, color, 'left');
  const rightAction: Array<any> = getAction(isShowRight, right, rightClick, color, 'right');
  return (
    <TopBar
      background={backgroundColor}
      title={title}
      color={color}
      onBack={() => leftClick()}
      leftActions={leftAction}
      actions={rightAction}
    />
  );
};

TopBars.defaultProps = {
  navigator: {},
  title: '',
  left: undefined,
  right: undefined,
  isShowRight: false,
  isShowleft: true,
  backgroundColor: 'transparent',
  color: '#000',
  goLeft: undefined,
  goRight: undefined,
} as Pick<topBarsType, any>;

export default TopBars;
