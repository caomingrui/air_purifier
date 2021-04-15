import { HomePropsType, HomeStateType } from '@/containers/interface';
import { PanelInfo } from '@/interface/PanelInfo';
import { RootStateType } from '@/interface/Redux';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { TYText } from 'tuya-panel-kit';

class HomeLayout extends Component<HomePropsType, HomeStateType> {
  constructor(props: HomePropsType) {
    super(props);
    this.state = {};
  }

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        {/* <Fault /> */}
        <TouchableOpacity
          onPress={() => {
            // TYSdk.mobile.jumpTo(`tuyasmart://createScene?devid=${this.props.id}`);
            this.props.navigation.push('hello', { asdfa: '11' });
            // this.props.navigation.push('hello', { kda: 'hello' });
          }}
        >
          <TYText color="#fff">123123</TYText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});

const mapStateToProps = ({ dpState, devInfo }: RootStateType) => ({
  schema: devInfo.schema as PanelInfo.DpSchema,
  devInfo,
  dpState,
});
export default connect(mapStateToProps)(HomeLayout);
