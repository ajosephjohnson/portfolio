import {
  Section,
  Sections,
  Services,
} from '@/components';


export default function Home() {
  return (
    <main>
      <Section name={Sections.Services}>
        <Services />
      </Section>
      <Section name={Sections.Projects}>
      </Section>
      <Section name={Sections.Testimonials}>
      </Section>
      <Section name={Sections.HireMe}>
      </Section>
    </main>
  );
}
