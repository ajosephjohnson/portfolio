'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { NavButton, Sections } from "@/components";
import { useEffect, useState } from "react";


export default function Navigation() {
  const [ activeSection, setActiveSection ] = useState('');

  const sectionNames = [
    Sections.Services,
    Sections.Projects,
    Sections.Testimonials,
    Sections.HireMe
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When a section is intersecting with the viewport set the link to active
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    // Observe each page section
    sectionNames.forEach(section => {
      const sectionEl = document.getElementById(section);
      if (sectionEl) {
        observer.observe(sectionEl);
      }
    });

    return () => observer.disconnect();
  }, [ sectionNames ]);

  return (
    <nav className="fixed top-0 right-0 z-10 text-white text-2xl font-bold mr-6">
      <ul className="flex justify-end mt-5">
        <li className="flex items-center">
          <a
            href="tel:+15042326584"
            className="transition-colors duration-300 hover:text-tan py-2 px-4"
          >
            +1 504-232-6584
          </a>
        </li>
        <li className="flex items-center">
          <a
            className="transition-colors duration-300 hover:text-tan py-2 px-4"
            href="https://github.com/ajosephjohnson/portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} width={25} height={25} />
          </a>
        </li>
        <li className="flex items-center">
          <a
            className="transition-colors duration-300 hover:text-tan py-2 px-4"
            href="https://www.linkedin.com/in/ajosephjohnson"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} width={25} height={25} />
          </a>
        </li>
      </ul>
      <ul className="flex">
        {sectionNames.map(sectionName => (
          <li key={sectionName} className="flex items-center">
            <NavButton
              sectionName={sectionName}
              isActive={sectionName === activeSection}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
