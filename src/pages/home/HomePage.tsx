import { useState } from "react";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { SiGooglestreetview } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";

import GoFreshSm from "@/assets/icon/go-fresh-transparent-sm.png";
import LogoTransparent from "@/assets/icon/logo-1-transparent.png";
import Place from "@/assets/images/place.jpg";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import ContentItem from "@/components/ContentItemComponent";

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useNavigate();

  const handleMoveToMenu = () => {
    router("/menu");
  };

  const HeroSection = () => {
    return (
      <section className="bg-primary-darker dark:bg-primary text-center pt-20 pb-5">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <img
              src={GoFreshSm}
              alt="Go Fresh Logo"
              className="mx-auto w-[15rem] md:w-[25rem] h-18 md:h-24"
            />
            <img
              src={LogoTransparent}
              alt="Logo"
              className="mx-auto w-24 h-24 mr-2"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-4xl font-bold text-white mt-4 ml-[13.5rem] md:ml-[17rem]">
              BE YOURSELF
            </h1>
          </div>
        </div>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleMoveToMenu}
          className="bg-secondary text-white font-bold py-3 px-6 rounded-full mt-6 hover:bg-secondary-darker transition duration-500 ease-in-out"
        >
          <div className="inline-flex items-center pt-2">
            <BsArrowRight
              size={24}
              className={clsx(
                "transform transition-transform",
                isHovered ? "translate-x-2" : "translate-x-0"
              )}
            />
            <span className="mx-1">מעבר לתפריט</span>
          </div>
        </button>
      </section>
    );
  };
  const ModernContentSection = () => {
    return (
      <section className="container mx-auto px-4 py-20 bg-transparent dark:bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-6 dark:text-white text-gray-800">
          בריא • טעים • מפנק
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ContentItem
            title="מקור האנרגיה הטבעית שלך 🌱"
            description="טעמו את האנרגיה המתוקה של הטבע"
            emoji="🍏🍊🍋🍌🍓🫐🥝"
          />
          <ContentItem
            title="פתוח כל ימי השבוע"
            description="בין השעות 15:00-23:00 🤗"
          />
          <ContentItem
            title="להזמנות ובירורים"
            link="https://wa.me/+972509133588"
            linkText="0509133588"
            icon={<FaWhatsapp className="text-4xl" />}
          />
        </div>
      </section>
    );
  };

  const SocialMediaLinks = () => {
    return (
      <section className="bg-gray-200 text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">
          מצא אותנו ברשתות החברתיות
        </h2>
        <div className="flex justify-center align-center gap-x-4">
          <a
            href="https://www.instagram.com/go_.fresh/"
            className="text-primary-darker hover:text-secondary-darker transition"
          >
            <FaInstagram className="inline-block text-4xl" />
          </a>
          <a
            href="https://wa.me/+972509133588"
            className="text-primary-darker hover:text-secondary-darker transition"
          >
            <FaWhatsapp className="inline-block text-4xl" />
          </a>
          <a
            href="https://www.tiktok.com/@go_.fresh?_t=8fuXgil4SgR&_r=1"
            className="text-primary-darker hover:text-secondary-darker transition duration-300"
          >
            <FaTiktok className="inline-block text-3xl mt-1" />
          </a>
        </div>
      </section>
    );
  };

  const ContactInfo = () => {
    return (
      <section className="bg-primary text-white text-center py-3">
        <span className="grid grid-rows-2 grid-cols-1">
          <SiGooglestreetview size={72} className="mx-auto" />
          <h2 className="text-2xl font-semibold">גוגל מפות</h2>
        </span>
        <div className="flex justify-center">
          <a
            className="cursor-pointer"
            href="https://www.google.com/maps/dir//go+fresh+kisra/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x151c31409e25b987:0xf9746a82b21177a5?sa=X&ved=1t:3061&ictx=111"
          >
            <img
              src={Place}
              alt="place"
              className="w-[18rem] md:w-[25rem] h-[18rem] md:h-[25rem] shadow-md rounded-full shadow-accent-100 hover:scale-110 duration-200
              transition-transform -translate-y-4"
            ></img>
          </a>
        </div>
        <p className="text-xl font-bold mt-2">כסרא, כסרא-סמיע</p>
        <p className="text-xl font-bold">כיכר הסוס - סולטן באשא</p>
      </section>
    );
  };

  return (
    <div>
      <HeroSection />
      <ModernContentSection />
      <SocialMediaLinks />
      <ContactInfo />
    </div>
  );
}
