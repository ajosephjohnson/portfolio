import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { Seasons } from "./seasons";
import NavButton from "./NavButton";


const seasons = [ Seasons.Fall, Seasons.Winter, Seasons.Spring, Seasons.Summer ];

export default function Navigation() {
  return (
    <nav className="fixed top-0 right-0 z-10 text-white text-2xl font-bold">
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
        {seasons.map((season) => (
          <li key={season} className="flex items-center">
            <NavButton season={season} className="transition-colors duration-300 hover:text-tan py-2 px-4" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
