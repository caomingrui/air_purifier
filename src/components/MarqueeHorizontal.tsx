import React, { Component } from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import Radio from '@/radio';
import { number } from 'prop-types';

const styles = {
  bgContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  textMeasuringViewStyle: {
    flexDirection: 'row',
    opacity: 0,
  },
  textMeasuringTextStyle: {
    fontSize: 16,
  },
  textStyle: {
    fontSize: 16,
    color: '#000000',
  },
};

interface TextInfo {
  label: string;
  value: string;
}

interface MarqueePropsType {
  textList: TextInfo[];
  speed: number;
  width: number;
  height: number;
  separator: number;
  duration: number;
  direction: string;
  reverse: boolean;
  bgContainerStyle: any;
  textStyle: any;
  onTextClick: (text: TextInfo) => void;
}
interface MarqueeStateType {
  animation: any;
  textList: TextInfo[];
  textWidth: number;
  viewWidth: number;
}

const { convertX: cx, convertY: cy, width, height } = Radio;
export default class MarqueeHorizontal extends Component<MarqueePropsType, MarqueeStateType> {
  static defaultProps: MarqueePropsType = {
    textList: [],
    speed: 60,
    width: 375,
    height: 50,
    separator: 30,
    direction: 'left',
    reverse: false,
    bgContainerStyle: {
      backgroundColor: 'transparent',
      marginTop: -cx(5),
    },
    textStyle: { fontSize: cx(14), color: '#495054' },
    duration: 10000,
    onTextClick: () => {},
  };

  constructor(props: MarqueePropsType) {
    super(props);
    this.state = {
      animation: null,
      textList: [],
      textWidth: 0,
      viewWidth: 0,
    };
  }

  animatedTransformX: Animated.Value | any = undefined;

  componentWillMount() {
    this.setState({
      textList: this.props.textList || [],
    });
    this.animatedTransformX = new Animated.Value(0);
  }

  componentDidUpdate() {
    const { textWidth, viewWidth } = this.state;
    const { duration, speed, width, direction } = this.props;
    let mDuration = duration;
    if (speed && speed > 0) {
      mDuration = ((width + textWidth) / speed) * 1000;
    }
    if (!this.state.animation && textWidth && viewWidth) {
      this.animatedTransformX.setValue(
        direction === 'left' ? width : direction === 'right' ? -textWidth : width
      );
      this.setState(
        {
          animation: Animated.timing(this.animatedTransformX, {
            toValue: direction === 'left' ? -textWidth : direction === 'right' ? width : -textWidth,
            duration: mDuration,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        },
        () => {
          this.state.animation &&
            this.state.animation.start(() => {
              this.setState({ animation: null });
            });
        }
      );
    }
  }

  componentWillReceiveProps(nextProps: MarqueePropsType) {
    const newText = nextProps.textList || [];
    const oldText = this.props.textList || [];
    if (newText !== oldText) {
      this.state.animation && this.state.animation.stop();
      this.setState({
        textList: newText,
        animation: null,
      });
    }
  }

  componentWillUnmount() {
    this.state.animation && this.state.animation.stop();
  }

  textOnLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    const { textList, separator } = this.props;
    this.setState({
      textWidth: width + (textList.length - 1) * separator,
    });
  };

  viewOnLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    this.setState({
      viewWidth: width,
    });
  };

  textView = (list: TextInfo[]) => {
    const { textStyle, onTextClick, reverse, separator } = this.props;
    const itemView = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (reverse) {
        item.value = item.value.split('').reverse().join('');
      }
      itemView.push(
        <TouchableOpacity
          key={`${i}`}
          activeOpacity={0.9}
          onPress={() => {
            onTextClick(item);
          }}
        >
          <View style={{ flexDirection: 'row', marginRight: i < list.length - 1 ? separator : 0 }}>
            <Text
              style={{
                ...styles.textStyle,
                ...textStyle,
              }}
              allowFontScaling={false}
              numberOfLines={1}
            >
              {item.value}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          width: this.state.textWidth,
          transform: [{ translateX: this.animatedTransformX }],
        }}
        onLayout={(event: any) => this.viewOnLayout(event)}
      >
        {itemView}
      </Animated.View>
    );
  };

  textLengthView(list: TextInfo[]) {
    const { textStyle } = this.props;
    let text = '';
    for (let i = 0; i < list.length; i++) {
      text += list[i].value;
    }
    return (
      <View style={{ ...styles.textMeasuringViewStyle, width: list.length * 1024 }}>
        <Text
          style={{
            ...styles.textMeasuringTextStyle,
            ...textStyle,
          }}
          allowFontScaling={false}
          onLayout={(event) => this.textOnLayout(event)}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>
    );
  }

  render() {
    const { width, height, bgContainerStyle } = this.props;
    const { textList } = this.state;
    const style = {
      ...styles.bgContainerStyle,
      width,
      height,
      ...bgContainerStyle,
      opacity: this.state.animation ? 1 : 0,
    };
    return (
      <View style={style}>
        {/* <View style={style} opacity={this.state.animation ? 1 : 0}>*/}
        {this.textView(textList)}
        {this.textLengthView(textList)}
      </View>
    );
  }
}
