import { HomePropsType, HomeStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import DashBoard from '@/components/DashBoard';
import Slide from '@/components/Slide';
import NavBar from '@/components/NavBar';
import Switch from '@/components/Switch';
import Madal from '@/components/Madal';
import Radio from '@/radio';
import Images from '@/asset';
import Dp from '@/dp';
import Strings from '@/i18n';
import { cos } from 'react-native-reanimated';

const { mode, power, acWind, dingshi } = Dp;
class HomeLayout extends Component<HomePropsType, HomeStateType> {
  constructor(props: HomePropsType) {
    super(props);
    console.log(props);
    this.state = {
      value: ['1'],
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

  showSwith = () => {
    let test = (v: any) => {
      console.log('hello' + v);
    };
    let defaultVal = this.props.dpState.vt_mode;
    let switchdata = this.props.schema.vt_mode.range.map((item: any, index: any) => {
      let value;
      if (item === defaultVal) {
        value = true;
      } else {
        value = false;
      }
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
      return <Switch key={index} title={title} value={value} test={test} />;
    });
    return switchdata;
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
    const { dataObj } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView />
        <DashBoard />
        <ScrollView />
        <View style={styles.bottomView}>
          <View style={[styles.flexAlignBetween, styles.flexDirectionRow]}>{this.showSwith()}</View>
          <Slide />
          <View style={[styles.flexAlignBetween, styles.flexDirectionRow]}>
            {dataObj.list.map((item: any, index: any) => {
              return <NavBar key={index} parameter={item} />;
            })}
          </View>
        </View>
        <Madal />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

function addList(key: string, state: any) {
  if (state['schema'][key]['range']) {
    return state['schema'][key]['range'].reduce((prev: any, cur: string) => {
      prev.push(cur);
      return prev;
    }, []);
  }
}

const mapStateToProps = function ({ dpState, devInfo }: RootStateType) {
  let states = 1,
    dataObj: any = {};
  //风速
  const winSpeed: any = {};
  const directionWindList = addList('ac_wind', devInfo);
  //空调->模式
  const ModeList = addList('Mode', devInfo);
  //地暖->模式
  const floorHeatingModeList = addList('gh_mode', devInfo);
  //制冷模式
  if (states === 1) {
    dataObj.list = [
      { val: '开关', icon: Images.power, bgicon: Images.circle },
      { val: '模式', icon: Images.mode, bgicon: Images.circle, data: ModeList },
      { val: '风向', icon: Images.wind, bgicon: Images.circle, data: directionWindList },
      { val: '定时', icon: Images.dingshi, bgicon: Images.circle },
    ];
    // 风速
    dataObj.windSpeed = dpState.ac_speed === 'low' ? 0 : dpState.ac_speed === 'mid' ? 50 : 100;
    // 设置温度
    dataObj.setUp = Object.assign({}, addList('TempSet', devInfo), { val: dpState.TempSet });
    // 新风模式
  } else if (states === 2) {
    dataObj.list = [
      { val: '开关', icon: Images.power, bgicon: Images.circle },
      { val: '模式', icon: Images.mode, bgicon: Images.circle, data: ModeList },
      { val: '风向', icon: Images.wind, bgicon: Images.circle, data: directionWindList },
      { val: '定时', icon: Images.dingshi, bgicon: Images.circle },
    ];
    // 风速
    dataObj.windSpeed = dpState.ac_speed === 'low' ? 0 : dpState.ac_speed === 'mid' ? 50 : 100;
    // 设置温度
    dataObj.setUp = Object.assign({}, addList('TempSet', devInfo), { val: dpState.TempSet });
  }
  console.log(dataObj);
  return {
    schema: devInfo.schema as PanelInfo.DpSchema,
    devInfo,
    dpState,
    directionWindList,
    floorHeatingModeList,
    dataObj,
  };
};
export default connect(mapStateToProps)(HomeLayout);
