import React, { Component } from 'react';
import { SlidePropsType, SlideStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle, TextStyle,Image } from 'react-native';
import { Slider} from 'tuya-panel-kit';
import Radio from '@/radio';

class Slide extends Component<SlidePropsType, SlideStateType> {
  constructor(props: SlideStateType) {
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
      <View>
        <View style={[styles.boxView,styles.flexAlignCenter]}>
          <Image style={{width:Radio.convertX(40),height:Radio.convertX(40),borderRadius:Radio.convertX(20)}} source={{uri:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=316865976,2940650346&fm=26&gp=0.jpg"}}></Image>
          <Slider.Horizontal
            style={{ width: Radio.convertX(240),marginLeft:Radio.convertX(10),marginRight:Radio.convertX(10) }}
            maximumValue={100}
            minimumValue={0}
            value={this.state.value}
            maximumTrackTintColor="rgba(0, 0, 0, 0.1)"
            minimumTrackTintColor="#4397D7"
            onSlidingComplete={this._handleComplete}
          />
          <Image style={{width:Radio.convertX(40),height:Radio.convertX(40),borderRadius:Radio.convertX(20)}} source={{uri:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=316865976,2940650346&fm=26&gp=0.jpg"}}></Image>
        </View>
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

export default Slide;
