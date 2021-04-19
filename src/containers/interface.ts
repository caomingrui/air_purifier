import { BaseContainerPropsType } from '@/interface/PropsTypes';
import { PanelInfo } from '@/interface/PanelInfo';

export interface HomePropsType extends BaseContainerPropsType {
  devInfo: PanelInfo.DevInfo;
  dpState: any;
  route:any;
  schema:any;
  navigation:any;
}
export interface HomeStateType {
  [stateKey: string]: any;
}

export interface DashBoardPropsType {
  [stateKey: string]: any;
}
export interface DashBoardStateType{
  [stateKey: string]: any;
}

export interface SlidePropsType {
  [stateKey:string]:any
}
export interface SlideStateType{
  [stateKey: string]: any;
}
export interface NavBarPropsType {
  [stateKey:string]:any
}
export interface NavBarStateType{
  [stateKey: string]: any;
}
export interface SwitchPropsType {
  [stateKey:string]:any
}
export interface SwitchStateType{
  [stateKey: string]: any;
}