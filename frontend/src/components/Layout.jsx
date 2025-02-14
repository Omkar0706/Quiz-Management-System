// import React from "react";
// import { Fragment } from "react";
// import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// const navigation = [
//   { name: "Dashboard", href: "/" },
//   { name: "Quizzes", href: "/quizzes" },
//   { name: "Results", href: "/results" },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Layout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated"); // Clear auth status
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Disclosure as="nav" className="bg-white shadow-sm">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="flex h-16 justify-between">
//                 <div className="flex">
//                   <div className="flex-shrink-0 items-center">
//                     <Link to="/" className="text-xl font-bold text-gray-900">
//                       Quiz Manager
//                     </Link>
//                   </div>
//                   <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
//                     {navigation.map((item) => (
//                       <Link
//                         key={item.name}
//                         to={item.href}
//                         className={classNames(
//                           "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
//                           location.pathname === item.href
//                             ? "border-indigo-500 text-gray-900"
//                             : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                         )}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//                 {isAuthenticated && (
//                   <div className="hidden sm:ml-6 sm:flex sm:items-center">
//                     <Menu as="div" className="relative ml-3">
//                       <div>
//                         <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//                           <span className="sr-only">Open user menu</span>
//                           <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
//                             <span className="text-gray-600">U</span>
//                           </div>
//                         </Menu.Button>
//                       </div>
//                       <Transition
//                         as={Fragment}
//                         enter="transition ease-out duration-200"
//                         enterFrom="transform opacity-0 scale-95"
//                         enterTo="transform opacity-100 scale-100"
//                         leave="transition ease-in duration-75"
//                         leaveFrom="transform opacity-100 scale-100"
//                         leaveTo="transform opacity-0 scale-95"
//                       >
//                         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 onClick={handleLogout}
//                                 className={classNames(
//                                   active ? "bg-gray-100" : "",
//                                   "block w-full px-4 py-2 text-left text-sm text-gray-700"
//                                 )}
//                               >
//                                 Logout
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </Menu.Items>
//                       </Transition>
//                     </Menu>
//                   </div>
//                 )}
//                 <div className="-mr-2 flex items-center sm:hidden">
//                   <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//                     <span className="sr-only">Open main menu</span>
//                     {open ? (
//                       <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             </div>

//             <Disclosure.Panel className="sm:hidden">
//               <div className="space-y-1 pb-3 pt-2">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className={classNames(
//                       "block border-l-4 py-2 pl-3 pr-4 text-base font-medium",
//                       location.pathname === item.href
//                         ? "border-indigo-500 bg-indigo-50 text-indigo-700"
//                         : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
//                     )}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//               {isAuthenticated && (
//                 <div className="border-t border-gray-200 pb-3 pt-4">
//                   <div className="flex items-center px-4">
//                     <div className="flex-shrink-0">
//                       <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
//                         <span className="text-gray-600">U</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="mt-3 space-y-1">
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>

//       <div className="py-10">
//         <main>
//           <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// // import { Outlet, Link, useNavigate } from "react-router-dom";

// // export default function Layout() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("isAuthenticated");
// //     navigate("/login");
// //   };

// //   return (
// //     <div>
// //       <nav className="bg-blue-500 p-4 flex justify-between">
// //         <Link to="/dashboard" className="text-white text-lg">Quiz Manager</Link>
// //         <button onClick={logout} className="text-white">Logout</button>
// //       </nav>
// //       <main className="p-4">
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // }
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ Ensure Navbar is correctly imported
import "../styles.css";
export default function Layout() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        <Outlet /> {/* ✅ This ensures pages like Dashboard, Login, etc., are displayed */}
      </main>
    </div>
  );
}

