export default function Testimonials() {
  const testimonials = [
    {
      name: "Owen Miller",
      title: "Principal Software Engineer | Sweet",
      relationship: "Worked on the same team",
      testimonial: "Alan gets things done; and enables the rest of the team too.",
    },
    {
      name: "Peter Wang",
      relationship: "Freelance client",
      testimonial: "Good work from Alan. He is very responsive, professional and attend to detail, it was a pleasure working with him!"
    },
    {
      name: "Olena Radkovska",
      title: "QA Engineer | Veea",
      relationship: "Worked on the same team",
      testimonial: "Alan is one of the greatest people I had the honour to work with. He is always organized, with great leading skills, searching for better solutions. He doesn't keep aside from the problem but always tries to solve it. Amazing team player: he helps, advises, if required, discusses in meeting with managers about issues you happen to have. He is a person who will always ask about your personal life, somebody who very soon becomes a friend not only a college, even if you are physically located on different continents. I would like to recommend Alan because I think he is the best candidate for a leading position in any company.",
    },
    {
      name: "Kathryn Lemoine",
      title: "Chief Operating Officer | The Moran Group",
      relationship: "Direct manager",
      testimonial: "Alan is wonderful to work with. He is forward looking, continually thinking of ideas to solve problems. I had the privilege of being Alan’s manager and working with Alan for 4 years. Alan is the type of team member everyone wants on their team - talented, friendly, always eager to learn new skills and help the rest of the team. When discussing challenges, opportunities, and new ideas, Alan would explore the best solutions and lead our team of developers to implement the most effective and efficient javascript applications, mobile applications, or alternate solutions. I would highly recommend Alan.",
    },
  ];

  return (
    <div className="m-10">
      <h1 className="mt-10 text-3xl font-bold">Testimonials</h1>
      <div className="grid gap-10 grid-cols-2">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className={`rounded-lg p-10 ${i < 2 ? 'bg-gradient-to-t' : 'bg-gradient-to-b'} from-day-sky-common dark:from-night-sky-common to-transparent dark:bg-night-sky-common`}
          >
            <h2 className="text-2xl mb-4">{testimonial.name}</h2>
            <h2 className="text-xl mb-4">{testimonial.title}</h2>
            <h3 className="text-lg mb-4">{testimonial.relationship}</h3>
            <p>{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
