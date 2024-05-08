export default function Projects() {
  const projects = [
    {
      title: "OMNY NYC Subway System Website",
      description: [
        "Developed a user-friendly interface for the OMNY NYC Subway System, enhancing commuter experience.",
        "Integrated advanced features using React, GraphQL, and PHP Laravel, handling high traffic volumes.",
        "Worked closely with international teams to ensure timely and efficient project delivery."
      ]
    },
    {
      title: "Veea Control Center",
      description: [
        "Led the rebuild of Veea's Control Center using TypeScript and React, improving system efficiency and user experience.",
        "Managed a dynamic frontend team, adopting Scrum methodologies to streamline development processes.",
        "Designed and prototyped new UX/UI, significantly enhancing user engagement and satisfaction."
      ]
    },
    {
      title: "The Fuel Gauge (Marketing Dashboard)",
      description: [
        "Spearheaded the development of The Fuel Gauge, a comprehensive marketing dashboard for agency clients.",
        "Employed React, Laravel, and MongoDB to provide real-time marketing analytics and insights.",
        "Instrumental in securing and retaining high-profile clients, including General Motors."
      ]
    },
    {
      title: "If Financials Platform",
      description: [
        "Co-founded and led the development of If Financials, an innovative financial modeling platform for startups.",
        "Transformed complex financial operations into an accessible web-based application.",
        "Oversaw the entire project lifecycle, from initial concept to deployment, using Docker, Jenkins, and AWS."
      ]
    }
  ];

  return (
    <div className="m-10">
      <div className="grid gap-10 grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`rounded-lg p-10 ${i < 2 ? 'bg-gradient-to-t' : 'bg-gradient-to-b'} from-day-sky-common dark:from-night-sky-common to-transparent dark:bg-night-sky-common`}
          >
            <h2 className="text-2xl mb-4">{project.title}</h2>
            <ul className="list-disc">
              {project.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
