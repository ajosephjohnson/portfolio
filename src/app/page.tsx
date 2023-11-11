import React, { PropsWithChildren } from 'react';

import { SeasonalSection, Seasons } from '@/components/seasons';


function Container({ children }: PropsWithChildren<{}>) {
  return <div className="flex min-h-screen min-w-screen items-center justify-center dark:border-night-sky-mid border-day-sky-mid border-b-2">
    {children}
  </div>
}

export default function Home() {
  return <main>
    <SeasonalSection season={Seasons.Fall}>
      <Container></Container>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Winter}>
      <Container></Container>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Spring}>
      <Container></Container>
    </SeasonalSection>
    <SeasonalSection season={Seasons.Summer}>
      <Container></Container>
    </SeasonalSection>
  </main>;
}
