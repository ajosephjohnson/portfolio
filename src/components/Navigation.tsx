import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { Seasons } from "./seasons";
import NavButton from "./NavButton";


const seasons = [ Seasons.Fall, Seasons.Winter, Seasons.Spring, Seasons.Summer ];

export default function Navigation() {
  return (
    <nav className="fixed top-0 right-0 z-10 text-white text-2xl font-bold">
      <ul className="flex">
        {seasons.map((season) => (
          <li key={season} className="flex items-center">
            <NavButton season={season} />
          </li>
        ))}
        <li className="flex items-center">
          <a
            className="transition-colors duration-300 hover:text-tan py-5 px-4"
            href="https://github.com/ajosephjohnson/portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} width={25} height={25} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
