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
    const {title,value} = this.props
    return (
      <View style={[styles.boxView,styles.flexAlignCenter]}>
        <TYText>{title}</TYText>
        <SwitchButton
          value={this.state.value}
          onValueChange={(value) => {
            this.setState({ value });
          }}
          tintColor="#E0E0E0"
          onTintColor="#9FC4DF"
          // thumbTintColor="red"
          // size={{width:Radio.convertX(38),height:Radio.convertX(13)}}
          size={{ height: 13,width:38 }}
    theme={{ margin: 0 }}
    style={{ marginRight: 0,borderRadius:0 }}
          thumbStyle={{borderRadius:0,width:Radio.convertX(19),height:Radio.convertX(19)}}
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
