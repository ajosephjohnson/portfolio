import {
  Section,
  Sections,
  Services,
  Projects,
  Testimonials,
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
        <Testimonials />
      </Section>
      <Section name={Sections.HireMe}>
      </Section>
    </main>
  );
}
