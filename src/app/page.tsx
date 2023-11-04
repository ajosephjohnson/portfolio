import React, { PropsWithChildren } from 'react';

import { SeasonalSection, Seasons } from '@/components/seasons';


function Container({ children }: PropsWithChildren<{}>) {
  return <div className="flex min-h-screen min-w-screen items-center justify-center border-gray-300 border-b-2">
    {children}
  </div>
}

export default function Home() {
  return <main>
    <SeasonalSection season={Seasons.Fall}>
      <Container>
        FALL
      </Container>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Winter}>
      <Container>
        WINTER
      </Container>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Spring}>
      <Container>
        SPRING
      </Container>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Summer}>
      <Container>
        SUMMER
      </Container>
    </SeasonalSection>
  </main>;
}
