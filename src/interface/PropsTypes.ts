// import { DeprecatedNavigator } from 'tuya-panel-kit';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { NavigationOptions } from 'tuya-panel-kit';
import { PanelInfo } from './PanelInfo';

export interface BasePropsType {
  schema: PanelInfo.DpSchema;
}
export type ProfileScreenNavigationProp = StackNavigationProp<any, any>;
export type ProfileScreenRouteProp = RouteProp<any, any>;
export interface BaseContainerPropsType extends BasePropsType {
  // navigation: NavigationProp<ParamListBase> | { [key: string]: any };
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
  deviceName?: string;
  options:
    | StackNavigationOptions
    | ((props: { route: RouteProp<any, string>; navigation: any }) => StackNavigationOptions)
    | NavigationOptions;
}
