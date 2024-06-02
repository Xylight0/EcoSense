import {
  FaIdCard,
  FaKey,
  FaMobile,
  FaPlus,
  FaQuestionCircle,
  FaSitemap,
} from "react-icons/fa";
import { FaChartSimple, FaGear, FaLocationDot } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { FieldValue, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Context } from "../AuthConext";

export default function Sidebar() {
  return (
    <div className="px-3 flex flex-col h-full border-r-[1px] border-custom-border bg-white">
      <Logo />
      <AddDevice />
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

function AddDevice() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deviceID, setDeviceID] = useState("");
  const { user } = useContext(Context);

  console.log(deviceID);
  useEffect(() => {
    setDeviceID("");
  }, [active]);

  console.log(user)

  async function addDeviceHandler() {
    setLoading(true);
    setActive(false);
    setLoading(false);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        devices: arrayUnion(deviceID),
      });
      console.log("Device added to user successfully.");
    } catch (error) {
      console.error("Error adding device to user:", error);
    }
  }

  return (
    <div>
      <div
        onClick={() => setActive(true)}
        className="group cursor-pointer px-4 py-3 mt-16 bg-custom-main rounded-lg flex flex-row justify-between items-center text-white"
      >
        <div className="font-medium">ADD DEVICE</div>
        <FaPlus className="w-5 h-5 group-hover:rotate-90 transition-all transform" />
      </div>
      {active && (
        <div className="absolute z-10 top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="z-10 rounded-2xl p-6 bg-white font-semibold">
            <div className="text-lg">Add New Measurement Device</div>
            <div className="mt-10">
              <label
                htmlFor="input-id"
                className="block mb-2 text-sm font-medium text-custom-gray"
              >
                Device ID
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaKey className="text-custom-gray" />
                </div>
                <input
                  type="number"
                  id="input-id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-main focus:border-custom-main block w-full ps-10 p-2.5"
                  placeholder="xxxxxxxx"
                  onChange={(e) => setDeviceID(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <button
                disabled={!deviceID}
                onClick={addDeviceHandler}
                className={`${
                  loading && "bg-custom-main-dark"
                } flex justify-center items-center text-center cursor-pointer disabled:bg-custom-light-gray hover:bg-custom-main-dark text-white font-medium p-3 rounded-lg bg-custom-main`}
              >
                {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-custom-bg"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div>Search Device</div>
                )}
              </button>
              <button
                onClick={() => setActive(false)}
                className={`${
                  loading && "bg-custom-main-dark"
                } flex justify-center items-center text-center cursor-pointer text-custom-gray bg-custom-light-main font-medium p-3 rounded-lg`}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="absolute w-full h-full bg-custom-main opacity-40" />
        </div>
      )}
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
