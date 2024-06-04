import { FaEnvelope, FaKey } from "react-icons/fa";
import logo from "../assets/logo.png";
import dashboardPreview from "../assets/dashboard_preview2.png";
import abstractBG from "../assets/abstract_bg.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listener = (event) => {
      const keyCondition =
        event.code === "Enter" || event.code === "NumpadEnter";

      if (keyCondition) {
        event.preventDefault();
        onLogin();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [password, email]);

  const onLogin = () => {
    if (!email || !password) return;

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
      .finally(() => setLoading(false));
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
          htmlFor="input-email"
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
            id="input-email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-main focus:border-custom-main block w-full ps-10 p-2.5"
            placeholder="name@flowbite.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <label
        htmlFor="input-password"
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
          id="input-password"
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
        className={`${
          loading && "bg-custom-main-dark"
        } flex justify-center items-center text-center cursor-pointer hover:bg-custom-main-dark text-white font-medium p-3 rounded-lg bg-custom-main`}
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
          <div>Login</div>
        )}
      </div>
      <div className="flex flex-row mt-4 text-sm justify-center gap-1">
        Don&#39;t have an account yet?{" "}
        <Link
          to="/registration"
          className="cursor-pointer font-medium text-custom-main"
        >
          Sign Up
        </Link>
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
