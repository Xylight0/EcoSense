import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function Root() {
  return (
    <div className="flex flex-row w-full h-full font-mon">
      <Sidebar />
      <div className="flex flex-col w-full h-full bg-custom-bg">
        <Topbar />
      </div>
    </div>
  );
}
