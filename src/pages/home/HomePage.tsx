// src/pages/home/HomePage.tsx
import { useState } from "react";
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { SiGooglestreetview } from "react-icons/si";
import { BsArrowRight } from "react-icons/bs";

import GoFreshSm from "@/assets/icon/go-fresh-transparent-sm.png";
import LogoTransparent from "@/assets/icon/logo-1-transparent.png";
import Place from "@/assets/images/place.jpg";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { isMobile, useMobileOrientation } from "react-device-detect";
import ContentItem from "@/components/ContentItemComponent";

export default function HomePage() {
  const [isMenuNavBtnHovered, setIsMenuNavBtnHovered] = useState(false);
  const [isGaleryNavBtnHovered, setIsGaleryNavBtnHovered] = useState(false);
  const navigate = useNavigate();

  const { isLandscape } = useMobileOrientation();

  const handleMoveToRoute = (route: string) => {
    navigate(route);
  };

  const HeroSection = () => {
    return (
      <section className="bg-primary text-center py-20">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row items-center mb-8 bg-slate-700 bg-opacity-10 border-secondary-lightest p-3 rounded-3xl">
            <img
              src={GoFreshSm}
              alt="Go Fresh Logo"
              className="w-40 md:w-60 h-auto"
            />
            <img
              src={LogoTransparent}
              alt="Logo"
              className="w-24 h-24 ml-4"
            />
          </div>
          <h1
            className={clsx(
              "text-4xl md:text-6xl font-bold drop-shadow-md text-white mb-4",
              isMobile && !isLandscape && "text-[1.9rem]"
            )}
          >
            אמץ את האותנטיות שלך
          </h1>
          <p className="text-lg md:text-2xl text-stone-300 mb-8 shadow-2xl">
            גלה את הטעם הטבעי של רעננות
          </p>
          <button
            onMouseEnter={() => setIsMenuNavBtnHovered(true)}
            onMouseLeave={() => setIsMenuNavBtnHovered(false)}
            onClick={() => handleMoveToRoute("/menu")}
            className="bg-secondary text-white font-bold py-2 px-6 rounded-2xl hover:bg-secondary-darker transition duration-500 ease-in-out"
          >
            <div className="inline-flex items-center">
              <BsArrowRight
                size={24}
                className={clsx(
                  "transform transition-transform",
                  isMenuNavBtnHovered ? "translate-x-2" : "translate-x-1"
                )}
              />
              <span className="ml-2">לתפריט</span>
            </div>
          </button>
        </div>
      </section>
    );
  };

  const ModernContentSection = () => {
    return (
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white">
          בריא • טעים • מפנק
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContentItem
            title="מקור האנרגיה הטבעי שלך"
            description="לחוות את האנרגיה המתוקה של הטבע"
            emoji="🍏🍊🍋🍌🍓🫐🥝"
          />
          <ContentItem
            title="פתוח כל ימי השבוע"
            description="בקרו אצלנו בין השעות 15:00-23:00"
          />
          <ContentItem
            title="להזמנות ובירורים"
            link="https://wa.me/+972509133588"
            linkText="050-913-3588"
            icon={<FaWhatsapp className="text-4xl p-1" />}
          />
        </div>
        <button
          onMouseEnter={() => setIsGaleryNavBtnHovered(true)}
          onMouseLeave={() => setIsGaleryNavBtnHovered(false)}
          onClick={() => handleMoveToRoute("/gallery")}
          className="bg-primary-darker text-white font-bold py-3 px-6 rounded-2xl mt-12 hover:bg-primary transition duration-500 ease-in-out"
        >
          <div className="inline-flex items-center">
            <BsArrowRight
              size={24}
              className={clsx(
                "transform transition-transform",
                isGaleryNavBtnHovered ? "translate-x-2" : "translate-x-0"
              )}
            />
            <span className="ml-2">הצג את הגלריה</span>
          </div>
        </button>
      </section>
    );
  };

  const SocialMediaLinks = () => {
    return (
      <section className="bg-gray-100 dark:bg-gray-100-dark py-16">
        <h2
          className={clsx(
            "text-3xl font-semibold mb-8 text-stone-700 dark:text-stone-300",
            isMobile ? "text-center" : "text-center"
          )}
        >
          צור איתנו קשר ברשתות החברתיות
        </h2>
        <div className="flex justify-center gap-8">
          <a
            href="https://www.instagram.com/go_.fresh/"
            aria-label="Instagram"
            className="text-primary-darker hover:text-secondary-darker dark:hover:text-secondary transition-transform transform hover:-translate-y-1 duration-300"
          >
            <FaInstagram className="text-4xl" />
          </a>
          <a
            href="https://wa.me/+972509133588"
            aria-label="WhatsApp"
            className="text-primary-darker hover:text-secondary-darker dark:hover:text-secondary transition-transform transform hover:-translate-y-1 duration-300"
          >
            <FaWhatsapp className="text-4xl" />
          </a>
          <a
            href="https://www.tiktok.com/@go_.fresh?_t=8fuXgil4SgR&_r=1"
            aria-label="TikTok"
            className="text-primary-darker hover:text-secondary-darker dark:hover:text-secondary transition-transform transform hover:-translate-y-1 duration-300"
          >
            <FaTiktok className="text-4xl" />
          </a>
        </div>
      </section>
    );
  };

  const ContactInfo = () => {
    return (
      <section className="bg-primary text-white text-center py-16">
        <div className="flex flex-col items-center">
          <SiGooglestreetview size={72} className="mb-4 text-stone-100 dark:text-stone-300 hover:text-stone-200 dark:hover:text-stone-100 cursor-pointer" />
          <h2 className="text-3xl font-semibold mb-4 dark:text-stone-300">מצא אותנו במפות Google</h2>
          <a
            href="https://www.google.com/maps/dir//go+fresh+kisra/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x151c31409e25b987:0xf9746a82b21177a5?sa=X&ved=1t:3061&ictx=111"
            className="inline-block"
          >
            <img
              src={Place}
              alt="place"
              className="w-72 md:w-96 h-72 md:h-96 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </a>
          <p className="text-xl font-bold mt-4">כסרא, כסרא-סמיע</p>
          <p className="text-xl font-bold">כיכר הסוס - סולטן באשא</p>
        </div>
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