import React, { Component } from 'react';
import { DashBoardPropsType, DashBoardStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import { StyleSheet, View, ViewStyle, TextStyle, Image } from 'react-native';
import { UnitText, TYText, TYSdk } from 'tuya-panel-kit';
import Progress from '@/components/progress';
import Radio from '@/radio';
import { connect } from 'react-redux';
import Dp from '@/dp';
import Images from '@/asset';

class DashBoard extends Component<DashBoardPropsType, DashBoardStateType> {
  constructor(props: DashBoardStateType) {
    super(props);
    this.state = {
      value: this.props.dpState.TempSet,
    };
    console.log(this.state);
  }
  render(): JSX.Element {
    let parameter = {
      TempSet: this.props.dpState.TempSet,
      TempCurrent: this.props.dpState.TempCurrent,
      TempCurrentName: this.props.schema.TempCurrent.name,
      TempCurrentUnit: this.props.schema.TempCurrent.unit,
    };
    console.log(parameter);
    let { value } = this.state;
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.flexAlignCenter}>
          <TYText color="#fff" style={styles.nameText}>
            制冷模式
          </TYText>
        </View>
        <View style={[styles.boxView, styles.flexAlignCenter, styles.flexWrap]}>
          <View
            style={{
              width: Radio.convertX(272),
              height: Radio.convertX(272),
            }}
          >
            <Progress.Space
              foreColor={{ '0%': '#BCD6E9', '100%': '#A7C7DE' }}
              stepValue={1}
              scaleHeight={20}
              scaleNumber={50}
              min={19}
              max={30}
              // endColor="#FF4800"
              style={{
                width: Radio.convertX(272),
                height: Radio.convertX(272),
              }}
              value={parameter.TempSet}
              onValueChange={(v) => {
                this.setState({ value: v }, () => {
                  console.log(this.state);
                });
                TYSdk.device.putDeviceData({ [Dp.tempSet]: v });
              }}
            />
          </View>
          <View
            style={[styles.circleView, styles.boxShodow, styles.flexAlignCenter, styles.flexWrap]}
          >
            <Image source={Images.warm} style={{
              width: Radio.convertX(14),
              height: Radio.convertX(13),
              marginBottom:Radio.convertX(14),
            }} />
            <UnitText
              value={parameter.TempSet}
              size={Radio.convertY(65)}
              unit="celsius"
              unitSize={Radio.convertY(15)}
              valueColor="#333333"
              unitColor="#333333"
            ></UnitText>
            <TYText color="#D8DCE1" style={{ fontSize: Radio.convertY(13) }}>
              {parameter.TempCurrentName}：{parameter.TempCurrent}
              {parameter.TempCurrentUnit}
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
  wrap: ViewStyle;
  flexWrap: ViewStyle;
  flexAlignCenter: ViewStyle;
  boxView: ViewStyle;
  boxShodow: ViewStyle;
  circleView: ViewStyle;
  nameText: TextStyle;
  // numberText: TextStyle;
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
    width: Radio.convertX(105),
    textAlign: 'center',
    color: '#666666',
    marginTop: Radio.convertY(20),
    marginBottom: Radio.convertY(28),
  },
  // numberText: {
  //   fontFamily: 'Cochin',
  // },
});
const mapStateToProps = ({ dpState, devInfo }: RootStateType) => ({
  schema: devInfo.schema as PanelInfo.DpSchema,
  devInfo,
  dpState,
});
export default connect(mapStateToProps)(DashBoard);
