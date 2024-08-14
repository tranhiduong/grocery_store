import React from 'react';
import {
  FaInstagram,
  FaDribbble,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    { label: "YouTube", icon: FaYoutube },
    { label: "Instagram", icon: FaInstagram },
    { label: "Twitter", icon: FaXTwitter },
    { label: "Dribbble", icon: FaDribbble },
  ];

  const links = [
    [
      { label: "Company", key: "header-1" },
      { label: "About us", key: "item-1-1" },
      { label: "Blog", key: "item-1-2" },
      { label: "Contact us", key: "item-1-3" },
      { label: "Pricing", key: "item-1-4" },
      { label: "Testimonials", key: "item-1-5" },
    ],
    [
      { label: "Support", key: "header-2" },
      { label: "Help center", key: "item-2-1" },
      { label: "Terms of service", key: "item-2-2" },
      { label: "Legal", key: "item-2-3" },
      { label: "Privacy policy", key: "item-2-4" },
      { label: "Status", key: "item-2-5" },
    ],
  ];

  return (
    <div className="app flex flex-col items-center font-poppins">
      <div className="py-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 bg-gray-800 text-white w-full p-4 relative">
        <div>
          <div className="footer-img flex items-center">
            <span className="text-3xl font-bold pl-2 text-white">
              Grocery Store
            </span>
          </div>
          <div className="infos text-white">
            <span>Copyright © 2024 Grocery Store ltd.</span>
            <span>All rights reserved</span>
          </div>
          <div className="footer-icons flex items-center space-x-3">
            {socialLinks.map((socialLink, index) => {
              const Icon = socialLink.icon;
              return (
                <Icon
                  key={`social-${index}`}
                  className="w-14 h-14 p-2 rounded-full bg-green-700 hover:bg-white hover:text-green-700 cursor-pointer"
                />
              );
            })}
          </div>
        </div>
        <div className="mx-2 grid w-full py-5 sm:py-0 grid-cols-2 ">
          {links.map((col, index) => (
            <ul className={`col col-${index + 1}`} key={`col-${index}`}>
              {col.map((link, index) => (
                <li
                  key={`link-${col}-${index}`}
                  className={`text-white cursor-pointer ${
                    link.key === "header-1" || link.key === "header-2"
                      ? "text-2xl text-white"
                      : ""
                  }`}
                >
                  {link.label}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="footer-form flex flex-col">
          <label className="text-lg font-semibold text-white">
            Stay up to date
          </label>
          <input
            type="email"
            placeholder="Subscribe to our email"
            className="mt-2 w-full border-none rounded-lg py-3 px-6"
          />
        </div>
      </div>
      <div className="w-full p-4 bg-gray-700">
        <div className="text-white text-lg font-semibold mb-2">Find Us</div>
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.280462161647!2d106.685498!3d10.761028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b1c7032c71f%3A0x80a50c7b8fc03a0!2sTon%20Duc%20Thang%20University!5e0!3m2!1sen!2s!4v1637527249326!5m2!1sen!2s"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Footer;
