import React, { Component } from 'react';
import { NavBarPropsType, NavBarStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { TYText, Popup } from 'tuya-panel-kit';
import Radio from '@/radio';
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
    console.log(parameter);
    return (
      <TouchableOpacity
        onPress={() => {
          if (parameter.data && parameter.val === '风向') {
            let dataSource = parameter.data.map((item: any, index: any) => {
              let title =
                item === '0xff'
                  ? '不支持'
                  : item === '0x01'
                  ? '摆动'
                  : item === '0x02'
                  ? '停止1'
                  : item === '0x03'
                  ? '停止2'
                  : item === '0x04'
                  ? '停止3'
                  : item === '0x05'
                  ? '停止4'
                  : item === '0x06'
                  ? '停止5'
                  : item === '0x07'
                  ? '停止6'
                  : item === '0x08'
                  ? '停止7'
                  : '';
              return {
                key: `${index}`,
                title: title,
                value: item,
              };
            });
            Popup.list({
              type: 'radio',
              dataSource: dataSource,
              title: parameter.val,
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
          } else if (parameter.data && parameter.val === '模式') {
            let dataSource = parameter.data.map((item: any, index: any) => {
              let title =
                item === 'cold'
                  ? '制冷'
                  : item === 'hot'
                  ? '制热'
                  : item === 'wet'
                  ? '除湿'
                  : item === 'wind'
                  ? '送风'
                  : '';
              return {
                key: `${index}`,
                title: title,
                value: item,
              };
            });
            Popup.list({
              type: 'radio',
              dataSource: dataSource,
              title: parameter.val,
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
          <ImageBackground
            source={parameter.bgicon}
            style={[
              styles.flexAlignCenter,
              {
                width: Radio.convertX(50),
                height: Radio.convertX(50),
                borderRadius: Radio.convertX(25),
                marginBottom: Radio.convertX(6),
              },
            ]}
          >
            <Image
              style={{
                width: Radio.convertX(25),
                height: Radio.convertX(25),
              }}
              source={parameter.icon}
              resizeMode="contain"
            />
          </ImageBackground>
          <TYText text={parameter.val} />
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
