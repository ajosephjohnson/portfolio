export default function Services() {
  const services = [
    {
      title: "Frontend Development",
      description: [
        "Building responsive and interactive web interfaces using React, Vue, and Next.js.",
        "Expertise in creating user-friendly UI/UX designs with tools like Figma and Adobe XD.",
        "Seamless integration of frontend applications with backend services."
      ]
    },
    {
      title: "Backend Development",
      description: [
        "Developing robust backend solutions using Node, Laravel, and various database technologies (MongoDB, MySQL, PostgreSQL).",
        "Experience in API development and integration, including designing and maintaining web scrapers.",
        "Expert in handling complex data and server-side logic."
      ]
    },
    {
      title: "Project Leadership",
      description: [
        "Leading and managing development teams with Agile methodologies.",
        "Expertise in project management tools like Jira, Asana, and Trello.",
        "Experienced in sprint planning, backlog grooming, and delivering projects within tight deadlines."
      ]
    },
    {
      title: "DevOps and System Architecture",
      description: [
        "Proficient in setting up and maintaining CI/CD pipelines using Jenkins, Docker, and AWS.",
        "Designing system architectures and ensuring their scalability and efficiency.",
        "Experience in handling deployment and operations on cloud platforms like Azure and GCP."
      ]
    }
  ];

  return (
    <div className="mt-48">
      <div className="grid m-10 gap-10 grid-cols-2">
        {services.map((service, i) => (
          <div
            key={i}
            className={`rounded-lg p-10 ${i < 2 ? 'bg-gradient-to-t' : 'bg-gradient-to-b'} from-day-sky-common dark:from-night-sky-common to-transparent dark:bg-night-sky-common`}
          >
            <h2 className="text-2xl mb-4">{service.title}</h2>
            <ul className="list-disc">
              {service.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
