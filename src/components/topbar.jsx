/* eslint-disable react/prop-types */
import { signOut } from "firebase/auth";
import {
  FaBell,
  FaChevronDown,
  FaMobile,
  FaMoon,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useContext, useRef, useState } from "react";
import { Context } from "../AuthConext";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

export default function Topbar() {
  return (
    <div className="flex flex-row items-center justify-between p-6 w-full border-b-[1px] border-custom-border bg-white">
      <div className="flex flex-row gap-4">
        <StatusElement text="No Issues">
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </StatusElement>
        <StatusElement text="13">
          <FaMobile className="text-custom-gray" />
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
  const wrapperRef = useRef(null);
  useOutsideAlerter({ ref: wrapperRef, stateFnc: setActive });

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

  return (
    <div className="relative">
      <div
        onClick={() => setActive((cur) => !cur)}
        className="flex group cursor-pointer items-center flex-row gap-3"
      >
        <div className="p-2 rounded-full bg-custom-main">
          <FaUser className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="text-custom-gray">{user.displayName}</div>
        <FaChevronDown className="h-3.5 w-3.5 text-custom-light-gray group-hover:text-custom-gray" />
      </div>
      {active && (
        <div
          ref={wrapperRef}
          className="absolute right-0 top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md min-w-52"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div>{user.displayName}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <div
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownInformationButton"
          >
            <Link onClick={() => setActive(false)} to="/dashboard">
              <div className="block px-4 py-2 hover:bg-gray-100">Dashboard</div>
            </Link>
            <Link onClick={() => setActive(false)} to="/settings">
              <div className="block px-4 py-2 hover:bg-gray-100">Settings</div>
            </Link>
          </div>
          <div onClick={handleLogout} className="py-2">
            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign out
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusElement({ children, text }) {
  return (
    <div className="bg-custom-very-light-gray px-3 py-1 rounded-lg flex flex-row items-center gap-2">
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
