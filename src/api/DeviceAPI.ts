import { TYSdk, Utils } from 'tuya-panel-kit';
import request from './common';
import { DeviceAPITypes } from './interface';

const { JsonUtils } = Utils;

const saveDeviceCloudData = (key: string, data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const jsonString = typeof data === 'object' ? JSON.stringify(data) : data;
      TYSdk.native.setDevProperty(key, jsonString, resolve, reject);
    } catch (e) {
      // console.log('saveDeviceCloudData', e);
      reject(e);
    }
  });
};

const getDeviceCloudData = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    TYSdk.native.getDevProperty(
      (d: any) => {
        if (typeof d !== 'undefined') {
          let data = d;
          if (key) {
            data = typeof d[key] !== 'undefined' ? d[key] : {};
          }
          if (typeof data === 'string') data = JSON.parse(data);
          resolve(data);
        } else reject(new Error(0));
      },
      (e: Error) => reject(new Error(e)),
    );
  });
};

const getDpsInfos = (devId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    request(
      {
        a: 's.m.dev.dp.get',
        postData: {
          gwId: devId,
          devId,
        },
        v: '2.0',
      },
      (d) => {
        const response = JsonUtils.parseJSON(d);
        resolve(response);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const getDpName = (devId: string, dpCode: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    getDpsInfos(devId).then(
      (d) => {
        let result = '';
        // eslint-disable-next-line no-restricted-syntax
        for (const dp of d) {
          if (dp.code === dpCode) {
            result = dp.name;
          }
        }
        resolve(result);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const updateDpName = (devId: string, dpCode: string, name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    request(
      {
        a: 's.m.dev.dp.name.update',
        postData: {
          gwId: devId,
          devId,
          dpId: TYSdk.device.getDpIdByCode(dpCode),
          name,
        },
        v: '1.0',
      },
      (d) => {
        const response = JsonUtils.parseJSON(d);
        resolve(response);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const getGroupDpsInfos = (groupId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    request(
      {
        a: 's.m.dev.group.dp.get',
        postData: {
          groupId,
        },
        v: '2.0',
      },
      (d) => {
        const response = JsonUtils.parseJSON(d);
        resolve(response);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const getGroupDpName = (devId: string, dpCode: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    getGroupDpsInfos(devId).then(
      (d) => {
        let result = '';
        // eslint-disable-next-line no-restricted-syntax
        for (const dp of d) {
          if (dp.code === dpCode) {
            result = dp.name;
          }
        }
        resolve(result);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const updateGroupDpName = (groupId: string, dpCode: string, name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    request(
      {
        a: 'tuya.m.group.dpname.update',
        postData: {
          groupId,
          dpId: +TYSdk.device.getDpIdByCode(dpCode),
          name,
        },
        v: '1.0',
      },
      (d) => {
        const response = JsonUtils.parseJSON(d);
        resolve(response);
      },
      (e) => {
        reject(e);
      },
    );
  });
};

const DeviceAPI: DeviceAPITypes = {
  saveDeviceCloudData,
  getDeviceCloudData,
  getDpsInfos,
  getDpName,
  updateDpName,
  getGroupDpsInfos,
  getGroupDpName,
  updateGroupDpName,
};

export default DeviceAPI;
