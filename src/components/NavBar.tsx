import React, { Component } from 'react';
import { NavBarPropsType, NavBarStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle, Image, TouchableOpacity } from 'react-native';
import { TYText, Popup } from 'tuya-panel-kit';
import Radio from '@/radio';
// import Popup from '@/components/popup';

class NavBar extends Component<NavBarPropsType, NavBarStateType> {
  constructor(props: NavBarPropsType) {
    super(props);
    this.state = {
      value: 24,
    };
  }
  _handleComplete = (value: any) => {
    this.setState({ value: Math.round(value) });
  };

  render(): JSX.Element {
    const { parameter } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (parameter.popup) {
            Popup.list({
              type: 'radio',
              dataSource: parameter.popup.range,
              title: parameter.text,
              cancelText: '取消',
              value: this.state.listValue,
              footerType: 'singleCancel',
              selectedIcon: null,
              iconTintColor: '#fff',
              onMaskPress: ({ close }: any) => {
                close();
              },
              onSelect: (value: any, { close }: any) => {
                this.setState({ listValue: value });
                close();
              },
            });
          }
        }}
      >
        <View style={[styles.boxView, styles.flexAlignCenter]}>
          <View style={[styles.flexAlignCenter,styles.wrap,styles.boxShodow,{
                width: Radio.convertX(50),
                height: Radio.convertX(50),
                borderRadius: Radio.convertX(25),
                marginBottom: Radio.convertX(6),
                backgroundColor:'#FFFFFF'
              }]}>
            <Image
              style={{
                width: Radio.convertX(25),
                height: Radio.convertX(25),
              }}
              source={parameter.img}
              resizeMode="contain"
            />
          </View>
          <TYText text={parameter.text} />
        </View>
      </TouchableOpacity>
    );
  }
}

interface StytleType {
  wrap: ViewStyle;
  flexWrap: ViewStyle;
  flexAlignCenter: ViewStyle;
  boxView: ViewStyle;
  boxShodow: ViewStyle;
}

const styles = StyleSheet.create<StytleType>({
  wrap: {
    borderWidth:1,
    borderColor:'red',
    borderStyle: 'solid',
  },
  flexWrap: { flexWrap: 'wrap' },
  flexAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxView: {
    position: 'relative',
    flexDirection: 'column',
  },
  boxShodow: {
    elevation: 2, //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black', //  阴影颜色
    shadowOffset: { width: 0, height: 0 }, // 阴影偏移
    shadowOpacity: 1, // 阴影不透明度
    shadowRadius: 2, //  圆角
  },
});

export default NavBar;
