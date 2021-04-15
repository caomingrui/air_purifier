import { PanelInfo } from '@/interface/PanelInfo';
import { TYSdk } from 'tuya-panel-kit';
import request from './common';
import { Automation, RequestDataTypes, Scene, SceneAPITypes } from './interface';

const api = function (a: string, postData: { [key: string]: any }): Promise<any> {
  return new Promise((resolve, reject) => {
    TYSdk.apiRequest(
      {
        a,
        postData,
        v: '10',
      },
      (d: any) => {
        const data = typeof d === 'string' ? JSON.parse(d) : d;
        resolve(data);
      },
      (err: Error) => {
        const e = typeof err === 'string' ? JSON.parse(err) : err;
        reject(e);
      }
    );
  });
};

const getScenePic = (sceneId: string, devInfo: PanelInfo.DevInfo) => {
  return api('tuya.m.device.scene.file.get', {
    gwId: devInfo.gwId || devInfo.devId,
    sceneId: `${sceneId}`,
  });
};

const getScenePicList = async function (devInfo: PanelInfo.DevInfo) {
  const deviceId = devInfo.devId || devInfo.gwId || 0;
  return api('tuya.m.device.scene.file.list', {
    gwIds: [deviceId],
  }).then((data) => data[deviceId]);
};

const editScenePic = function (
  sceneId: string,
  fileUrl: string,
  size: number,
  devInfo: PanelInfo.DevInfo
) {
  return api('tuya.m.device.scene.file.modify', {
    gwId: devInfo.gwId || devInfo.devId,
    sceneId: `${sceneId}`,
    fileUrl,
    size,
  });
};

const deleteScenePic = function (sceneId: string, devInfo: PanelInfo.DevInfo): Promise<any> {
  return api('tuya.m.device.scene.file.delete', {
    gwId: devInfo.gwId || devInfo.devId,
    sceneId: `${sceneId}`,
  });
};

const getAuth = function (fileName: string, devInfo: PanelInfo.DevInfo) {
  return api('tuya.m.storage.post.sign', {
    devId: devInfo.devId,
    biz: 'scene',
    type: 'image',
    isIE: false,
    uploadFileName: fileName,
  });
};

const uploadScenePic = async (
  res: any,
  sceneId: string,
  devInfo: PanelInfo.DevInfo
): Promise<any> => {
  try {
    const { devId } = devInfo;
    if (!devId || !sceneId) {
      throw new Error('Missing required params');
    }
    // 获取后缀
    const index = res.uri.lastIndexOf('.');
    const ext = (res.uri.substr(index + 1) || '').toLowerCase();
    const timestamp = Date.now();
    const filename = `${devId}_${sceneId}_${timestamp}.${ext}`;
    const auth = (await getAuth(filename, devInfo)) || {};
    const { sign, AWSAccessKeyId, ossAccessId, policy, cloudkey, bucketUrl } = auth;

    if (ext === 'gif') {
      throw new Error('Gif Not Supported');
    }
    let type = '';
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        type = 'image/jpeg';
        break;
      case 'png':
        type = 'image/png';
        break;
      default:
        break;
    }

    const formData = new global.FormData();

    // 美国区
    if (AWSAccessKeyId) {
      formData.append('AWSAccessKeyId', AWSAccessKeyId);
    }
    // 中国区
    if (ossAccessId) {
      formData.append('OSSAccessKeyId', ossAccessId);
    }
    formData.append('Signature', sign);
    formData.append('policy', policy);
    formData.append('key', cloudkey);
    formData.append('file', {
      type,
      uri: res.uri,
      name: filename,
      size: res.fileSize,
    });
    const data = await global.fetch(bucketUrl, {
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
      method: 'POST',
    });
    if (data.ok) {
      const ret = await editScenePic(sceneId, cloudkey, res.fileSize, devInfo);
      if (!ret) {
        throw new Error('Edit Scene Pic Error');
      }
      return cloudkey;
    }
    throw new Error('Fetch Error');
  } catch (e) {}
};

const getBindScene = (devId: string): Promise<Scene[]> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.linkage.rule.bind.wifi.query',
      postData: {
        devId,
      },
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};

const getAutomation = (devId: string): Promise<Automation[]> => {
  return new Promise<Automation[]>((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.linkage.rule.brief.query',
      postData: {
        devId,
      },
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};

const bindAutomation = (scene: Scene): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.linkage.rule.bind.wifi.save',
      postData: {
        ...scene,
      },
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};
const unbindAutomation = ({ devId, btnId }: Scene): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.linkage.rule.bind.wifi.remove',
      postData: {
        devId,
        btnId,
      },
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};
const excuteAutomation = ({ ruleId }: Scene): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const requestData: RequestDataTypes = {
      a: 'tuya.m.linkage.rule.trigger',
      postData: {
        ruleId,
      },
      v: '1.0',
    };
    request(requestData, resolve, reject);
  });
};

const SceneAPI: SceneAPITypes = {
  uploadScenePic,
  deleteScenePic,
  getBindScene,
  getAutomation,
  bindAutomation,
  unbindAutomation,
  excuteAutomation,
};
export default SceneAPI;
