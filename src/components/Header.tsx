'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { IBM_Plex_Mono } from 'next/font/google';

import { Container, NavButton, Sections } from "@/components";
import { useEffect, useState } from "react";

const ibmPlexMono = IBM_Plex_Mono({ weight: '400', subsets: ['latin'], display: 'swap' });

const TagLine: React.FC<{}> = () => (
  <div className={`relative pl-10 pt-6 text-4xl italic ${ibmPlexMono.className}`}>
    Alan Johnson
    <span className="p-5">{`//`}</span>
    Software Developer
  </div>
);

const sectionNames = [
  Sections.Services,
  Sections.Projects,
  Sections.Testimonials,
  Sections.WorkWithMe
];

export default function Header() {
  const [ activeSection, setActiveSection ] = useState('');

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
  }, []);

  return (
    
      <nav className="fixed top-0 right-0 pb-20 z-10 text-2xl font-bold pr-6 bg-gradient-to-b from-slate-300 w-full">
        <Container>
          <div className="flex justify-between mb-5">
            <TagLine />
            <ul className="flex justify-end mt-4">
              <li className="flex items-center">
                <a
                  href="tel:+18103215576"
                  className="transition-colors duration-300 hover:text-primary p-4 whitespace-nowrap"
                >
                  +1 810-321-5576
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="transition-colors duration-300 hover:text-primary py-2 px-4"
                  href="https://github.com/ajosephjohnson/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} width={25} height={25} />
                </a>
              </li>
              <li className="flex items-center">
                <a
                  className="transition-colors duration-300 hover:text-primary py-2 px-4"
                  href="https://www.linkedin.com/in/ajosephjohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} width={25} height={25} />
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex justify-center flex-wrap">
            {sectionNames.map(sectionName => (
              <li key={sectionName} className="flex items-center">
                <NavButton
                  sectionName={sectionName}
                  isActive={sectionName === activeSection}
                />
              </li>
            ))}
          </ul>
        </Container>
      </nav>
  );
}
