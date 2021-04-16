import { HomePropsType, HomeStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { TYText } from 'tuya-panel-kit';
import DashBoard from '@/components/DashBoard';
import Slide from '@/components/Slide';
import NavBar from '@/components/NavBar';
import Radio from '@/radio';

class HomeLayout extends Component<HomePropsType, HomeStateType> {
  constructor(props: HomePropsType) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
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
          <Slide />
          <ScrollView />
          <View style={styles.flexAlignBetween}>
            <NavBar />
            <NavBar />
            <NavBar />
            <NavBar />
          </View>
        </View>
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
  flexAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexAlignBetween:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F5',
  },
  bottomView: {
    height: Radio.convertY(200),
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
