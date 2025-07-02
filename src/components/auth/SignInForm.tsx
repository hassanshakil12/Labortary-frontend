// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { EyeCloseIcon, EyeIcon } from "../../icons";

// const LoginPage = () => {
//   const [role, setRole] = useState("user");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSignIn = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (role === "user") {
//       navigate("/employees-dashboard");
//     } else if (role === "admin") {
//       navigate("/admin-dashboard");
//     }
//   };
//   return (
//     <div className="w-full">
//       <div className="min-h-screen flex items-center justify-center bg-blue-200 p-4">
//         <div className="flex flex-col md:flex-row bg-blue-100 rounded-3xl shadow-2xl overflow-visible max-w-4xl w-full h-auto md:h-90">
//           {/* Left side */}
//           <div className="relative w-full md:w-1/2 flex items-center justify-center bg-blue-100 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-visible p-6">
//             <img
//               src="./images/microscopee.png"
//               alt="Microscope"
//               className="w-64 md:w-[400px] -mt-10  md:-ms-34"
//             />
//           </div>

//           {/* Right side */}
//           <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
//             <h2 className="text-2xl md:text-3xl font-bold my-6 text-center">
//               Login
//             </h2>

//             {/* Role Selector */}
//             <div className="justify-center flex">
//               <div className="flex mb-6 min-w-[340px] max-w-[300px]">
//                 <button
//                   onClick={() => setRole("user")}
//                   className={`flex-1 py-2 text-sm ${
//                     role === "user"
//                       ? "font-bold text-white border-b-2 border-[#0077B6] bg-[#0077B6]"
//                       : "text-gray-500 hover:bg-gray-100 border"
//                   } rounded-lg transition-all`}
//                 >
//                   Employees
//                 </button>
//                 <button
//                   onClick={() => setRole("admin")}
//                   className={`flex-1 py-2 text-sm ${
//                     role === "admin"
//                       ? "font-bold text-white border-b-2 border-[#0077B6] bg-[#0077B6]"
//                       : "text-gray-500 hover:bg-gray-100 border"
//                   } rounded-lg transition-all`}
//                 >
//                   Admin
//                 </button>
//               </div>
//             </div>

//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 className="w-full px-4 py-2 border-b-2 border-gray-400 focus:outline-none bg-transparent"
//               />
//             </div>

//             <div className="relative mb-4">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full px-4 py-2 border-b-2 border-gray-400 focus:outline-none bg-transparent"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//               >
//                 {showPassword ? (
//                   <EyeIcon className="w-4 h-4 text-gray-500" />
//                 ) : (
//                   <EyeCloseIcon className="w-4 h-4 text-gray-500" />
//                 )}
//               </span>
//             </div>

//             <div className="flex justify-center">
//               <button
//                 className="bg-[#0077B6] text-white font-bold py-2 rounded-full w-56"
//                 onClick={handleSignIn}
//               >
//                 Login
//               </button>
//             </div>
//             <div className="text-right my-4">
//               <a href="#" className="text-sm text-gray-600">
//                 Forgot Password?
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/sign-in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (res.ok && result.status) {
        localStorage.setItem("userAuthToken", result.data.userAuthToken);
        if (result.data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (result.data.role === "employee") {
          navigate("/employees-dashboard");
        }
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-screen flex items-center justify-center bg-blue-200 p-4">
        <div className="flex flex-col md:flex-row bg-blue-100 rounded-3xl shadow-2xl overflow-visible max-w-4xl w-full h-auto md:h-90">
          {/* Left side */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center bg-blue-100 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-visible p-6">
            <img
              src="./images/microscopee.png"
              alt="Microscope"
              className="w-64 md:w-[400px] -mt-10  md:-ms-34"
            />
          </div>

          {/* Right side */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold my-6 text-center">
              Login
            </h2>

            <div className="mb-4">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 border-b-2 border-gray-400 focus:outline-none bg-transparent"
              />
            </div>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border-b-2 border-gray-400 focus:outline-none bg-transparent"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="w-4 h-4 text-gray-500" />
                ) : (
                  <EyeCloseIcon className="w-4 h-4 text-gray-500" />
                )}
              </span>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-[#0077B6] text-white font-bold py-2 rounded-full w-56"
                onClick={handleSignIn}
              >
                Login
              </button>
            </div>
            <div className="text-right my-4">
              <a href="#" className="text-sm text-gray-600">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
