import { FaMobile, FaPlus, FaQuestionCircle, FaSitemap } from "react-icons/fa";
import { FaChartSimple, FaGear, FaLocationDot } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

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
          <PageLinkElement text="Dashboard" path="dashboard">
            <FaChartSimple />
          </PageLinkElement>
          <PageLinkElement text="Devices" path="devices">
            <FaMobile />
          </PageLinkElement>
          <PageLinkElement text="Network" path="network">
            <FaSitemap />
          </PageLinkElement>
          <PageLinkElement text="Map" path="map">
            <FaLocationDot />
          </PageLinkElement>
          <PageLinkElement text="Help" path="help">
            <FaQuestionCircle />
          </PageLinkElement>
        </div>
        <div>
          <PageLinkElement text="Settings" path="settings">
            <FaGear />
          </PageLinkElement>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link to={"/"}>
      <div className="cursor-pointer pr-4 pt-4 flex items-center gap-4">
        <div className="w-16 flex flex-row">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text-xl font-semibold">EcoSense</div>
      </div>
    </Link>
  );
}

// eslint-disable-next-line react/prop-types
function PageLinkElement({ children, text, path }) {
  return (
    <NavLink to={path} className="text-custom-light-gray">
      {({ isActive }) => (
        <div className="cursor-pointer flex flex-row items-center gap-3 text-lg">
          <div className={isActive ? "text-custom-main" : ""}>{children}</div>
          <div className={isActive ? "text-custom-gray font-semibold" : ""}>
            {text}
          </div>
        </div>
      )}
    </NavLink>
  );
}
