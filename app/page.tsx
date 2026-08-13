import Hero from '@/components/sections/Hero';
import WhatIsFaniLab from '@/components/sections/WhatIsFaniLab';
import Ecosystem from '@/components/sections/Ecosystem';
import HowItWorks from '@/components/sections/HowItWorks';
import SmartContractLayer from '@/components/sections/SmartContractLayer';
import Backend from '@/components/sections/Backend';
import TrustEscrow from '@/components/sections/TrustEscrow';
import BuiltForStellar from '@/components/sections/BuiltForStellar';
import ProjectStatus from '@/components/sections/ProjectStatus';
import OpenSource from '@/components/sections/OpenSource';

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsFaniLab />
      <Ecosystem />
      <HowItWorks />
      <SmartContractLayer />
      <Backend />
      <TrustEscrow />
      <BuiltForStellar />
      <ProjectStatus />
      <OpenSource />
    </main>
  );
}
