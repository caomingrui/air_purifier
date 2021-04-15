import { TYSdk } from 'tuya-panel-kit';
import request from './common';
import {
  RequestDataTypes,
  StatsAPITypes,
  Stats15MinteTypes,
  StatsDayTypes,
  StatsWeekTypes,
  StatsMonthTypes,
  StatsHourTypes
} from './interface';

const get15MintuData = ({
  devId,
  date,
  dpCode,
  auto = 2,
  type
}: Stats15MinteTypes): Promise<any> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.dp.rang.dp.15min.list',
      postData: {
        date,
        type,
        devId,
        dpId: TYSdk.device.getDpIdByCode(dpCode),
        auto
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const getHourData = (param: StatsHourTypes): Promise<any> => {
  const { devId, date, dpCode, auto = 2, type, uid = '' } = param;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.dp.rang.stat.hour.list',
      postData: {
        date,
        type,
        devId,
        dpId: TYSdk.device.getDpIdByCode(dpCode),
        auto,
        uid
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const getDayData = (param: StatsDayTypes): Promise<any> => {
  const { devId, startDay, endDay, dpCode, auto = 2, type, uid = '' } = param;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.dp.rang.stat.day.list',
      postData: {
        startDay,
        endDay,
        type,
        devId,
        dpId: TYSdk.device.getDpIdByCode(dpCode),
        auto,
        uid
      },
      v: '2.0'
    };
    request(requestData, resolve, reject);
  });
};

const getWeekData = (param: StatsWeekTypes): Promise<any> => {
  const { devId, startWeek, endWeek, dpCode, auto = 2, type } = param;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.dp.rang.stat.week.list',
      postData: {
        startWeek,
        endWeek,
        type,
        devId,
        dpId: TYSdk.device.getDpIdByCode(dpCode),
        auto
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const getMonthData = (param: StatsMonthTypes): Promise<any> => {
  const { devId, startMonth, endMonth, dpCode, auto = 2, type, uid = '' } = param;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.dp.rang.stat.month.list',
      postData: {
        startMonth,
        endMonth,
        type,
        devId,
        dpId: TYSdk.device.getDpIdByCode(dpCode),
        auto,
        uid
      },
      v: '2.0'
    };
    request(requestData, resolve, reject);
  });
};

const reset = (devId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.dp.history.reset',
      postData: {
        devId
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const StatsAPI: StatsAPITypes = {
  get15MintuData,
  getHourData,
  getDayData,
  getWeekData,
  getMonthData,
  reset
};

export default StatsAPI;
