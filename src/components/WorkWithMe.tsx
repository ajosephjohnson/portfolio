import { PropsWithChildren } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, IconDefinition, faFile } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";


function ContactLink ({ icon, href, children }: PropsWithChildren<{ icon: IconDefinition, href: string }>) {
  const isPhoneNumber = href.startsWith("tel:");
  return (
    <a
      href={href}
      {...(!isPhoneNumber && { target: "_blank", rel: "noopener noreferrer" })}
      className="z-10 transition-colors duration-300 hover:text-primary text-xl font-bold ml-5"
    >
      <FontAwesomeIcon icon={icon} width={25} height={25} className="mr-2" />
      {children}
    </a>
  );
}

export default function WorkWithMe() {
  return (
    <div className="m-10">
      <div className="grid m-10 gap-10 grid-cols-2 mt-20">
        <ContactLink icon={faPhone} href="tel:+18103215576">
          +1 810-321-5576
        </ContactLink>
        <ContactLink icon={faEnvelope} href="mailto:ajosephjohnson@gmail.com">
          ajosephjohnson@gmail.com
        </ContactLink>
        <ContactLink icon={faGithub} href="https://github.com/ajosephjohnson/portfolio">
          @ajosephjohnson
        </ContactLink>
        <ContactLink icon={faLinkedin} href="https://www.linkedin.com/in/ajosephjohnson">
          @ajosephjohnson
        </ContactLink>
        <ContactLink icon={faFile} href="https://www.icloud.com/pages/0f8sszk1RPA9GptmBN4QsTo6g#Alan%5FJohnson%5FResume%5F2023">
          View My Resume
        </ContactLink>
      </div>
    </div>
  );
}
