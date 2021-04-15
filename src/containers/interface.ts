import { BaseContainerPropsType } from '@/interface/PropsTypes';
import { PanelInfo } from '@/interface/PanelInfo';

export interface HomePropsType extends BaseContainerPropsType {
  devInfo: PanelInfo.DevInfo;
}

export interface HomeStateType {
  [stateKey: string]: any;
}
