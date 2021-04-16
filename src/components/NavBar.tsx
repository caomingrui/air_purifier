import React, { Component } from 'react';
import { NavBarPropsType, NavBarStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle, Image, TouchableOpacity } from 'react-native';
import { TYText, Popup } from 'tuya-panel-kit';
import Radio from '@/radio';
// import Popup from '@/components/popup';

class NavBar extends Component<NavBarPropsType, NavBarStateType> {
  constructor(props: NavBarStateType) {
    super(props);
    this.state = {
      value: 24,
    };
  }
  _handleComplete = (value: any) => {
    this.setState({ value: Math.round(value) });
  };

  render(): JSX.Element {
    return (
      <TouchableOpacity onPress={()=>{
        Popup.list({
          type: "radio",
          dataSource: [
            {
              key: "1",
              title: "1",
              value: "1",
            },
            {
              key: "2",
              title: "2",
              value: "2",
            },
          ],
          title: "模式",
          cancelText: "取消",
          value: this.state.listValue,
          footerType: 'singleCancel',
          selectedIcon: null,
          iconTintColor: '#fff',
          onMaskPress: ({ close }:any) => {
            close();
          },
          onSelect:(value:any, { close }:any) => {
            this.setState({ listValue: value });
            close();
          },
        });
      }}>
        <View style={[styles.boxView, styles.flexAlignCenter]}>
          <Image
            style={{
              width: Radio.convertX(40),
              height: Radio.convertX(40),
              borderRadius: Radio.convertX(20),
            }}
            source={{
              uri:
                'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=316865976,2940650346&fm=26&gp=0.jpg',
            }}
          ></Image>
          <TYText>开关</TYText>
        </View>
      </TouchableOpacity>
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
    flexDirection: 'column',
  },
});

export default NavBar;
