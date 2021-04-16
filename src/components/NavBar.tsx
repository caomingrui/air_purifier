import React, { Component } from 'react';
import { NavBarPropsType, NavBarStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle, TextStyle, Image } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Radio from '@/radio';

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
      <View style={[styles.boxView, styles.flexAlignCenter]}>
        <Image
          style={{
            width: Radio.convertX(40),
            height: Radio.convertY(40),
            borderRadius: Radio.convertX(20),
          }}
          source={{
            uri:
              'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=316865976,2940650346&fm=26&gp=0.jpg',
          }}
        ></Image>
        <TYText>开关</TYText>
      </View>
    );
  }
}

interface StytleType {
  wrap: ViewStyle;
  flexWrap: ViewStyle;
  flexAlignCenter: ViewStyle;
  container: ViewStyle;
  boxView: ViewStyle;
  boxShodow: ViewStyle;
  circleView: ViewStyle;
  nameText: TextStyle;
  numberText: TextStyle;
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
  container: {
    width: Radio.convertX(345),
    height: Radio.convertY(305),
    backgroundColor: 'rgba(255,255,255,0.17)',
    borderRadius: Radio.convertX(20),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginBottom: Radio.convertY(15),
  },
  boxView: {
    position: 'relative',
    flexDirection: 'column',
  },
  circleView: {
    backgroundColor: '#fff',
    width: Radio.convertX(190),
    height: Radio.convertY(190),
    borderRadius: Radio.convertY(95),
    position: 'absolute',
    flexDirection: 'column',
  },
  boxShodow: {
    elevation: 10, //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black', //  阴影颜色
    shadowOffset: { width: 0, height: 0 }, // 阴影偏移
    shadowOpacity: 1, // 阴影不透明度
    shadowRadius: 10, //  圆角
  },
  nameText: {
    fontSize: Radio.convertX(13),
    fontFamily: 'PingFangSC-Regular, PingFang SC',
    width: Radio.convertX(105),
    textAlign: 'center',
    color: '#666666',
    marginTop: Radio.convertY(20),
    marginBottom: Radio.convertY(36),
  },
  numberText: {
    fontFamily: 'Cochin',
  },
});

export default NavBar;
