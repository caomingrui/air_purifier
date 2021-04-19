import { HomePropsType, HomeStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TYText, Modal, Divider } from 'tuya-panel-kit';
import DashBoard from '@/components/DashBoard';
import Slide from '@/components/Slide';
import NavBar from '@/components/NavBar';
import Switch from '@/components/Switch';
import Radio from '@/radio';
import Images from '@/asset';
import Dp from '@/dp';
import Strings from '@/i18n';
import { cos } from 'react-native-reanimated';

const { mode, power, acWind, dingshi } = Dp;
class HomeLayout extends Component<HomePropsType, HomeStateType> {
  constructor(props: HomePropsType) {
    super(props);
    console.log(props)
    this.state = {
      value: ['1'],
      visible: true,
    };
  }

  componentDidMount = () => {
    const localizedText = Strings.getLang('hello');
console.log(localizedText);
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleConfirm = (value: any) => {
    this.setState({ visible: false, value });
  };

  test = () => {
    console.log()
  }

  showSwith = () => {
    let defaultVal = this.props.dpState.vt_mode;
    let switchdata = this.props.schema.vt_mode.range.map((item: any, index: any) => {
      let value;
      if(item===defaultVal){
        value=true;
      }else{
        value=false;
      }
      // console.log(value)
      let title =
        item === 'Auto'
          ? '自动'
          : item === 'Exchange'
          ? '热交换'
          : item === 'Bypass'
          ? '旁通'
          : item === 'Standard'
          ? '普通'
          : '';
      return <Switch key={index} title={title} value={value} />;
    });
    return switchdata;
  };

  showBottom = (k: string) => {
    let text;
    let img;
    if(k===dingshi){
      text = Strings.getLang(`dsc_${k}`, 'name');
    }else{
      text = Strings.getDpLang(`${k}`);
    }
    if(k===mode){
      img=Images.mode
    }else if(k===power){
      img=Images.power
    }else if(k===acWind){
      img=Images.wind
    }else if(k===dingshi){
      img=Images.dingshi
    }
    let parameter: { [key: string]: any } = {
      img,
      text,
    };
    if (k === mode) {
      parameter.popup = {
        initValue: this.props.dpState.Mode,
        range: this.props.schema.Mode.range.map(function (item: any, index: any) {
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
        }),
      };
    } else if (k === acWind) {
      parameter.popup = {
        initValue: this.props.dpState.ac_wind,
        range: this.props.schema.ac_wind.range.map(function (item: any, index: any) {
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
        }),
      };
    }
    return <NavBar key={k} parameter={parameter} />;
  };

  render(): JSX.Element {
    const dataSource = [
      {
        key: '1',
        title: '1',
        value: '1',
      },
      {
        key: '2',
        title: '2',
        value: '2',
      },
    ];
    const navdata = ['Power', 'Mode', 'ac_wind', 'dingshi'];
    return (
      <View style={styles.container}>
        {/* <Fault /> */}
        {/* <TouchableOpacity
          onPress={() => {
            // TYSdk.mobile.jumpTo(`tuyasmart://createScene?devid=${this.props.id}`);
            this.props.navigation.push('hello', { asdfa: '11' });
            // this.props.navigation.push('hello', { kda: 'hello' });
          }}
        >
          <TYText color="#fff">123123</TYText>
        </TouchableOpacity> */}
        <DashBoard />
        <ScrollView />
        <View style={styles.bottomView}>
          <View style={[styles.flexAlignBetween, styles.flexDirectionRow]}>{this.showSwith()}</View>
          <Slide />
          <View style={[styles.flexAlignBetween, styles.flexDirectionRow]}>
            {navdata.map((k) => this.showBottom(k))}
          </View>
        </View>
        <Modal visible={this.state.visible} alignContainer="center">
          <View style={[styles.flexAlignCenter, styles.flexDirectionRow]}>
            <View style={[styles.faultModal]}>
              <View style={[styles.faultModalTitle, styles.flexAlignCenter]}>
                <TYText
                  color="#999999"
                  align="center"
                  text="设备冲突"
                  style={{ fontSize: Radio.convertX(14), textAlign: 'center' }}
                />
              </View>
              <Divider color="#D8D8D8" width={Radio.convertX(275)} />
              <View style={[{ flex: 1 }, styles.flexAlignCenter]}>
                <TYText
                  color="#1A1A1A"
                  align="center"
                  text="与地暖模式发生冲突！"
                  style={{ fontSize: Radio.convertX(17), textAlign: 'center' }}
                />
                <TYText
                  color="#999999"
                  align="center"
                  text="故障码：0001"
                  style={{ fontSize: Radio.convertX(14), textAlign: 'center' }}
                />
              </View>
              <Divider color="#D8D8D8" width={Radio.convertX(275)} />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    visible: false,
                  });
                }}
              >
                <TYText
                  color="#9FC4DF"
                  align="center"
                  text="知道了"
                  style={{
                    fontSize: Radio.convertX(15),
                    textAlign: 'center',
                    paddingBottom: Radio.convertX(10),
                    paddingTop: Radio.convertX(10),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faultModal: {
    width: Radio.convertX(275),
    height: Radio.convertX(205),
    backgroundColor: '#FFFFFF',
  },
  faultModalTitle: {
    paddingTop: Radio.convertX(10),
    paddingBottom: Radio.convertX(10),
  },
  wrap: {
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
  },
  flexWrap: { flexWrap: 'wrap' },
  flexNoWrap: { flexWrap: 'nowrap' },
  flexDirectionRow: { flexDirection: 'row' },
  flexDirectionCol: { flexDirection: 'column' },
  flexAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexAlignBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F5',
  },
  bottomView: {
    backgroundColor: '#FFFFFF',
    paddingLeft: Radio.convertX(30),
    paddingRight: Radio.convertX(30),
    paddingTop: Radio.convertX(20),
    paddingBottom: Radio.convertX(28),
  },
});

const mapStateToProps = ({ dpState, devInfo }: RootStateType) => ({
  schema: devInfo.schema as PanelInfo.DpSchema,
  devInfo,
  dpState,
});
export default connect(mapStateToProps)(HomeLayout);
