import { FaMobile, FaPlus, FaQuestionCircle, FaSitemap } from "react-icons/fa";
import { FaChartSimple, FaGear, FaLocationDot } from "react-icons/fa6";
import logo from "../assets/logo.png";

export default function Sidebar() {
  return (
    <div className="px-3 flex flex-col h-full border-r-[1px] border-custom-border bg-white">
      <Logo />
      <div className="group cursor-pointer px-4 py-3 mt-16 bg-custom-main rounded-lg flex flex-row justify-between items-center text-white">
        <div className="font-medium">ADD DEVICE</div>
        <FaPlus className="w-5 h-5 group-hover:rotate-90 transition-all transform" />
      </div>
      <div className="mt-6 p-6 flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-7">
          <PageLinkElement text="Dashboard">
            <FaChartSimple />
          </PageLinkElement>
          <PageLinkElement text="Devices">
            <FaMobile />
          </PageLinkElement>
          <PageLinkElement text="Network">
            <FaSitemap />
          </PageLinkElement>
          <PageLinkElement text="Map">
            <FaLocationDot />
          </PageLinkElement>
          <PageLinkElement text="Help">
            <FaQuestionCircle />
          </PageLinkElement>
        </div>
        <div>
          <PageLinkElement text="Settings">
            <FaGear />
          </PageLinkElement>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="pr-4 pt-4 flex items-center gap-4">
      <div className="w-16 flex flex-row">
        <img src={logo} alt="Logo" />
      </div>
      <div className="text-xl font-semibold">EcoSense</div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function PageLinkElement({ children, text }) {
  return (
    <div className="group cursor-pointer flex flex-row text-custom-light-gray items-center gap-3 text-lg">
      <div className="group-hover:text-custom-main">{children}</div>
      <div className="group-hover:text-custom-gray group-hover:font-semibold">
        {text}
      </div>
    </div>
  );
}
