import { PanelInfo } from '@/interface/PanelInfo';

export interface RequestDataTypes {
  a: string;
  postData: { [key: string]: any };
  v: string;
}
export interface DeviceAPITypes {
  /**
   * 保存设备信息至云端  key-value形式
   */
  saveDeviceCloudData: (key: string, data: any) => Promise<any>;
  /**
   * 通过数据key获取设备云端信息数据，
   */
  getDeviceCloudData: (key: string) => Promise<any>;
  /**
   * 获取设备所有dp点信息
   */
  getDpsInfos: (devId: string) => Promise<any>;
  /**
   * 获取设备某个dp点的名称
   */
  getDpName: (devId: string, dpCode: string) => Promise<any>;
  /**
   * 单个设备修改dp点名称
   */
  updateDpName: (devId: string, dpCode: string, name: string) => Promise<any>;
  /**
   * 获取群组设备所有dp点信息
   */
  getGroupDpsInfos: (groupId: string) => Promise<any>;
  /**
   * 获取群组设备某个dp点的名称
   */
  getGroupDpName: (groupId: string, dpCode: string) => Promise<any>;
  /**
   * 群组设备修改dp点名称
   */
  updateGroupDpName: (groupId: string, dpCode: string, name: string) => Promise<any>;
}

export interface BaseStatsTypes {
  /** 设备ID**/
  devId: string;
  /** 统计类型 **/
  type: string;
  /**
   *  dp点的名字
   **/
  dpCode: string;
  /**
   * auto=1 以及 auto=2 的时候支持整刻时间上报的数据，并且 auto=1 中间缺数据会用前一个时刻的数据补上，auto=2 中间缺数据会用一个"#"的数据补上
   **/
  auto: 0 | 1 | 2;
}

export interface TimerStatsTypes {
  /** 单设备 ID（devId） 或者群组设备 ID（groupId）。**/
  bizId: string;
  /** 群组设备 ID（groupId） **/
  groupId: string;
}

export interface Stats15MinteTypes extends BaseStatsTypes {
  /**
   *  如："20200609"   时间，这个接口目前只支持一天一天的获取
   **/
  date: string;
}

export interface StatsHourTypes extends BaseStatsTypes {
  /**
   *  如："20200609"   时间，这个接口目前只支持一天一天的获取
   **/
  date: string;
  /**
   * 暂且不明，参数传为空
   */
  uid: string;
}

export interface StatsDayTypes extends BaseStatsTypes {
  /**
   *  开始时间 如："20200609"
   **/
  startDay: string;
  /**
   * 结束时间 如："20200609"
   **/
  endDay: string;
  /**
   * 暂且不明，参数传为空
   */
  uid: string;
}

export interface StatsWeekTypes extends BaseStatsTypes {
  /**
   *  开始周 如："20200609"
   **/
  startWeek: string;
  /**
   *  结束周 如："20200609"
   **/
  endWeek: string;
}

export interface StatsMonthTypes extends BaseStatsTypes {
  /**
   *  开始月 如：201805（2018年5月）
   **/
  startMonth: string;
  /**
   *  结束月如：201805（2018年5月）
   **/
  endMonth: string;
  /**
   * 暂且不明，参数传为空
   */
  uid: string;
}

export interface StatsAPITypes {
  /**
   * 获取15分钟的统计数据
   */
  get15MintuData: (params: Stats15MinteTypes) => Promise<any>;
  /**
   * 按小时来统计数据
   */
  getHourData: (params: StatsHourTypes) => Promise<any>;
  /**
   * 传入天的范围，返回天范围内的数据
   */
  getDayData: (params: StatsDayTypes) => Promise<any>;
  /**
   * 传入 week 的范围，返回这 week 范围内的数据 反馈有bug 建议不要使用，如需使用请和吴学文确认
   */
  getWeekData: (params: StatsWeekTypes) => Promise<any>;
  /**
   * 传入月的范围，返回月范围内的数据
   */
  getMonthData: (params: StatsMonthTypes) => Promise<any>;
  /**
   * 复位
   */

  reset: (devId: string) => Promise<any>;
}

export interface TimerAPITypes {
  /**
   * 添加分组定时
   */
  addGroupTimer: (params: groupTimerTypes) => Promise<any>;
  /**
   * 修改分组定时
   */
  modifyGroupTimer: (params: groupTimerTypes) => Promise<any>;
  /**
   * 分组定时查询
   */
  getGroupTimerList: (category: string, params: TimerStatsTypes) => Promise<any>;
  /**
   * 根据 ids 修改（ 删除 ）任务状态
   * ids：定时任务的 ID。提交多任务时使用逗号（,）分隔。例如"1,2,3,4"。单次提交任务数量不得超过 168。
   */
  upTimerStatus: (ids: string, status: number, params: TimerStatsTypes) => Promise<any>;
  /**
   * 根据 category 修改（ 删除 ）定时任务状态
   * status:初始化状态，0：关闭；1：开启；2：删除
   */
  deleteTimer: (category: string, status: number, params: TimerStatsTypes) => Promise<any>;
  /**
   * 添加单次定时
   */
  addTimer: (params: groupTimerTypes) => Promise<any>;
  /**
   * 修改单次定时
   */
  modifyTimer: (params: groupTimerTypes) => Promise<any>;
  /**
   * 查询单次定时
   */
  getTimerList: (category: string, params: TimerStatsTypes) => Promise<any>;
}

