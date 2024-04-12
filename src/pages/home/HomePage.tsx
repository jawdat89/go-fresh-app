import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { SiGooglestreetview } from "react-icons/si";

import GoFreshSm from "@/assets/icon/go-fresh-transparent-sm.png";
import LogoTransparent from "@/assets/icon/logo-1-transparent.png";
import Place from "@/assets/images/place.jpg";

export default function HomePage() {
  const HeroSection = () => {
    return (
      <section className="bg-primary-darker dark:bg-primary text-center py-20">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <img
              src={GoFreshSm}
              alt="Go Fresh Logo"
              className="mx-auto w-[25rem] h-24"
            />
            <img
              src={LogoTransparent}
              alt="Logo"
              className="mx-auto w-24 h-24 mr-2"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mt-4 ml-[17rem]">
              BE YOURSELF
            </h1>
          </div>
        </div>
      </section>
    );
  };
  const ModernContentSection = () => {
    return (
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-6 dark:text-white text-gray-800">
          בריא • טעים • מפנק
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold">
              פשוט מעולם אחר 🤤<span></span>
            </h3>
            <p className="mt-2">🍏🍊🍋🍌🍓🫐🥝</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold">פתוח כל ימי השבוע</h3>
            <p className="mt-2">בין השעות 15:00-23:00 🤗</p>
          </div>
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold">להזמנות ובירורים</h3>
            <a
              href="https://wa.me/0509133588"
              className="text-primary hover:text-secondary transition"
            >
              <span className="text-gray-700 pl-3">0509133588</span>
              <FaWhatsapp className="inline-block text-4xl" />
            </a>
          </div>
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
            href="https://instagram.com"
            className="text-primary hover:text-secondary transition"
          >
            <FaInstagram className="inline-block text-4xl" />
          </a>
          <a
            href="https://wa.me/0509133588"
            className="text-primary hover:text-secondary transition"
          >
            <FaWhatsapp className="inline-block text-4xl" />
          </a>
          <a
            href="https://www.tiktok.com/@go_.fresh?_t=8fuXgil4SgR&_r=1"
            className="text-primary hover:text-secondary transition duration-300"
          >
            <FaTiktok className="inline-block text-3xl mt-1" />
          </a>
        </div>
      </section>
    );
  };

  const ContactInfo = () => {
    return (
      <section className="bg-primary text-white text-center pt-3">
        <span className="flex justify-center mb-4">
          <SiGooglestreetview size={72} />
        </span>
        <div className="flex justify-center">
          <a
            className="cursor-pointer"
            href="https://www.google.com/maps/dir//go+fresh+kisra/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x151c31409e25b987:0xf9746a82b21177a5?sa=X&ved=1t:3061&ictx=111"
          >
            <img
              src={Place}
              alt="place"
              className="w-[25rem] h-[25rem] shadow-md rounded-full shadow-accent-100 hover:scale-110 duration-200"
            ></img>
          </a>
        </div>
        <p className="text-xl font-bold">כסרא, כסרא-סמיע</p>
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
