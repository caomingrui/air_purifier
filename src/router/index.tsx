import Hello from '@/containers/hello';
import Home from '@/containers/home';
import Radio from '@/radio';
import { StyleSheet } from 'react-native';
import { ConnectedComponent } from 'react-redux';
import { NavigationOptions, NavigationRoute } from 'tuya-panel-kit';

const styles = StyleSheet.create({
  topbarStyle: {
    backgroundColor: 'transparent',
  },
  topbarTextStyle: {
    color: '#333',
    fontSize: Radio.cx(14),
    backgroundColor: 'transparent',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

/**
 * topbarTextStyle 头部字体颜色
 * topbarStyle  头部背景样式
 * showOfflineView true | false  离线渲染层
 * hideTopbar  true | false 隐藏头布局
 * title  头部标题
 * background 自定义面板背景 {
    @label `number` 渲染本地图片
    @label `string` 渲染颜色
    @label `{ uri: string }` 渲染网络图片
    @label `RadialGradientBackground` 渲染径向渐变
    @label `LinearGradientBackground` 渲染线性渐变
  }
 * style 容器样式
 * isBleOfflineOverlay true | false 蓝牙离线提示是否覆盖整个面板(除头部栏外)
 * renderTopBar 自定义头布局
 * renderStatusBar 自定义状态栏
 */

const options: NavigationOptions = {
  topbarTextStyle: styles.topbarTextStyle,
  topbarStyle: styles.topbarStyle,
  backgroundStyle: styles.mainContainer,
  style: styles.mainContainer,
};
type RouterType = Pick<NavigationRoute, 'name' | 'options'> & {
  component: React.ComponentClass<any, any> | React.FC<any> | ConnectedComponent<any, any>;
};
const router: Array<RouterType> = [
  {
    name: 'main',
    component: Home,
    options: {
      title: '111',
      ...options,
    },
  },
  {
    name: 'hello',
    component: Hello,
    options: {
      title: '我是标题',
      ...options,
      hideTopbar: false,
    },
  },
];
const AllRouter = {
  router,
};

export default AllRouter;
