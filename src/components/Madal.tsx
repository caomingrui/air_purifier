import React, { Component } from 'react';
import { MadalPropsType, MadalStateType } from '@/containers/interface';
import { StyleSheet, View, ViewStyle, TouchableOpacity} from 'react-native';
import { TYText,Divider,Modal} from 'tuya-panel-kit';
import Radio from '@/radio';

class Madal extends Component<MadalPropsType, MadalStateType> {
    constructor(props: MadalPropsType) {
      super(props);
      this.state = {
        visible: true,
      };
    }
    _handleComplete = (value: any) => {
      this.setState({ value: Math.round(value) });
    };
  
    render(): JSX.Element {
      return (

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
      );
    }
  }
  
  interface StytleType {
    wrap: ViewStyle;
    flexDirectionRow:ViewStyle,
    flexDirectionCol:ViewStyle,
    flexWrap: ViewStyle;
    flexAlignCenter: ViewStyle;
    faultModal: ViewStyle;
    faultModalTitle: ViewStyle;
  }
  
  const styles = StyleSheet.create<StytleType>({
    wrap: {
      borderWidth:1,
      borderColor:'red',
      borderStyle: 'solid',
    },
    flexDirectionRow: { flexDirection: 'row' },
    flexDirectionCol: { flexDirection: 'column' },
    flexWrap: { flexWrap: 'wrap' },
    flexAlignCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    faultModal: {
        width: Radio.convertX(275),
        height: Radio.convertX(205),
        backgroundColor: '#FFFFFF',
      },
      faultModalTitle: {
        paddingTop: Radio.convertX(10),
        paddingBottom: Radio.convertX(10),
      },
  });
  
  export default Madal;
  