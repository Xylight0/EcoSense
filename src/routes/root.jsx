import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import welcome_illustration from "../assets/dashboard_start_screen.png";
import { useOutlet } from "react-router-dom";

export default function Root() {
  const outlet = useOutlet();

  return (
    <div className="flex flex-row w-full h-full font-montserrat">
      <Sidebar />
      <div className="flex flex-col w-full h-full bg-custom-bg">
        <Topbar />
        {outlet || <Illustration />}
      </div>
    </div>
  );
}

function Illustration() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <img className="opacity-60 h-[70%]" src={welcome_illustration} />
    </div>
  );
}
