import { HomePropsType, HomeStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TYText, Modal, BrickButton, Divider } from 'tuya-panel-kit';
import DashBoard from '@/components/DashBoard';
import Slide from '@/components/Slide';
import NavBar from '@/components/NavBar';
import Switch from '@/components/Switch';
import Radio from '@/radio';

class HomeLayout extends Component<HomePropsType, HomeStateType> {
  constructor(props: HomePropsType) {
    super(props);
    this.state = {
      value: ['1'],
      visible: true,
    };
  }

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleConfirm = (value: any) => {
    this.setState({ visible: false, value });
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
          <View style={[styles.flexAlignBetween, styles.flexDirectionRow]}>
            <Switch />
            <Switch />
            <Switch />
          </View>
          <Slide />
          <View style={[styles.flexAlignBetween, styles.flexDirectionRow]}>
            <NavBar></NavBar>
            <NavBar></NavBar>
            <NavBar></NavBar>
            <NavBar></NavBar>
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
              <View
                style={[
                  { flex: 1 },
                  styles.flexAlignCenter,
                ]}
              >
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
              <TouchableOpacity onPress={
                ()=>{
                  this.setState({
                    visible:false
                  })
                }
              }>
                <TYText
                  color="#9FC4DF"
                  align="center"
                  text="知道了"
                  style={{ fontSize: Radio.convertX(15), textAlign: 'center',paddingBottom:Radio.convertX(10),paddingTop:Radio.convertX(10) }}
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
    paddingTop: Radio.convertX(30),
    paddingBottom: Radio.convertX(30),
  },
});

const mapStateToProps = ({ dpState, devInfo }: RootStateType) => ({
  schema: devInfo.schema as PanelInfo.DpSchema,
  devInfo,
  dpState,
});
export default connect(mapStateToProps)(HomeLayout);
