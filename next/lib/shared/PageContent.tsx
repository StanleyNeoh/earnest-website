import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager'

export default function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone;
  return (
    <>
      <AmbientColor />
      {dynamicZone && (<DynamicZoneManager dynamicZone={dynamicZone} locale={pageData.locale} />)}
    </>
  );
}
