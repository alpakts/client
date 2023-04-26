import { useFormik } from "formik";
import { Post } from "../../utils/axios.service";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singin } from "../../redux/reducers/user-reducer";
export default function LoginComponent() {
  const ref = useRef(null);
  const buttonref = useRef(null);
  const refe = useRef(null);
  const navigate = useNavigate();
  const [config, setconfig] = useState({
    text: "You are successfully signed  in, you are being redirected",
    bg: "bg-green-800",
  });
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: (values) => {
      Post("/api/auth/signin", values)
        .then((res) => {
          ref.current.classList.remove("hidden");
          refe.current.classList.add("hidden");
          setconfig({
            ...config,
            bg: "bg-green-800",
            text: "You are successfully signed  in, you are being redirected",
          });
          dispatch(singin(res.data));
          window.localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        })
        .catch((err) => {
          ref.current.classList.add("hidden");
          refe.current.classList.remove("hidden");
          setconfig({
            ...config,
            bg: "bg-red-800",
            text: err.response?.data.message?err.response.data.message:"An error occured during process",
          });
        });
    },
  });
  return (
    <>
      <section className="h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://media.licdn.com/dms/image/C4D0BAQENl4-POU9NEw/company-logo_200_200/0/1676961985406?e=1690416000&v=beta&t=PTdNT3-JJ-MtypngqvzhomAHLYGykv1YSFzD9fmSOFs"
              alt="logo"
            />
            ETE
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div
                id="toast-success"
                ref={ref}
                class="hidden flex mx-auto items-center w-full max-w-xs p-4  text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Check icon</span>
                </div>
                <div class="ml-3 text-sm font-normal">{config.text}</div>
              </div>
              <div
                ref={refe}
                id="toast-warning"
                class="mx-auto hidden flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert"
              >
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Warning icon</span>
                </div>
                <div class="ml-3  text-sm font-normal">{config.text}</div>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus: focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus: focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{ background: "#79afdf" }}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-regal-blue focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    style={{ color: "#79afdf" }}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
