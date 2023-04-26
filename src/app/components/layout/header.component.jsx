import { Fragment, useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import "./header.styles.scss"
const navigation = [
  { name: "Dashboard", href: "/admin", current: false },
  { name: "Companies", href: "/admin/companies", current: false },
  { name: "Products", href: "/admin/products", current: false },
];
 
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const ref=useRef(null);
  const navigate=useNavigate();
  const logOut=()=>{
    localStorage.clear();
    navigate("/")
  }
  window.onscroll=()=>{
    ref.current.display="hidden"
  }
  return (
    <Disclosure ref={ref} as="nav"  style={{background:"rgba(121, 175, 223, 0.99)"}} >
      {({ open }) => (
        <>
          <div  style={{background:"#79afdffc"}} className="header-after mx-auto w-screen px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden rounded"
                    src="https://media.licdn.com/dms/image/C4D22AQE0EabNAFPJxw/feedshare-shrink_800/0/1677148207388?e=1684972800&v=beta&t=NJUlSm2ossAXRVXn9IHHJmeyuLrObcdTVhgOXw4DX70"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block rounded"
                    src="https://media.licdn.com/dms/image/C4D22AQE0EabNAFPJxw/feedshare-shrink_800/0/1677148207388?e=1684972800&v=beta&t=NJUlSm2ossAXRVXn9IHHJmeyuLrObcdTVhgOXw4DX70 "
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white-900 text-white"
                            : "text-white hover:bg-blue-700 hover:text-white-800",
                          "rounded-md px-3 py-2 text-sm font-medium text-white"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button onClick={logOut}
                  type="button"
                  className="rounded-full text-white p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
</svg>


                </button>

                {/* Profile dropdown */}
                
              </div>
            </div>
          </div>

          <Disclosure.Panel   className=" sm:hidden">
            <div style={{background:"rgba(121, 175, 223, 0.99)"}} className="text-white space-y-1  px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? " bg-white text-white"
                      : "text-white hover:bg-sky-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
