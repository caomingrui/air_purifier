import React, { Component } from 'react';
import { SwitchPropsType, SwitchStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import SwitchButton from '@/components/switch-button';
import Radio from '@/radio';

class Switch extends Component<SwitchPropsType, SwitchStateType> {
  constructor(props: SwitchStateType) {
    super(props);
    this.state = {
      value: false,
    };
  }
  render(): JSX.Element {
    const { title, value, test } = this.props;
    return (
        <View style={[styles.boxView, styles.flexAlignCenter]}>
        <TYText>{title}</TYText>
        <SwitchButton
          value={this.state.value}
          onValueChange={(value) => {
            console.log(value)
            this.setState({ value:value });
            test(title)
          }}
          tintColor="#E0E0E0"
          onTintColor="#9FC4DF"
          // thumbTintColor="red"
          size={{width:Radio.convertX(38),height:Radio.convertX(13),margin:0}}
          theme={{ margin: 0,thumbSize:Radio.convertX(19) }}
          style={{ borderRadius: 0 }}
          thumbStyle={{ borderRadius: 0, width: Radio.convertX(19), height: Radio.convertX(19) }}
        />
      </View>
    );
  }
}

interface StytleType {
  flexWrap: ViewStyle;
  flexAlignCenter: ViewStyle;
  boxView: ViewStyle;
  wrap: ViewStyle;
}

const styles = StyleSheet.create<StytleType>({
  wrap: {
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
  },
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
