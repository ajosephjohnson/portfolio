import React, { PropsWithChildren } from 'react';

import SeasonalSection from '@/components/seasonal-effects/SeasonalSection';
import { Seasons } from '@/components/seasonal-effects/Seasons';


function SeasonalContainer({ children }: PropsWithChildren<{}>) {
  return <div className="flex min-h-screen min-w-screen items-center justify-center border-gray-300 border-b-2">
    {children}
  </div>
}

export default function Home() {
  return <main>
    <SeasonalSection season={Seasons.Fall}>
      <SeasonalContainer>
          FALL
      </SeasonalContainer>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Winter}>
      <SeasonalContainer>
        WINTER
      </SeasonalContainer>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Spring}>
      <SeasonalContainer>
        SPRING
      </SeasonalContainer>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Summer}>
      <SeasonalContainer>
        SUMMER
      </SeasonalContainer>
    </SeasonalSection>
  </main>;
}
