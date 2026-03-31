import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
import apis from "../../config/apis";

const ResetPassword = () => {
  const { token } = useParams();
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerMessage({ type: "", text: "" }); // reset message before submit
    try {
      const { data } = await axios.put(`${apis.auth}/reset-password/${token}`, values);
      const { error, warning, success } = data;

      if (error) setServerMessage({ type: "error", text: error });
      else if (warning) setServerMessage({ type: "warning", text: warning });
      else if (success) {
        setServerMessage({ type: "success", text: success });
        setTimeout(() => {
          location.href = "/success";
        }, 2000);
      }
    } catch (err) {
      setServerMessage({ type: "error", text: "Something went wrong!" });
    } finally {
      setSubmitting(false);
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "error":
        return "text-red-600 bg-red-100 border-red-400";
      case "warning":
        return "text-yellow-700 bg-yellow-100 border-yellow-400";
      case "success":
        return "text-green-700 bg-green-100 border-green-400";
      default:
        return "hidden";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl hover:scale-110 transition duration-500 hover:shadow-blue-600 hover:shadow-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>

        {/* Server Message */}
        {serverMessage.text && (
          <div
            className={`border px-3 py-2 mb-4 rounded text-center font-semibold ${getColor(
              serverMessage.type
            )}`}
          >
            {serverMessage.text}
          </div>
        )}

        <Formik
          initialValues={{ password: "", confirm_password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="relative">
              {/* Password */}
              <div className="relative mb-5">
                <div className="absolute text-2xl top-3 right-3 cursor-pointer text-gray-600">
                  {show1 ? (
                    <BsEye onClick={() => setShow1(!show1)} />
                  ) : (
                    <BsEyeSlash onClick={() => setShow1(!show1)} />
                  )}
                </div>
                <Field
                  type={show1 ? "password" : "text"}
                  name="password"
                  placeholder="Enter New Password"
                  className="w-full p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative mb-5">
                <div className="absolute text-2xl top-3 right-3 cursor-pointer text-gray-600">
                  {show2 ? (
                    <BsEye onClick={() => setShow2(!show2)} />
                  ) : (
                    <BsEyeSlash onClick={() => setShow2(!show2)} />
                  )}
                </div>
                <Field
                  type={show2 ? "password" : "text"}
                  name="confirm_password"
                  placeholder="Enter Confirm Password"
                  className="w-full p-3 rounded border border-gray-300 hover:ring-2 hover:ring-rose-400 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {isSubmitting ? "Processing..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
