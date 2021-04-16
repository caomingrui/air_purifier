import React, { Component } from 'react';
import { DashBoardPropsType, DashBoardStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { UnitText, TYText, Progress } from 'tuya-panel-kit';
import Radio from '@/radio';

class DashBoard extends Component<DashBoardPropsType, DashBoardStateType> {
  constructor(props: DashBoardStateType) {
    super(props);
    this.state = {
      value: 90,
    };
  }
  render(): JSX.Element {
    return (
      <View>
        <View style={styles.flexAlignCenter}>
          <TYText color="#fff" style={styles.nameText}>
            制冷模式
          </TYText>
        </View>
        <View style={[styles.boxView, styles.flexAlignCenter, styles.flexWrap]}>
          <Progress.Space
            foreColor={{ '0%': '#BCD6E9', '100%': '#A7C7DE' }}
            stepValue={20}
            scaleHeight={20}
            scaleNumber={50}
            style={{ width: Radio.convertX(272), height: Radio.convertX(272) }}
            value={this.state.value}
            onValueChange={(v) => {
              this.setState({ value: v });
            }}
          />
          <View
            style={[styles.circleView, styles.boxShodow, styles.flexAlignCenter, styles.flexWrap]}
          >
            <UnitText
              value="26"
              size={Radio.convertY(65)}
              unit="celsius"
              unitSize={Radio.convertY(15)}
              valueColor="#333333"
              unitColor="#333333"
              style={styles.numberText}
            ></UnitText>
            <TYText color="#D8DCE1" style={{ fontSize: Radio.convertY(13) }}>
              当前温度：34.1℃
            </TYText>
            <TYText color="#D8DCE1" style={{ fontSize: Radio.convertY(13) }}>
              当前湿度：65%
            </TYText>
          </View>
        </View>
      </View>
    );
  }
}

interface StytleType {
  flexWrap: ViewStyle;
  flexAlignCenter: ViewStyle;
  boxView: ViewStyle;
  boxShodow: ViewStyle;
  circleView: ViewStyle;
  nameText: TextStyle;
  numberText: TextStyle;
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
  },
  circleView: {
    backgroundColor: '#fff',
    width: Radio.convertX(190),
    height: Radio.convertX(190),
    borderRadius: Radio.convertX(95),
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

export default DashBoard;
