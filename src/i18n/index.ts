import { PanelInfo } from '@/interface/PanelInfo';
import { I18N } from 'tuya-panel-kit';
import LocalStrings from './strings';

const Strings = new I18N(LocalStrings);

function getFaultString(
  dpcode: string,
  fault: number,
  scheam: PanelInfo.DpSchema,
  sign = ','
): string {
  const schema = scheam[dpcode] as PanelInfo.DpFaultType;
  if (schema === undefined) {
    return '';
  }
  const faultValues: string[] = [];
  schema.label.forEach((val, index) => {
    faultValues[index] = Strings.getDpLang(dpcode, val);
  });

  let errArray = '';
  let defaulList = '';
  if (fault !== undefined) {
    defaulList = fault.toString(2);
  }
  const errList = defaulList.split('').reverse().join('');
  for (let i = 0; i < errList.length; i++) {
    if (errList.substring(i, i + 1) === '1') {
      if (errArray && sign) {
        errArray += sign;
      }
      errArray = `${errArray + faultValues[i]} `;
    }
  }
  return errArray;
}

function getFaultIndex(dpcode: string, fault: number, scheam: PanelInfo.DpSchema): number[] {
  const schema = scheam[dpcode] as PanelInfo.DpFaultType;
  if (schema === undefined) {
    return [];
  }
  const faultValues: string[] = [];
  schema.label.forEach((val, index) => {
    faultValues[index] = Strings.getDpLang(dpcode, val);
  });

  const errArray = [];
  let defaulList = '';
  if (fault !== undefined) {
    defaulList = fault.toString(2);
  }
  const errList = defaulList.split('').reverse().join('');
  for (let i = 0; i < errList.length; i++) {
    if (errList.substring(i, i + 1) === '1') {
      errArray.push(i);
    }
  }
  return errArray;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Strings.getFaultString = getFaultString;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Strings.getFaultIndex = getFaultIndex;
export default Strings;
