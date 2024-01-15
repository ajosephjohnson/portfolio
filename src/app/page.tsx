import {
  Section,
  Sections,
  Services,
  Projects,
  Testimonials,
  HireMe,
} from '@/components';


export default function Home() {
  return (
    <main className="pt-64 sm:pt-20 md:pt-0">
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
        <HireMe />
      </Section>
    </main>
  );
}