export interface BaseLogTypes {
  /** dp点ID的集合字符串切割，用逗号。如："1,2,3,4,5" **/
  dpIds: string;
  devId: string;
  offset: number;
  limit: number;
  sortType?: 'DESC' | 'ASC';
}

export interface LogReportTypes extends BaseLogTypes {
  startTime: string;
  endTime: string;
}

export interface LogAPITypes {
  /**
   *  获取dp点历史上报日志
   */
  getReportLog: (param: LogReportTypes) => Promise<any>;
  /**
   * 获取 dp 点历史上报日志(免费版本，最多1000条数据)
   */
  getFreeReportLog: (param: BaseLogTypes) => Promise<any>;
  /**
   * 获获取用户操作的历史下发日志(免费版本，最多1000条数据)
   */
  getFreePublishLog: (param: BaseLogTypes) => Promise<any>;
}

export interface Scene {
  bindType: number;
  /**
   * 按键ID
   */
  btnId: number;
  devId: string;
  /**
   * 触发条件
   */
  dpValue: string;
  /**
   * 规则ID
   */
  ruleId: string;
  gwId?: string;
  localSid?: string;
  ruleBackground?: string;
  actionExcutor?: string[];
  condRuleId?: string;
  ruleName?: string;
}
/**
 * 涂鸦native创建的自动化数据
 **/
export interface Automation {
  attribute: number;
  auditStatus: number;
  background: string; // 可能是背景图片也可能是颜色
  boundForPanel: boolean;
  boundForWiFiPanel: boolean;
  code: string;
  commonField: string;
  coverIcon: string;
  disableTime: number;
  displayColor: string;
  enabled: boolean;
  gmtCreate: number;
  gmtModified: number;
  id: string;
  iotAutoAlarm: boolean;
  localLinkage: boolean;
  logicRule: boolean;
  matchType: number;
  name: string;
  newLocalScene: boolean;
  ownerId: string;
  ruleSource: number;
  ruleType: number;
  scenarioRule: boolean;
  stickyOnTop: boolean;
  uid: string;
}

export interface SceneAPITypes {
  /**
   * 上传或修改场景图片
   */
  uploadScenePic: (res: any, sceneId: string, devInfo: PanelInfo.DevInfo) => Promise<any>;
  /**
   * 删除场景图片
   */
  deleteScenePic: (sceneId: string, devInfo: PanelInfo.DevInfo) => Promise<any>;
  /**
   * 获取当前设备已绑定的所有自动化场景
   */
  getBindScene: (devId: string) => Promise<Scene[]>;
  /**
   * 获取当前设备创建的所有场景(其实就是获取涂鸦自动化场景的数据)
   */
  getAutomation: (devId: string) => Promise<Automation[]>;
  /**
   * 将dp点功能 绑定选中的自动化场景功能
   */
  bindAutomation: (scene: Scene) => Promise<boolean>;
  /**
   * 将dp点功能 绑定选中的自动化场景功能
   */
  unbindAutomation: ({ devId, btnId }: Scene) => Promise<boolean>;
  /**
   *  出发执行自动化场景功能
   */
  excuteAutomation: ({ ruleId }: Scene) => Promise<boolean>;
}

export interface groupTimerTypes extends TimerStatsTypes {
  /**
   * 定时任务主键。
   */
  id?: number;
  /**
   * 定时分类 添加时必传 修改时非必传
   */
  category?: string;
  /**
   * 在0000000基础上，把所选择日期对应位置的 0 改成 1，第一位表示周日
   */
  loops: string;
  /**
   * 初始化状态，0：关闭；1：开启
   */
  status: number;
  /**
   * [{/“dps/”:{},/“time/”:“”}]，JSON 数据格式。
   */
  actionsArray?: string;
  /**
   * {/“dps/”:{},/“time/”:“”}。
   */
  actions?: string;
  /**
   * 是否发送执行通知。
   */
  isAppPush: boolean;
  /**
   * 定时备注。
   */
  aliasName: string;
}

export interface AstronomicalTimingAdd {
  loops: string;
  dps: string;
  astronomicalType: number;
  time: string;
  offsetType: number;
  lon: number;
  lat: number;
}

export interface AstronomicalTimingAPI {
  getCityWeather: (devId: string) => Promise<any>;

  getAstronomicalTimerList: (devInfo: PanelInfo.DevInfo) => Promise<any>;

  addAstronomicalTimer: (
    instruct: AstronomicalTimingAdd,
    devInfo: PanelInfo.DevInfo
  ) => Promise<boolean>;

  upDateAstronomicalTimer: (
    id: string,
    instruct: AstronomicalTimingAdd,
    devInfo: PanelInfo.DevInfo
  ) => Promise<any>;

  upDateAstronomicalStatus: (id: string, status: boolean) => Promise<any>;

  removeAstronomicalTimer: (id: string) => Promise<any>;
}
