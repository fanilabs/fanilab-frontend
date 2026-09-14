import { Suspense } from 'react';
import Hero from '@/components/sections/Hero';
import WhatIsFaniLab from '@/components/sections/WhatIsFaniLab';
import Ecosystem from '@/components/sections/Ecosystem';
import HowItWorks from '@/components/sections/HowItWorks';
import SmartContractLayer from '@/components/sections/SmartContractLayer';
import Backend from '@/components/sections/Backend';
import LiveActivity from '@/components/sections/LiveActivity';
import TrustEscrow from '@/components/sections/TrustEscrow';
import BuiltForStellar from '@/components/sections/BuiltForStellar';
import ProjectStatus from '@/components/sections/ProjectStatus';
import OpenSource from '@/components/sections/OpenSource';

function LiveActivityFallback() {
  return (
    <section className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <div className="mx-auto h-40 max-w-2xl animate-pulse panel" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIsFaniLab />
      <Ecosystem />
      <HowItWorks />
      <SmartContractLayer />
      <Backend />
      <Suspense fallback={<LiveActivityFallback />}>
        <LiveActivity />
      </Suspense>
      <TrustEscrow />
      <BuiltForStellar />
      <ProjectStatus />
      <OpenSource />
    </main>
  );
}
