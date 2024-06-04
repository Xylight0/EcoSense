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
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../AuthConext";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import { getRealtimeDocumentData } from "../api/getRealtimeDocumentData";
import getDocumentData from "../api/getDocumentData";
import moment from "moment";

export default function Topbar() {
  const [deviceIDs, setDeviceIDs] = useState([]);
  const { user } = useContext(Context);
  const [deviceStatus, setDeviceStatus] = useState([]);

  useEffect(() => {
    const unsubscribe = getRealtimeDocumentData(
      { collectionName: "users", deviceID: user?.uid },
      (data) => {
        if (data) setDeviceIDs(data?.devices);
      }
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [allDeviceData, setAllDeviceData] = useState([]);

  useEffect(() => {
    getAllDeviceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceIDs]);

  async function getAllDeviceData() {
    const newArr = [];
    for (let i = 0; i < deviceIDs.length; i++) {
      let deviceData = await getDocumentData({
        collectionName: "devices",
        id: deviceIDs[i],
      });

      newArr.push({ data: deviceData, id: deviceIDs[i] });
    }

    setAllDeviceData(newArr);
  }

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < allDeviceData.length; i++) {
      const status = deviceOnline(
        allDeviceData[i]?.data?.temperature?.slice(-1)[0]
      );
      newArr.push(status || false);
    }
    setDeviceStatus(newArr);
  }, [allDeviceData]);

  const deviceOnline = (timestamp) => {
    if (!timestamp) return;
    timestamp = timestamp?.time;
    const now = moment();
    const time = moment.unix(timestamp);
    return now.diff(time, "minutes") < 1.2;
  };

  function getStatusText() {
    if (deviceStatus?.length === 0) return "No Devices Connected";
    console.log(deviceStatus);
    return deviceStatus?.includes(false)
      ? deviceStatus?.includes(true)
        ? "System Issues"
        : "System Offline"
      : "System Running";
  }

  function getStatusColor() {
    if (deviceStatus?.length === 0) return "bg-gray-500";
    return deviceStatus?.includes(false)
      ? deviceStatus?.includes(true)
        ? "bg-orange-400"
        : "bg-red-400"
      : "bg-green-400";
  }

  return (
    <div className="flex flex-row items-center justify-between p-6 w-full border-b-[1px] border-custom-border bg-white">
      <div className="flex flex-row gap-4">
        <Link to="devices">
          <StatusElement text={getStatusText()}>
            <div className={"w-3 h-3 rounded-full " + getStatusColor()} />
          </StatusElement>
        </Link>
        <Link to="devices">
          <StatusElement text={deviceIDs?.length}>
            <FaMobile className="text-custom-gray" />
          </StatusElement>
        </Link>
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
    <div className="bg-custom-very-light-gray cursor-pointer px-3 py-1 rounded-lg flex flex-row items-center gap-2">
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
