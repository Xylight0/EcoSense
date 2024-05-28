import { FaEnvelope, FaKey, FaReact } from "react-icons/fa";
import logo from "../assets/logo.png";
import dashboardPreview from "../assets/dashboard_preview.png";
import abstractBG from "../assets/abstract_bg.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  return (
    <div className="font-montserrat w-full h-full flex flex-row flex-1">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex-1 flex justify-center items-center">
          <LoginModal />
        </div>
        <Footer />
      </div>
      <div className="flex-1 p-10">
        <Preview />
      </div>
    </div>
  );
}

function LoginModal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-4 mb-12">
        <img src={logo} className="w-12 h-12" />
        <div className="font-semibold text-3xl">EcoSense</div>
      </div>

      <div className="font-semibold text-3xl">Login into your account.</div>
      <div className="font-normal text-lg mt-2">
        Enter your E-Mail and Password to login.
      </div>

      <div className="mt-10">
        <label
          htmlFor="input-group-1"
          className="block mb-2 text-sm font-medium text-custom-gray"
        >
          Your Email
        </label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FaEnvelope className="text-custom-gray" />
          </div>
          <input
            type="email"
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-main focus:border-custom-main block w-full ps-10 p-2.5"
            placeholder="name@flowbite.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-custom-gray"
      >
        Your Password
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <FaKey className="text-custom-gray" />
        </div>
        <input
          type="password"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-main focus:border-custom-main block w-full ps-10 p-2.5"
          placeholder="**********"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-6 mt-2 cursor-pointer font-medium text-sm text-right text-custom-main">
        Forgot password?
      </div>

      <div
        onClick={onLogin}
        className="text-center cursor-pointer hover:bg-custom-main-dark text-white font-medium p-3 rounded-lg bg-custom-main"
      >
        Login
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="mb-10 rounded-lg">
      <div className="w-full flex flex-col gap-4">
        <span className="text-sm text-gray-400 sm:text-center">
          © 2024{" "}
          <a href="#" className="hover:underline">
            EcoSense™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Preview() {
  return (
    <div className="bg-custom-main-dark relative flex overflow-hidden flex-col text-white rounded-3xl h-full justify-center items-center p-8">
      <div className="z-10 flex flex-col justify-center items-center">
        <div className="text-center text-4xl font-semibold">Welcome back!</div>
        <div className="max-w-[480px] mb-10 mt-4 text-center text-2xl font-semibold">
          Sign in to your personal EcoSense dashboard.
        </div>
        <img src={dashboardPreview} />
        <div className="max-w-[480px] mt-10 text-center text-2xl font-semibold">
          The easiest way to improve your well-being.
        </div>
      </div>
      <img src={abstractBG} className="absolute opacity-10 w-full h-full"></img>
    </div>
  );
}
