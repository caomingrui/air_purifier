import { BaseContainerPropsType } from '@/interface/PropsTypes';
import { PanelInfo } from '@/interface/PanelInfo';

export interface HomePropsType extends BaseContainerPropsType {
  devInfo: PanelInfo.DevInfo;
}
export interface HomeStateType {
  [stateKey: string]: any;
}

export interface DashBoardPropsType {
  devInfo?: PanelInfo.DevInfo;
}
export interface DashBoardStateType{
  [stateKey: string]: any;
}

export interface SlidePropsType {
  devInfo?: PanelInfo.DevInfo;
}
export interface SlideStateType{
  [stateKey: string]: any;
}
export interface NavBarPropsType {
  devInfo?: PanelInfo.DevInfo;
}
export interface NavBarStateType{
  [stateKey: string]: any;
}