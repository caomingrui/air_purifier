import configureStore from '@/redux/configureStore';
import AllRouter from '@/router';
import { createNavigator } from 'tuya-panel-kit';
import composeLayout from './composeLayout';

const store = configureStore({});
// 下述适配代码已在tuya-panel-kit内部兼容
// if (Platform.OS !== 'web') {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   const originRender = Text.render || Text.prototype.render;
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   const parent = Text.render ? Text : Text.prototype;
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   // eslint-disable-next-line space-before-function-paren
//   parent.render = function (...args) {
//     const origin = originRender.call(this, ...args);
//     return React.cloneElement(origin, {
//       style: [origin.props.style, !Radio.isIos && { fontFamily: '' }],
//     });
//   };
// }
const NavigationComponent = createNavigator({
  router: AllRouter.router,
  screenOptions: {
    // headerShown: false,
  },
});
export default composeLayout(store, NavigationComponent);
