import Images from '@/asset';
import RatioUtils from '@/radio';
import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { TYText } from 'tuya-panel-kit';
import { PanelInfo } from '@/interface/PanelInfo';
import Strings from '@/i18n';
import MarqueeHorizontal from './MarqueeHorizontal';

interface FaultPropsType {
  schema: { [k: string]: any };
  fault: number;
}
interface FaultStateType {
  visiable: boolean;
  showMarquee: boolean;
}

const { convertX: cx } = RatioUtils;
const FaultCode = 'fault';

class FaultView extends Component<FaultPropsType, FaultStateType> {
  static defaultProps: FaultPropsType = {
    schema: {},
    fault: 0,
  };

  containWidth = 0;

  textWidth: number | undefined = undefined;

  constructor(props: FaultPropsType) {
    super(props);
    this.state = {
      visiable: false,
      showMarquee: false,
    };
  }

  componentDidMount() {
    if (this.props.fault !== 0) {
      this.setState({
        visiable: true,
      });
    }
  }

  componentWillReceiveProps(nextProps: FaultPropsType) {
    if (nextProps.fault === 0 || !nextProps.fault) {
      this.resetMarquee();
      this.setState({ visiable: false, showMarquee: false });
    } else {
      this.resetMarquee();
      this.setState({ visiable: true, showMarquee: false });
    }
  }

  _closevisiable = () => {
    this.setState({
      visiable: false,
      showMarquee: false,
    });
  };

  showMarquee = () => {
    if (this.containWidth && this.textWidth) {
      Math.abs(this.textWidth - this.containWidth) <= 1 && this.setState({ showMarquee: true });
    }
  };

  resetMarquee = () => {
    this.textWidth = undefined;
  };

  render() {
    // console.log('s=s=s=', this.props.fault);
    // if (this.state.visiable) {
    const { schema, fault } = this.props;
    let error: string | any = '';
    if (this.state.visiable) {
      //   error = Strings.getLang(`dp_faultcode_${faultcode}`,'');
      // } else {
      error = Strings.getFaultString(FaultCode, fault, schema);
      // }
      return (
        <ImageBackground resizeMode="stretch" source={Images.tipbg} style={styles.faultView}>
          <Image resizeMode="stretch" style={styles.noticeImg} source={Images.notice} />
          {this.state.showMarquee ? (
            <MarqueeHorizontal
              textList={[
                {
                  label: '1',
                  value: error,
                },
              ]}
              onTextClick={(item: any) => {}}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                width: cx(260),
                marginTop: -cx(5),
              }}
              onLayout={(e) => {
                const { width } = e.nativeEvent.layout;
                this.containWidth = width;
                this.showMarquee();
              }}
            >
              <TYText
                numberOfLines={1}
                ellipsizeMode={RatioUtils.isIos ? 'clip' : 'tail'}
                style={styles.faultText}
                text={error}
                onLayout={(e) => {
                  const { width } = e.nativeEvent.layout;
                  this.textWidth = width;
                  this.showMarquee();
                }}
              />
              <View style={{ flex: 1 }} />
            </View>
          )}

          <TouchableOpacity onPress={() => this._closevisiable()}>
            <Image resizeMode="stretch" style={styles.closeImg} source={Images.close} />
          </TouchableOpacity>
        </ImageBackground>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  faultView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    top: RatioUtils.topBarHeight,
    width: cx(353),
    height: cx(80),
    borderRadius: cx(30),
  },
  noticeImg: {
    marginLeft: cx(18),
    marginRight: cx(5),
    marginTop: -cx(5),
  },
  faultText: {
    backgroundColor: 'transparent',
    fontSize: cx(14),
    color: '#495054',
    // marginTop: -cx(5)
  },
  closeImg: {
    marginRight: cx(15),
    marginLeft: cx(5),
  },
});

const mapStateToProps = ({
  dpState,
  devInfo,
}: {
  dpState: PanelInfo.DpState;
  devInfo: PanelInfo.DevInfo;
}) => ({
  fault: dpState[FaultCode],
  schema: devInfo.schema || {},
});

export default connect(mapStateToProps)(FaultView);
