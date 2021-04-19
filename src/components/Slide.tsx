import React, { Component } from 'react';
import { SlidePropsType, SlideStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import { StyleSheet, View, ViewStyle, TextStyle, Image } from 'react-native';
import { Slider, TYText } from 'tuya-panel-kit';
import Radio from '@/radio';
import { connect } from 'react-redux';
import Images from '@/asset';

class Slide extends Component<SlidePropsType, SlideStateType> {
  constructor(props: SlideStateType) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  _handleComplete = (value: any) => {
    this.setState({ value: Math.round(value) });
  };
  render(): JSX.Element {
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
            value={parameter.range.mid.value}
            maximumTrackTintColor="#9FC4DF"
            minimumTrackTintColor="#ECF3F9"
            onSlidingComplete={this._handleComplete}
            // thumbTouchSize={{ width: Radio.convertX(30), height: Radio.convertX(30) }}
            // thumbTintColor='rgba(0,0,0,0)'
            renderThumb={() => (
              <View style={[styles.sliderView,styles.flexAlignCenter]}>
                <Image
                  resizeMode='cover'
                  // style={{ width: Radio.convertX(17), height: Radio.convertX(33) }}
                  source={Images.slide}
                ></Image>
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
  flexWrap: ViewStyle;
  flexAlignCenter: ViewStyle;
  boxView: ViewStyle;
  boxShodow: ViewStyle;
  sliderView: ViewStyle;
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
  boxShodow: {
    elevation: 10, //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black', //  阴影颜色
    shadowOffset: { width: 0, height: 0 }, // 阴影偏移
    shadowOpacity: 1, // 阴影不透明度
    shadowRadius: 10, //  圆角
  },
  sliderView: {
    width: Radio.convertX(17),
    height: Radio.convertX(33),
  },
});
const mapStateToProps = ({ dpState, devInfo }: RootStateType) => ({
  schema: devInfo.schema as PanelInfo.DpSchema,
  devInfo,
  dpState,
});
export default connect(mapStateToProps)(Slide);
