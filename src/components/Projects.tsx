import Image from 'next/image';
import OMNYImage from '../../public/projects/OMNY.png';
import CCImage from '../../public/projects/CC.png';
import TFGImage from '../../public/projects/TFG.png';
import IFImage from '../../public/projects/IF.png';


export default function Projects() {
  const projects = [
    {
      title: "OMNY NYC Subway System Website",
      description: [
        "Developed a user-friendly interface for the OMNY NYC Subway System, enhancing commuter experience.",
        "Integrated advanced features using React, GraphQL, and PHP Laravel, handling high traffic volumes.",
        "Worked closely with international teams to ensure timely and efficient project delivery."
      ],
      images: [ OMNYImage ]
    },
    {
      title: "Veea Control Center",
      description: [
        "Led the rebuild of Veea's Control Center using TypeScript and React, improving system efficiency and user experience.",
        "Managed a dynamic frontend team, adopting Scrum methodologies to streamline development processes.",
        "Designed and prototyped new UX/UI, significantly enhancing user engagement and satisfaction."
      ],
      images: [ CCImage ]
    },
    {
      title: "The Fuel Gauge (Marketing Dashboard)",
      description: [
        "Spearheaded the development of The Fuel Gauge, a comprehensive marketing dashboard for agency clients.",
        "Employed React, Laravel, and MongoDB to provide real-time marketing analytics and insights.",
        "Instrumental in securing and retaining high-profile clients, including General Motors."
      ],
      images: [ TFGImage ]
    },
    {
      title: "If Financials Platform",
      description: [
        "Co-founded and led the development of If Financials, an innovative financial modeling platform for startups.",
        "Transformed complex financial operations into an accessible web-based application.",
        "Oversaw the entire project lifecycle, from initial concept to deployment, using Docker, Jenkins, and AWS."
      ],
      images: [ IFImage ]
    }
  ];

  return (
    <div className="m-10">
      <h1 className="mt-10 text-3xl font-bold">Projects</h1>
      <div className="grid gap-10 grid-cols-2 mt-10">
        {projects.map((project, i) => (
          <div key={i} className="relative rounded-lg h-96 overflow-hidden flex justify-center items-center">
            {project.images.length > 0 && <>
              <Image
                src={project.images[0]}
                alt={project.title}
                fill={true}
                className="object-cover object-top"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-black bg-opacity-75"></div>
            </>}
            <h2 className="absolute text-2xl font-bold">{project.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
