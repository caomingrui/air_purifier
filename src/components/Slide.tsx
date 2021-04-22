import React, { Component } from 'react';
import { SlidePropsType, SlideStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import { StyleSheet, View, ViewStyle, TextStyle, Image, ImageBackground } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import Slider from '@/components/slider';
import Radio from '@/radio';
import { connect } from 'react-redux';
import Images from '@/asset';
import Dp from '@/dp';

class Slide extends Component<SlidePropsType, SlideStateType> {
  constructor(props: SlideStateType) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  _handleComplete = (value: any) => {
    let valToCode = value === 0 ? 'low' : value === 50 ? 'mid' : value === 100 ? 'high' : '';
    this.setState({ value: Math.round(value) }, () => {
      TYSdk.device.putDeviceData({ [Dp.acSpeed]: valToCode });
    });
  };
  componentWillReceiveProps(nextProps: any) {
    //componentWillReceiveProps方法中第一个参数代表即将传入的新的Props
    console.log(nextProps);
    if (this.props.sharecard_show !== nextProps.sharecard_show) {
      //在这里我们仍可以通过this.props来获取旧的外部状态
      //通过新旧状态的对比，来决定是否进行其他方法
      if (nextProps.sharecard_show) {
        // this.handleGetCard();
      }
    }
  }

  render(): JSX.Element {
    let defaultVal =
      this.props.dpState.ac_speed === 'low'
        ? 0
        : this.props.dpState.ac_speed === 'mid'
        ? 50
        : this.props.dpState.ac_speed === 'high'
        ? 100
        : 0;
    let range: { [key: string]: any } = {};
    this.props.schema.ac_speed.range.map(function (item: any) {
      if (item === 'low') {
        range[item] = {
          title: item,
          value: 0,
        };
      } else if (item === 'mid') {
        range[item] = {
          title: item,
          value: 50,
        };
      } else if (item === 'high') {
        range[item] = {
          title: item,
          value: 100,
        };
      }
    });
    let parameter = {
      lowimg: Images[`speed1`],
      highimg: Images[`speed`],
      defaultVal,
      range,
    };
    return (
      <View>
        <View style={[styles.boxView, styles.flexAlignCenter]}>
          <Image
            resizeMode="contain"
            style={{ width: Radio.convertX(30), height: Radio.convertX(30) }}
            source={parameter.lowimg}
          ></Image>
          <Slider.Horizontal
            style={{
              width: Radio.convertX(240),
              marginLeft: Radio.convertX(10),
              marginRight: Radio.convertX(10),
            }}
            maximumValue={parameter.range.high.value}
            minimumValue={parameter.range.low.value}
            stepValue={50}
            value={parameter.defaultVal}
            maximumTrackTintColor="#9FC4DF"
            minimumTrackTintColor="#ECF3F9"
            onSlidingComplete={this._handleComplete}
            thumbStyle={{
              width: Radio.convertX(17),
              height: Radio.convertX(33),
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.0)',
              borderStyle: 'solid',
              shadowColor: 'rgba(0,0,0,0.1)',
              borderRadius: Radio.convertX(17),
              shadowOffset: {
                width: Radio.convertX(17),
                height: Radio.convertX(17),
              },
              shadowOpacity: 1,
              // shadowRadius: Radio.convertX(33),
              elevation: Radio.convertX(17),
            }}
            // thumbTouchSize={{ width: Radio.convertX(30), height: Radio.convertX(30) }}
            thumbTintColor="transparent"
            renderThumb={() => (
              <View style={[styles.flexAlignCenter]}>
                <ImageBackground
                  resizeMode="cover"
                  style={[{ width: Radio.convertX(17), height: Radio.convertX(33) }]}
                  source={Images.slide}
                ></ImageBackground>
              </View>
            )}
          />
          <Image
            resizeMode="contain"
            style={{ width: Radio.convertX(30), height: Radio.convertX(30) }}
            source={parameter.highimg}
          ></Image>
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
  sliderView: ViewStyle;
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
  boxShodow: {
    elevation: 20, //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black', //  阴影颜色
    shadowOffset: { width: 6, height: 6 }, // 阴影偏移
    shadowOpacity: 1, // 阴影不透明度
    shadowRadius: 10, //  圆角
  },
  sliderView: {
    // width: Radio.convertX(17),
    // height: Radio.convertX(33),
  },
});
const mapStateToProps = ({ dpState, devInfo }: RootStateType) => ({
  schema: devInfo.schema as PanelInfo.DpSchema,
  devInfo,
  dpState,
});
export default connect(mapStateToProps)(Slide);
