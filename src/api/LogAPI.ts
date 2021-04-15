import { LogReportTypes, RequestDataTypes, LogAPITypes, BaseLogTypes } from './interface';
import request from './common';

const getReportLog = (param: LogReportTypes): Promise<any> => {
  const { devId, dpIds, offset, limit, startTime, endTime, sortType = 'DESC' } = param;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.dp.rang.stat.month.list',
      postData: {
        devId,
        dpIds,
        offset,
        limit,
        startTime,
        endTime,
        sortType
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const getFreeReportLog = (param: BaseLogTypes): Promise<any> => {
  const { devId, dpIds, offset, limit, sortType = 'DESC' } = param;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'm.smart.operate.log',
      postData: {
        devId,
        dpIds,
        offset,
        limit,
        sortType
      },
      v: '2.0'
    };
    request(requestData, resolve, reject);
  });
};
const getFreePublishLog = (param: BaseLogTypes): Promise<any> => {
  const { devId, dpIds, offset, limit, sortType = 'DESC' } = param;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'm.smart.operate.publish.log',
      postData: {
        devId,
        dpIds,
        offset,
        limit,
        sortType
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const LogAPI: LogAPITypes = {
  getReportLog,
  getFreeReportLog,
  getFreePublishLog
};

export default LogAPI;
