import { PanelInfo } from '@/interface/PanelInfo';

export default function getScale(dpcode: string, schema: PanelInfo.DpSchema): number {
  if ((<PanelInfo.DpNumberType>schema[dpcode]).scale) {
    const { scale } = <PanelInfo.DpNumberType>schema[dpcode];
    // eslint-disable-next-line no-restricted-properties
    return Math.pow(10, scale);
  }
  return 1;
}
