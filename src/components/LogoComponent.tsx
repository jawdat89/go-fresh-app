import LogoTransparent from "@/assets/icon/logo-1-transparent.png";
import shape from "@/assets/icon/shape-transparent.png";

export default function LogoComponent() {
  return (
    <>
      <img
        src={LogoTransparent}
        alt="Logo"
        className="flex-none bg-primary rounded-full p-1 w-12 h-12"
      />
      <div className="grid justify-items-stretch mr-2 flex-grow">
        <div className="flex items-center text-lg font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-primary via-stone-400 to-secondary-darker">
          <span>Fresh</span>
          <img src={shape} alt="shape" className="w-8 h-8 mx-[0.05rem]" />{" "}
          <span>Go</span>
        </div>
        <p className="text-sm font-bold  text-secondary dark:text-secondary-lighter justify-self-start">
          Be Your Self
        </p>
      </div>
    </>
  );
}
