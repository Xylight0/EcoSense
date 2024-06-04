import { useContext, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Context } from "../AuthConext";
import getDocumentData from "../api/getDocumentData";
import moment from "moment";

export default function Devices() {
  const { user } = useContext(Context);
  const [deviceIDs, setDeviceIDs] = useState([]);
  const [allDeviceData, setAllDeviceData] = useState([]);

  useEffect(() => {
    const get = async () => {
      const userData = await getDocumentData({
        collectionName: "users",
        id: user?.uid,
      });
      setDeviceIDs(userData?.devices);
    };
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  function renderDeviceList() {
    const deviceOnline = (timestamp) => {
      const now = moment();
      const time = moment.unix(timestamp);
      return now.diff(time, "minutes") < 1;
    };

    return allDeviceData.map((device, index) => {
      const status = deviceOnline(device?.data?.temperature.slice(-1));

      return (
        <div
          key={index}
          className="grid grid-cols-4 gap-2 p-3 bg-custom-very-light-gray rounded-lg"
        >
          <div>{device?.id}</div>
          <div>Default</div>
          <div>{device?.data?.temperature?.length || "Not setup"}</div>
          <div className="flex flex-row gap-3 items-center">
            <div
              className={`w-3 h-3 rounded-lg ${
                status ? "bg-green-400" : "bg-red-400"
              }`}
            />
            {status ? "Online" : "Offline"}
          </div>
        </div>
      );
    });
  }

  return (
    <div className="p-8">
      <div className="p-6 bg-white rounded-xl">
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-lg">Devices</div>
          <div className="bg-custom-very-light-gray cursor-pointer px-3 py-1 rounded-md flex flex-row items-center gap-3">
            All
            <FaChevronDown className="text-custom-gray w-3.5 h-3.5" />
          </div>
        </div>
        <div className="w-full h-[2px] bg-[#F6F6F6] my-4" />
        <div className="font-medium grid grid-cols-4 gap-2 px-3">
          <div>ID</div>
          <div>Location</div>
          <div>Measurements</div>
          <div>Status</div>
        </div>
        <div className="flex flex-col pt-4 gap-4">{renderDeviceList()}</div>
      </div>
    </div>
  );
}
