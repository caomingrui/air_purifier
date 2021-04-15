import request from './common';
import { groupTimerTypes, RequestDataTypes, TimerAPITypes, TimerStatsTypes } from './interface';

const addGroupTimer = (params: groupTimerTypes): Promise<any> => {
  const { category, bizId, groupId, loops, status, actionsArray, isAppPush, aliasName } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.dps.group.add',
      postData: {
        bizId,
        bizType: groupId ? 1 : 0,
        loops,
        category,
        status,
        actionsArray,
        isAppPush,
        aliasName
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const addTimer = (params: groupTimerTypes): Promise<any> => {
  const { category, bizId, groupId, loops, status, actions, isAppPush, aliasName } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.dps.add',
      postData: {
        bizId,
        bizType: groupId ? 1 : 0,
        loops,
        category,
        status,
        actions,
        isAppPush,
        aliasName
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const modifyGroupTimer = (params: groupTimerTypes): Promise<any> => {
  const { loops, bizId, groupId, status, actionsArray, isAppPush, aliasName } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.dps.group.update',
      postData: {
        bizId,
        bizType: groupId ? 1 : 0,
        loops,
        status,
        actionsArray,
        isAppPush,
        aliasName
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const modifyTimer = (params: groupTimerTypes): Promise<any> => {
  const { id, loops, bizId, groupId, status, actions, isAppPush, aliasName } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.dps.update',
      postData: {
        bizId,
        bizType: groupId ? 1 : 0,
        id,
        loops,
        status,
        actions,
        isAppPush,
        aliasName
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const getGroupTimerList = (category: string, params: TimerStatsTypes): Promise<any> => {
  const { groupId, bizId } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.dps.group.list',
      postData: {
        bizType: groupId ? 1 : 0,
        bizId,
        category
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const getTimerList = (category: string, params: TimerStatsTypes): Promise<any> => {
  const { groupId, bizId } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.dps.list',
      postData: {
        bizType: groupId ? 1 : 0,
        bizId,
        category
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const upTimerStatus = (ids: string, status: number, params: TimerStatsTypes): Promise<any> => {
  const { groupId, bizId } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.batch.status.update',
      postData: {
        bizType: groupId ? 1 : 0,
        bizId,
        ids,
        status
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const deleteTimer = (category: string, status: number, params: TimerStatsTypes): Promise<any> => {
  const { groupId, bizId } = params;
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.clock.category.status.update',
      postData: {
        bizType: groupId ? 1 : 0,
        bizId,
        category,
        status
      },
      v: '1.0'
    };
    request(requestData, resolve, reject);
  });
};

const TimerAPI: TimerAPITypes = {
  addGroupTimer,
  modifyGroupTimer,
  getGroupTimerList,
  upTimerStatus,
  deleteTimer,
  addTimer,
  modifyTimer,
  getTimerList
};

export default TimerAPI;
