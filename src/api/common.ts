import { TYSdk, Utils } from 'tuya-panel-kit';
import { RequestDataTypes } from './interface';

const { JsonUtils } = Utils;
const sucStyle = 'background: green; color: #fff;';
const beginStyle = 'background: blue; color: #fff;';
const errStyle = 'background: red; color: #fff;';

const request = (
  { a, postData, v }: RequestDataTypes,
  resolve: (d: any) => void,
  reject: (d: any) => void
): void => {
  if (__DEV__) {
    console.log(TYSdk, `API begins to request: %c${a}%o`, beginStyle, { a, postData, v });
  }

  TYSdk.apiRequest(a, postData, v).then(
    (d: any) => {
      const response = JsonUtils.parseJSON(d);
      if (__DEV__) {
        console.log(`API Successful: %c${a}%o`, sucStyle, response);
      }
      resolve(response);
    },
    (e: Error) => {
      if (__DEV__) {
        console.log(`API Failed: %c${a}%o`, errStyle, e.message || e, { a, postData, v });
      }
      reject(e);
    }
  );
};

export default request;
