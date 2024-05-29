/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import {
  FaBell,
  FaChevronDown,
  FaClock,
  FaMobile,
  FaMoon,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useContext, useState } from "react";
import { Context } from "../AuthConext";

export default function Topbar() {
  return (
    <div className="flex flex-row items-center justify-between p-6 w-full border-b-[1px] border-custom-border bg-white">
      <div className="flex flex-row gap-4">
        <StatusElement text="Online">
          <div className="w-3 h-3 rounded-full bg-green-600" />
        </StatusElement>
        <StatusElement text="13">
          <FaMobile className="text-custom-gray" />
        </StatusElement>
        <StatusElement text="15:34">
          <FaClock className="text-custom-gray" />
        </StatusElement>
      </div>
      <div className="flex flex-row items-center gap-8">
        <FunctionalElement>
          <FaMoon className="h-6 w-6" />
        </FunctionalElement>
        <FunctionalElement>
          <FaBell className="h-6 w-6" />
        </FunctionalElement>
        <ProfileElement />
      </div>
    </div>
  );
}

function ProfileElement() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { user } = useContext(Context);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(user);

  return (
    <div className="relative">
      <div
        onClick={() => setActive((cur) => !cur)}
        className="flex group cursor-pointer items-center flex-row gap-3"
      >
        <div className="p-2 rounded-full bg-custom-main">
          <FaUser className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="text-custom-gray">Nicolas G.</div>
        <FaChevronDown className="h-3.5 w-3.5 text-custom-light-gray group-hover:text-custom-gray" />
      </div>
      {active && (
        <div className="absolute right-0 top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md min-w-52">
          <div className="px-4 py-3 text-sm text-gray-900">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <div
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownInformationButton"
          >
            <Link to="/dashboard">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Dashboard
              </a>
            </Link>
            <Link to="/settings">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </Link>
           
          </div>
          <div onClick={handleLogout} className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusElement({ children, text }) {
  return (
    <div className="bg-[#F0F1F4] px-3 py-1 rounded-lg flex flex-row items-center gap-2">
      <div>{children}</div>
      <div>{text}</div>
    </div>
  );
}

function FunctionalElement({ children }) {
  return (
    <div className="text-custom-light-gray cursor-pointer hover:text-custom-gray">
      {children}
    </div>
  );
}
