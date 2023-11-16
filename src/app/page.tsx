import {
  Section,
  Sections,
  Services,
  Projects,
} from '@/components';


export default function Home() {
  return (
    <main>
      <Section name={Sections.Services}>
        <Services />
      </Section>
      <Section name={Sections.Projects}>
        <Projects />
      </Section>
      <Section name={Sections.Testimonials}>
      </Section>
      <Section name={Sections.HireMe}>
      </Section>
    </main>
  );
}
