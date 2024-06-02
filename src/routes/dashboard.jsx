import { LineChart } from "@mui/x-charts";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState } from "react";
import { FaChevronDown, FaWind } from "react-icons/fa";
import { FaArrowTrendUp, FaDroplet, FaTemperatureFull } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <div className="p-8 overflow-scroll w-fit flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <GaugeChartElement
          title="Average Temperature"
          percentage={-5}
          value={20}
          valueText="20C"
          icon={<FaTemperatureFull className="w-5 h-5 text-custom-main" />}
        />
        <GaugeChartElement
          title="Average Humidity"
          percentage={+30}
          value={30}
          valueText="30%"
          icon={<FaDroplet className="w-4 h-4 text-custom-main" />}
        />
        <GaugeChartElement
          title="Average Air Quality"
          percentage={0}
          value={90}
          valueText="90%"
          icon={<FaWind className="w-4 h-4 text-custom-main" />}
        />
      </div>
      <div>
        <LineChartElement />
      </div>
    </div>
  );
}

function LineChartElement() {
  const [showTemp, setShowTemp] = useState(true);
  const [showHumid, setShowHumid] = useState(true);
  const [showAir, setShowAir] = useState(true);

  return (
    <div className="p-5 flex flex-col bg-white rounded-2xl shadow-sm">
      <div className="flex flex-row justify-between items-center">
        <div className="font-medium flex flex-row gap-2 items-center">
          <FaArrowTrendUp className="w-5 h-5 text-custom-main" />
          Combined Trendline
        </div>
        <div className="bg-custom-light-main cursor-pointer px-2 py-1 rounded-md font-medium text-sm flex flex-row items-center gap-3">
          All <FaChevronDown />
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <LineChart
          width={710}
          height={320}
          series={[
            {
              data: showTemp ? [6, 3, 2, 8.5, 1.5, 5] : [],
              label: "Temperature",
              color: "Red",
            },
            {
              data: showHumid ? [2, 7, 2, 4, 0.5, 2] : [],
              label: "Humidity",
              color: "Orange",
            },
            {
              data: showAir ? [1, 12, 8, 5, 6, 2] : [],
              label: "Air Quality",
              color: "Blue",
            },
          ]}
          xAxis={[{ scaleType: "point", data: [1, 2, 3, 5, 8, 10] }]}
          yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
          rightAxis="rightAxisId"
          slotProps={{ legend: { hidden: true } }}
        />
      </div>
      <div className="flex flex-row gap-8">
        <div
          onClick={() => setShowTemp((cur) => !cur)}
          className="cursor-pointer flex flex-row gap-2 items-center text-sm"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          Temperature
        </div>
        <div
          onClick={() => setShowHumid((cur) => !cur)}
          className="cursor-pointer flex flex-row gap-2 items-center text-sm"
        >
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          Humidity
        </div>
        <div
          onClick={() => setShowAir((cur) => !cur)}
          className="cursor-pointer flex flex-row gap-2 items-center text-sm"
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          Air Quality
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function GaugeChartElement({ title, value, valueText, icon, percentage = 0 }) {
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
          {valueText}
        </div>
        <Gauge
          width={200}
          height={110}
          value={value}
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
      <div className="flex flex-row items-center gap-4">
        <div className="text-sm">This Week</div>
        <div
          className={
            "rounded-md px-2 py-1 text-[14px] text-black font-semibold " + percentageBGColor
          }
        >
          {percentageSign + percentage}%
        </div>
      </div>
    </div>
  );
}
