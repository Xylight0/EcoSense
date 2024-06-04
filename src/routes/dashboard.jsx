/* eslint-disable react/prop-types */
import { LineChart } from "@mui/x-charts";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useContext, useEffect, useRef, useState } from "react";
import { FaChevronDown, FaClock, FaMobile, FaWind } from "react-icons/fa";
import { FaArrowTrendUp, FaDroplet, FaTemperatureFull } from "react-icons/fa6";
import getAllDocumentIds from "../api/getAllDocumentIds";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import moment from "moment";
import { getRealtimeDocumentData } from "../api/getRealtimeDocumentData";
import { Context } from "../AuthConext";
import getDocumentData from "../api/getDocumentData";

export default function Dashboard() {
  const [deviceData, setDeviceData] = useState([]);
  const [deviceIDs, setDeviceIDs] = useState([]);
  const [currentDeviceID, setCurrentDeviceID] = useState("Select Device");

  useEffect(() => {
    if (!currentDeviceID) return;

    const unsubscribe = getRealtimeDocumentData(
      { collectionName: "devices", deviceID: currentDeviceID },
      (data) => {
        if (data) setDeviceData(data);
      }
    );

    // Cleanup subscription on unmount or when currentDeviceID changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentDeviceID]);

  function calcAverage(temperatures) {
    if (!temperatures || temperatures.length === 0) {
      return null;
    }

    const totalTemperature = temperatures.reduce(
      (total, temp) => total + temp,
      0
    );
    const averageTemperature = totalTemperature / temperatures.length;

    return averageTemperature.toFixed(1);
  }

  return (
    <div className="p-8 overflow-scroll w-fit flex flex-col gap-4">
      <div>
        <ToolBarElement
          deviceIDs={deviceIDs}
          setDeviceIDs={setDeviceIDs}
          setCurrentDeviceID={setCurrentDeviceID}
          currentDeviceID={currentDeviceID}
          lastElement={deviceData?.temperature?.slice(-1)[0]}
        />
      </div>
      <div className="flex flex-row gap-4">
        <GaugeChartElement
          title="Average Temperature"
          percentage={0}
          valueMax={50}
          value={calcAverage(
            deviceData?.temperature?.map((elem) => +elem?.data)
          )}
          symbol="°C"
          icon={<FaTemperatureFull className="w-5 h-5 text-custom-main" />}
        />
        <GaugeChartElement
          title="Average Humidity"
          percentage={0}
          valueMax={100}
          value={calcAverage(deviceData?.humidity?.map((elem) => +elem?.data))}
          symbol="%"
          icon={<FaDroplet className="w-4 h-4 text-custom-main" />}
        />
        <GaugeChartElement
          title="Average Air Quality"
          percentage={0}
          valueMax={100}
          value={calcAverage(deviceData?.air_qual?.map((elem) => +elem?.data))}
          symbol="%"
          icon={<FaWind className="w-4 h-4 text-custom-main" />}
        />
      </div>
      <div>
        <LineChartElement data={deviceData} />
      </div>
    </div>
  );
}

function ToolBarElement({
  deviceIDs,
  setCurrentDeviceID,
  currentDeviceID,
  lastElement,
  setDeviceIDs,
}) {
  const [active, setActive] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter({ ref: wrapperRef, stateFnc: setActive });

  const { user } = useContext(Context);

  useEffect(() => {
    const get = async () => {
      const userData = await getDocumentData({
        collectionName: "users",
        id: user?.uid,
      });
      setDeviceIDs(userData?.devices);
    };
    get();
  });

  function renderIDs() {
    return deviceIDs.map((id) => {
      return (
        <div
          key={id}
          onClick={() => setCurrentDeviceID(id)}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          {id}
        </div>
      );
    });
  }

  const deviceOnline = (timestamp) => {
    const now = moment();
    const time = moment.unix(timestamp);
    return now.diff(time, "minutes") < 1;
  };

  return (
    <div className="p-4 flex flex-row bg-white rounded-2xl shadow-sm justify-between">
      <div className="flex flex-row gap-4 items-center">
        <StatusElement
          text={deviceOnline(lastElement?.time) ? "Online" : "Offline"}
        >
          <div
            className={`w-3 h-3 rounded-full ${
              currentDeviceID === "Select Device" ||
              !deviceOnline(lastElement?.time)
                ? "bg-red-400"
                : "bg-green-500"
            }`}
          />
        </StatusElement>
        <StatusElement text={currentDeviceID === "Select Device" ? 0 : 1}>
          <FaMobile className="text-custom-gray" />
        </StatusElement>
        <StatusElement
          text={
            lastElement
              ? moment.unix(lastElement?.time).format("DD/MM/YY, h:m  m A")
              : "No Date"
          }
        >
          <FaClock className="text-custom-gray" />
        </StatusElement>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="font-medium">Device:</div>
        <div
          onClick={() => setActive((cur) => !cur)}
          className="relative bg-custom-very-light-gray cursor-pointer px-3 py-1 rounded-lg flex flex-row items-center gap-2"
        >
          <div> {currentDeviceID}</div>
          <FaChevronDown className="text-custom-gray w-3.5 h-3.5" />
          {active && (
            <div
              ref={wrapperRef}
              className="absolute right-0 top-14 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md min-w-52"
            >
              <div className="px-4 py-3 text-gray-900 font-medium">
                <div>Your Devices</div>
              </div>
              <div className="py-2">{renderIDs()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function StatusElement({ children, text }) {
  return (
    <div className="bg-custom-very-light-gray px-3 py-1 rounded-lg flex flex-row items-center gap-2">
      <div>{children}</div>
      <div>{text}</div>
    </div>
  );
}

function LineChartElement({ data }) {
  const [showTemp, setShowTemp] = useState(true);
  const [showHumid, setShowHumid] = useState(true);
  const [showAir, setShowAir] = useState(true);
  const [dataPoints, setDataPoints] = useState([]);
  const [dataXAxis, setDataXAxis] = useState([]);

  useEffect(() => {
    dataCleaner(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function dataCleaner(data) {
    if (!data) return;
    let { temperature, humidity, air_qual } = data;

    temperature = temperature?.map((val) => {
      return {
        value: Number(val.data),
        time: moment.unix(val.time).format(),
      };
    });

    humidity = humidity?.map((val) => {
      return {
        value: Number(val.data),
        time: moment.unix(val.time).format(),
      };
    });

    air_qual = air_qual?.map((val) => {
      return {
        value: Number(val.data),
        time: moment.unix(val.time).format(),
      };
    });

    getDataPoints({ temperature, humidity, air_qual });
  }

  function getDataPoints(cleanData) {
    const LENGTH = -30;

    const dataPointsTemp = cleanData?.temperature
      ?.map((object) => object.value)
      .slice(LENGTH);

    const dataPointsHumid = cleanData?.humidity
      ?.map((object) => object.value)
      .slice(LENGTH);

    const dataPointsAir = cleanData?.air_qual
      ?.map((object) => object.value)
      .slice(LENGTH);

    setDataPoints({ dataPointsTemp, dataPointsHumid, dataPointsAir });
    normalizeTimestamps(cleanData?.temperature?.slice(LENGTH));
  }

  const normalizeTimestamps = (timestamps) => {
    timestamps = timestamps?.map((obj) => {
      return moment(obj.time).format("h:mm A");
    });

    setDataXAxis(timestamps);
  };

  const showChart =
    dataPoints?.dataPointsTemp?.length > 1 ||
    dataPoints?.dataPointsHumid?.length > 1 ||
    dataPoints?.dataPointsAir?.length > 1;

  return (
    <div className="p-5 flex flex-col bg-white rounded-2xl shadow-sm">
      <div className="flex flex-row justify-between items-center">
        <div className="font-medium flex flex-row gap-2 items-center">
          <FaArrowTrendUp className="w-5 h-5 text-custom-main" />
          Combined Trendline
        </div>
        <div className="bg-custom-very-light-gray cursor-pointer px-3 py-1 rounded-md flex flex-row items-center gap-3">
          30min
          <FaChevronDown className="text-custom-gray w-3.5 h-3.5" />
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        {showChart ? (
          <LineChart
            width={710}
            height={320}
            series={[
              {
                data: showTemp ? dataPoints?.dataPointsTemp : [],
                label: "Temperature (°C)",
                color: "Red",
              },
              {
                data: showHumid ? dataPoints?.dataPointsHumid : [],
                label: "Humidity (%)",
                color: "Blue",
              },
              {
                data: showAir ? dataPoints?.dataPointsAir : [],
                label: "Air Quality (%)",
                color: "Orange",
              },
            ]}
            xAxis={[{ scaleType: "point", data: dataXAxis }]}
            yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
            slotProps={{ legend: { hidden: true } }}
          />
        ) : (
          <div className="p-16 font-medium">No Data Available</div>
        )}
      </div>
      <div className="flex flex-row gap-8">
        <div
          onClick={() => setShowTemp((cur) => !cur)}
          className="cursor-pointer flex flex-row gap-2 items-center text-sm"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              showTemp ? "bg-red-400" : "bg-red-200"
            }`}
          />
          Temperature (°C)
        </div>
        <div
          onClick={() => setShowHumid((cur) => !cur)}
          className="cursor-pointer flex flex-row gap-2 items-center text-sm"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              showHumid ? "bg-blue-400" : "bg-blue-200"
            }`}
          />
          Humidity (%)
        </div>
        <div
          onClick={() => setShowAir((cur) => !cur)}
          className="cursor-pointer flex flex-row gap-2 items-center text-sm"
        >
          <div
            className={`w-3 h-3 rounded-full ${
              showAir ? "bg-orange-400" : "bg-orange-200"
            }`}
          />
          Air Quality (%)
        </div>
      </div>
    </div>
  );
}

function GaugeChartElement({
  title,
  value,
  valueMax,
  symbol,
  icon,
  percentage = 0,
}) {
  const percentageBGColor =
    percentage < 0
      ? "bg-custom-red"
      : percentage > 0
      ? "bg-custom-green"
      : "bg-custom-light-main";

  const percentageSign = percentage > 0 && "+";

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm">
      <div className="font-medium flex flex-row gap-2 items-center">
        {icon}
        {title}
      </div>
      <div className="relative my-2">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 font-medium text-xl">
          {(value > 0 ? value : 0) + symbol}
        </div>
        <Gauge
          width={200}
          height={110}
          value={+value}
          valueMax={valueMax}
          startAngle={-100}
          endAngle={100}
          sx={() => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 0,
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#6647E2",
            },
          })}
        />
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="text-sm">This Week</div>
        <div
          className={
            "rounded-md px-2 py-1 text-[14px] text-black font-semibold " +
            percentageBGColor
          }
        >
          {percentageSign + percentage}%
        </div>
      </div>
    </div>
  );
}
