import { BaseContainerPropsType } from '@/interface/PropsTypes';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TYText } from 'tuya-panel-kit';

const hello = (props: BaseContainerPropsType) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.goBack();
      }}
    >
      <TYText color="red">(点文字即可返回上个页面)当前页面的props:{JSON.stringify(props)}</TYText>
    </TouchableOpacity>
  );
};

export default hello;
