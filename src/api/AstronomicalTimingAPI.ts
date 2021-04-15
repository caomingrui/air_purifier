import { PanelInfo } from '@/interface/PanelInfo';
import { Utils } from 'tuya-panel-kit';
import request from './common';
import { RequestDataTypes, AstronomicalTimingAPI, AstronomicalTimingAdd } from './interface';

/**
 * 天文定时
 * example
 */
// AstronomicalTimingAPI.getCityWeather(`${this.props.devInfo.devId}`).then((d) => {
//   console.log('getCityWeather', d);
// });

// console.log(' new Date().getTimezoneOffset()', new Date().getTimezoneOffset());
// const data: AstronomicalTimingAdd = {
//   time: '10:00',
//   loops: '0000000',
//   dps: JSON.stringify({ 2: false }),
//   astronomicalType: 0,
//   offsetType: 0,
//   lon: 112,
//   lat: 28,
// };
// const id = '8650935';

// AstronomicalTimingAPI.addAstronomicalTimer(data, this.props.devInfo).then((d) => {
//   console.log('addAstronomicalTimer', d);
// });

// AstronomicalTimingAPI.upDateAstronomicalTimer(id, data, this.props.devInfo).then((d) => {
//   console.log('upDateAstronomicalTimer', d);
// });

// AstronomicalTimingAPI.upDateAstronomicalStatus(id, false).then((d) => {
//   console.log('upDateAstronomicalStatus', d);
// });

// AstronomicalTimingAPI.removeAstronomicalTimer(id);

// AstronomicalTimingAPI.getAstronomicalTimerList(this.props.devInfo).then((d) => {
//   console.log('getAstronomicalTimerList', d);
// });

/**
 * 获取日出日落时间（天气）
 * @param devId  设备ID
 */
const getCityWeather = (devId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // const codes = 't.local,t.unix';
    const requestData: RequestDataTypes = {
      a: 'tuya.m.public.weather.get',
      postData: {
        devId,
        isLocal: true,
        // codes,
      },
      v: '2.0',
    };
    request(requestData, resolve, reject);
  });
};

/**
 获取天文定时列表
 API 名称
 tuya.m.timer.astronomical.list

 API 版本
 1.0

 参数

 名称	类型	描述	必选
 bizId	String	设备 ID 或群组ID	是
 */

/**
 *获取天文定时列表
 * @param instruct
 * @param devInfo
 */
const getAstronomicalTimerList = (devInfo: PanelInfo.DevInfo): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { groupId, devId } = devInfo;
    const postData = {
      bizId: groupId || devId,
    };
    const requestData: RequestDataTypes = {
      a: 'tuya.m.timer.astronomical.list',
      postData,
      v: '1.0',
    };

    request(requestData, resolve, reject);
  });
};

/**
 添加天文定时
 API 名称
 tuya.m.timer.astronomical.add

 API 版本
 1.0

 参数

 名称	类型	描述	必选
 bizId	String	设备 ID 或群组ID	是
 bizType	Integer	0:设备;1:设备群组	是
 loops	String	周期: ‘1111111’	是
 dps	String	dp点，json格式	是
 astronomicalType	Integer	天文类型,0:日出;1:日落	是
 timezone	String	时区	是
 date	String	yyyyMMdd	否
 time	String	偏移时间，“HH:mm” 24进制	是
 offsetType	Integer	偏移类型，-1:向前;0正常;1:向后	是
 lon	Double	经度	是
 lat	Double	纬度	是
 */

/**
 * 添加天文定时
 * @param instruct
 * @param devInfo 设备信息
 */
const addAstronomicalTimer = (
  instruct: AstronomicalTimingAdd,
  devInfo: PanelInfo.DevInfo
): Promise<any> => {
  const { loops, dps, astronomicalType, time, offsetType, lon, lat } = instruct;
  return new Promise((resolve, reject) => {
    const { groupId, devId } = devInfo;
    const postData = {
      bizId: groupId || devId,
      bizType: groupId ? 1 : 0,
      timezone: `+${Utils.CoreUtils.toFixed(
        Math.floor(Math.abs(new Date().getTimezoneOffset() / 60)),
        2
      )}:00`,
      loops,
      dps,
      astronomicalType,
      time,
      offsetType,
      lon,
      lat,
    };
    const requestData: RequestDataTypes = {
      a: 'tuya.m.timer.astronomical.add',
      postData,
      v: '1.0',
    };

    request(requestData, resolve, reject);
  });
};

/**
 修改天文定时
 API 名称
 tuya.m.timer.astronomical.update

 API 版本
 1.0

 参数

 名称	类型	描述	必选
 id	Long	定时任务id	是
 bizId	String	设备 ID 或群组ID	是
 bizType	Integer	0:设备;1:设备群组	是
 loops	String	周期: ‘1111111’	是
 dps	String	dp点，json格式	是
 astronomicalType	Integer	天文类型,0:日出;1:日落	是
 timezone	String	时区	是
 date	String	yyyyMMdd	否
 time	String	偏移时间，“HH:mm” 24进制	是
 offsetType	Integer	偏移类型，-1:向前;0正常;1:向后	是
 lon	Double	经度	是
 lat	Double	纬度	是
 */

/**
 * 修改天文定时
 * @param groupId 定时ID
 * @param instruct
 * @param devInfo 设备信息
 */
export const upDateAstronomicalTimer = (
  id: string,
  instruct: AstronomicalTimingAdd,
  devInfo: PanelInfo.DevInfo
): Promise<any> => {
  const { loops, dps, astronomicalType, time, offsetType, lon, lat } = instruct;
  return new Promise((resolve, reject) => {
    const { groupId: devGroupId, devId } = devInfo;
    const postData = {
      bizId: devGroupId || devId,
      bizType: devGroupId ? 1 : 0,
      id,
      timezone: `+${Utils.CoreUtils.toFixed(
        Math.floor(Math.abs(new Date().getTimezoneOffset() / 60)),
        2
      )}:00`,
      loops,
      dps,
      astronomicalType,
      time,
      offsetType,
      lon,
      lat,
    };
    const requestData: RequestDataTypes = {
      a: 'tuya.m.timer.astronomical.update',
      postData,
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};

/**
 修改天文定时使能
 API 名称
 tuya.m.timer.astronomical.status.update

 API 版本
 1.0

 参数

 名称	类型	描述	必选
 id	Long	定时任务id	是
 status	Integer	0:关闭；1开启	是
 */
/**
 * 修改天文定时状态
 * @param status true/false
 * @param id 定时ID
 */
export const upDateAstronomicalStatus = (id: string, status: boolean): Promise<any> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.timer.astronomical.status.update',
      postData: {
        id,
        status: status ? 1 : 0,
      },
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};

/**
 删除天文定时
 API 名称
 tuya.m.timer.astronomical.remove

 API 版本
 1.0

 参数

 名称	类型	描述	必选
 id	Long	定时任务id	是
 */
/**
 * 删除天文定时
 * @param id 定时ID
 */
const removeAstronomicalTimer = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.timer.astronomical.remove',
      postData: {
        id,
      },
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};

const AstronomicalTimingAPI: AstronomicalTimingAPI = {
  getCityWeather,
  addAstronomicalTimer,
  upDateAstronomicalTimer,
  upDateAstronomicalStatus,
  removeAstronomicalTimer,
  getAstronomicalTimerList,
};

export default AstronomicalTimingAPI;
