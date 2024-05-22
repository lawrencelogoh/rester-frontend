import styles from "@/styles/Footer.module.scss";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  const navigation = [
    { name: "Reverse Calculator", href: "#" },
    { name: "Mini Calculator", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
  ];

  const support = [
    { name: "FAQs", href: "#" },
    { name: "Guides & How-Tos", href: "#" },
    { name: "Report an Issue", href: "#" },
  ];
  const contact = [
    { name: "support@rester.com", href: "#" },
    { name: "050 xxx xxxx", href: "#" },
  ];

  const footerSocials = [
    {
      icon: <FaSquareFacebook size={20} />,
      link: "https://github.com/Psikwe?tab=repositories",
      key: "4",
    },
    {
      icon: <FaSquareXTwitter size={20} />,
      link: "https://www.linkedin.com/in/dennis-boateng-7136411b0/",
      key: "2",
    },
    {
      icon: <AiOutlineMail size={20} />,
      link: "mailto:Clinton.danso@service4gh.com",
      key: "3",
    },
    {
      icon: <AiOutlineWhatsApp size={20} />,
      link: "https://api.whatsapp.com/send?phone=447436942211",
      key: "1",
    },
  ];

  return (
    <>
      <footer className="flex flex-col mobile:flex-col row space-around">
        <div className="flex mobile:flex-col row space-around">
          <div className="flex column">
            <div className={`${styles.start} mobile:mb-2`}>Rester</div>
            {navigation.map((item) => (
              <a key={item.name} href={item.href}>
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex column">
            <div className={`${styles.footerHeader} mobile:mt-4`}>Support</div>
            {support.map((item) => (
              <a key={item.name} href={item.href}>
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex column">
            <div className={`${styles.footerHeader} mobile:mt-4`}>Contact</div>
            {contact.map((item) => (
              <a key={item.name} href={item.href}>
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-3 row">
          {footerSocials.map((f) => (
            <a key={f.key} target="_blank" href={f.link}>
              <ul>
                <li className="mr-8 text-gray-500 duration-500 hover:text-[#f67153] hover:-translate-y-1">
                  {f.icon}
                </li>
              </ul>
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
