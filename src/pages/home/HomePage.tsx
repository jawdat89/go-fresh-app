import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

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
      <section className="bg-gray-200 text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">
          עקוב אחרנו גם ברשתות החברתיות
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
      <section className="bg-primary text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-4">בקרו אצלנו</h2>
        <div className="flex justify-center">
          <img src={Place} alt="place" className="w-[25rem] h-[25rem]"></img>
        </div>
        <p>כסרא, כסרא-סמיע</p>
        <p>כיכר הסוס - סולט באשא</p>
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
