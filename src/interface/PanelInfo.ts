/* eslint-disable @typescript-eslint/no-namespace */
/**
 *
 * 面板常用信息，包含devInfo和dpSchema一些定义
 */
export namespace PanelInfo {
  /**
     *  name：设备名称
        productId：产品 Id
        uiId：当前产品对应的面板 Id
        bv：硬件基线版本
        devId：设备 Id
        gwId：网关 Id，如果是单品，devId 一般和 gwId 相等
        ability：只有蓝牙设备使用，如果是单点蓝牙设备，值是 5
        appOnline 是否在线
        deviceOnline：设备是否在线
        isLocalOnline：局域网是否在线
        isShare：是否是共享设备
        isVDevice：是否是演示设备
        groupId：群组设备 Id，可用于判断是否群组设备
        networkType：设备的在线类型
        schema：设备所属产品的功能点(dp， data point)定义，功能点解释请看dp 解释
        state: dp 点的状态
        capability：设备的能力类型，标志设备支持什么能力，如支持 Zigbee，红外，蓝牙等
        以上摘自涂鸦文档 https://developer.tuya.com/cn/docs/iot/panel-development/panel-sdk-development/5-min/template-details/template-details?id=K9m1fn8gb7ub2#title-4-devInfo%20%E8%AF%A6%E8%A7%A3   
      
        ability: 0
        activeTime: 1598528134
        appId: 168
        appKey: "3cxxt3au9x33ytvq3h9j"
        attribute: 0
        bv: "2.0"
        codeIds: {switch_1: "1", switch_2: "2", countdown_1: "9", countdown_2: "10", add_ele: "17", …}
        devAttribute: 0
        dps: {1: false, 2: false, 9: 0, 10: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, 25: 0, 38: "0", 40: false, 43: "", 101: false}
        homeId: 21809108
        icon: "https://images.tuyacn.com/smart/icon/ay1522117207969J0V02/8144b853b8de99a8dbef7faf75106376.png"
        idCodes: {1: "switch_1", 2: "switch_2", 9: "countdown_1", 10: "countdown_2", 17: "add_ele", 18: "cur_current", 19: "cur_power", 20: "cur_voltage", 21: "test_bit", 22: "voltage_coe", 23: "electric_coe", 24: "power_coe", 25: "electricity_coe", 38: "relay_status", 40: "child_lock", 43: "switch_inching", 101: "switch_all"}
        isAdmin: true
        isUniversalPanel: false
        nodeId: ""
        panelConfig: {fun: {…}, bic: Array(2)}
        parentId: null
        pcc: ""
        roomId: 0
        schema: {switch_1: {…}, switch_2: {…}, countdown_1: {…}, countdown_2: {…}, add_ele: {…}, …}
        state: {switch_1: false, switch_2: false, countdown_1: 0, countdown_2: 0, add_ele: 0, …}
        t: 1599060095
        timezoneId: "Asia/Shanghai"
        ui: "000000ao6d_0.1.3"
        uiConfig: {}
        uiId: "000000ao6d"
        uiPhase: "preview" 判断面板是预览版还是线上版
        uuid: "vdevo159523452631783"
        verSw: "1.0.0"
    
     */

  export interface DevInfo {
    ability?: number;
    t?: number;
    activeTime?: number;
    attribute?: number;
    appId?: number;
    appKey?: number;
    name?: string;
    productId?: string;
    roomId?: string;
    timezoneId?: string;
    ui?: string;
    uiId?: string;
    uuid?: string;
    devId?: string;
    groupId?: string;
    gwId?: string;
    uiPhase?: string;
    verSw?: string;
    networkType?: string;
    appOnline?: boolean;
    deviceOnline?: boolean;
    isLocalOnline?: boolean;
    isShare?: boolean;
    isVDevice?: boolean;
    schema?: DpSchema;
    state?: { [key: string]: any };
    uiConfig?: { [key: string]: any };
    idCodes?: { [key: number]: any };
    panelConfig?: { [key: string]: any };
  }
  export interface DpSchema {
    [key: string]:
      | DpNumberType
      | DpFaultType
      | DpBoolanType
      | DpEnumType
      | DpStringType
      | DpRawType;
  }

  export interface DpState {
    [key: string]: any;
  }

  /**
   *  数值型DP点结构
   */
  export interface DpNumberType {
    code: string;
    dptype: string;
    iconname: string | null;
    id: string;
    max: number;
    min: number;
    mode: 'rw' | 'ro' | 'wr';
    name: string;
    scale: number;
    schemaType: 'value';
    step: number;
    type: 'value';
    unit: string;
  }

  /**
   *  故障型DP点结构
   */
  export interface DpFaultType {
    code: string;
    dptype: string;
    iconname: string | null;
    id: string;
    label: string[];
    maxlen: number;
    mode: 'rw' | 'ro' | 'wr';
    name: string;
    schemaType: 'bitmap';
    type: 'bitmap';
  }
  /**
   *  布尔型DP点结构
   */
  export interface DpBoolanType {
    code: string;
    dptype: string;
    iconname: string | null;
    id: string;
    mode: 'rw' | 'ro' | 'wr';
    name: string;
    schemaType: 'bool';
    type: 'bool';
  }
  /**
   *  枚举型DP点结构
   */
  export interface DpEnumType {
    code: string;
    dptype: string;
    iconname: string | null;
    id: string;
    mode: 'rw' | 'ro' | 'wr';
    name: string;
    range: string[];
    schemaType: 'enum';
    type: 'enum';
  }
  /**
   *  字符型DP点结构
   */
  export interface DpStringType {
    code: string;
    dptype: string;
    iconname: string | null;
    id: string;
    maxlen: 255;
    mode: 'rw' | 'ro' | 'wr';
    name: string;
    schemaType: 'string';
    type: 'string';
  }
  /**
   *    RAW型DP点结构
   */
  export interface DpRawType {
    code: string;
    dptype: string;
    iconname: string | null;
    id: string;
    mode: 'rw' | 'ro' | 'wr';
    name: string;
    schemaType: string | null;
    type: 'raw';
  }
}
