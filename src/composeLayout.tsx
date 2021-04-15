import { TYSdk, Theme, NavigationComponentClass, DevInfo } from 'tuya-panel-kit';
import { Provider, connect, useSelector, ConnectedComponent } from 'react-redux';
import React, { Component } from 'react';
import { Store } from 'redux';
import _ from 'lodash';

import { View } from 'react-native';
import { devInfoChange, deviceChange, responseUpdateDp } from './redux/modules/common';
import theme from './theme';
import { RootStateType } from './interface/Redux';

console.disableYellowBox = true;

const TYEvent = TYSdk.event;
const TYDevice = TYSdk.device;

const RootIntercept = ({ RootComponent }: { RootComponent: ConnectedComponent<any, any> }) => {
  // eslint-disable-next-line no-shadow
  const { devInfo, dpState } = useSelector(({ devInfo, dpState }: RootStateType) => ({
    devInfo,
    dpState,
  }));
  if (_.isEmpty(devInfo) || _.isEmpty(dpState)) {
    return <View />;
  }

  return <RootComponent />;
};

const composeLayout = (store: Store, INavigator: NavigationComponentClass): React.ReactNode => {
  const NavigatorLayoutContainer = connect(_.identity)(INavigator);
  const { dispatch } = store;

  TYEvent.on('deviceDataChange', (data) => {
    switch (data.type) {
      case 'dpData':
        dispatch(responseUpdateDp(data.payload));
        break;
      default:
        dispatch(deviceChange(data.payload));
        break;
    }
  });

  TYEvent.on('networkStateChange', (data) => {
    dispatch(deviceChange(data));
  });

  class PanelComponent extends Component<{ devInfo: DevInfo }> {
    constructor(props: { devInfo: DevInfo }) {
      super(props);

      if (props && props.devInfo && props.devInfo.devId) {
        TYDevice.setDeviceInfo(props.devInfo);
        TYDevice.getDeviceInfo().then((data: DevInfo) => dispatch(devInfoChange(data)));
      } else {
        TYDevice.getDeviceInfo().then((data: DevInfo) => dispatch(devInfoChange(data)));
      }
    }

    render() {
      return (
        <Provider store={store}>
          <Theme theme={theme}>
            <RootIntercept RootComponent={NavigatorLayoutContainer} />
          </Theme>
        </Provider>
      );
    }
  }

  return PanelComponent;
};

export default composeLayout;
