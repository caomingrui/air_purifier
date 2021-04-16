import React, { Component } from 'react';
import { SwitchPropsType, SwitchStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SwitchButton, TYText } from 'tuya-panel-kit';
import Radio from '@/radio';

class Switch extends Component<SwitchPropsType, SwitchStateType> {
  constructor(props: SwitchStateType) {
    super(props);
    this.state = {
      value: true,
    };
  }
  render(): JSX.Element {
    return (
      <View style={[styles.boxView,styles.flexAlignCenter]}>
        <TYText>自动</TYText>
        <SwitchButton
          value={this.state.value}
          onValueChange={(value) => {
            this.setState({ value });
          }}
        />
      </View>
    );
  }
}

interface StytleType {
  flexWrap: ViewStyle;
  flexAlignCenter: ViewStyle;
  boxView: ViewStyle;
}

const styles = StyleSheet.create<StytleType>({
  flexWrap: { flexWrap: 'wrap' },
  flexAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    position: 'relative',
    flexDirection: 'row',
    marginBottom: Radio.convertX(30),
  },
});

export default Switch;
