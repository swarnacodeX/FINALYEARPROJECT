"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../utils/Navbar";
import image from '../utils/user.png'

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  age?: string;
  weight?: string;
  height?: string;
  bloodgroup?: string;
  password?: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile>({
    firstName: localStorage.getItem("firstname") || "",
    lastName: localStorage.getItem("lastname") || "",
    email: localStorage.getItem("email") || "",
    age: "",
    weight: "",
    height: "",
    bloodgroup: "",
  });

  const [activeSection, setActiveSection] = useState<"userdata" | "settings">("userdata");
  const [editUserData, setEditUserData] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUser = async () => {
      const accesstoken = localStorage.getItem("accesstoken");
    
      try {
        const res = await axios.get(
          "http://localhost:8002/api/profile/fetch",
          { params: { email } }
        );
        setUser(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const accesstoken = localStorage.getItem("accesstoken");
    try {
      const res = await axios.put(
        "http://localhost:8002/api/profile",
        formData,
        { headers: { Authorization: `Bearer ${accesstoken}` } }
      );
      setUser(res.data);
      setEditUserData(false);
      setEditFirstName(false);
      setEditLastName(false);
      setEditPassword(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleCancelFirstName = () => {
    setEditFirstName(false);
    setFormData({ ...formData, firstName: user.firstName });
  };

  const handleCancelLastName = () => {
    setEditLastName(false);
    setFormData({ ...formData, lastName: user.lastName });
  };

  const handleCancelPassword = () => {
    setEditPassword(false);
    setFormData({ ...formData, password: "" });
  };

  return (
    <div className="min-h-screen" style={{
      backgroundImage: "url('/background.jpg')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
    }}>
      <div className="min-h-screen bg-black bg-opacity-50 pb-10 pt-32 sm:pt-40">
        <Navbar />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-xl bg-white bg-opacity-90 p-6 shadow-xl sm:p-8 md:p-10">
            <div className="mb-8 flex border-b">
              <button
                onClick={() => setActiveSection("userdata")}
                className={`mr-2 flex-1 px-4 py-2 text-sm sm:text-base ${
                  activeSection === "userdata" ? "border-b-2 border-black text-gray-900" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                User Data
              </button>
              <button
                onClick={() => setActiveSection("settings")}
                className={`flex-1 px-4 py-2 text-sm sm:text-base ${
                  activeSection === "settings" ? "border-b-2 border-black text-gray-900" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Settings
              </button>
            </div>

            <div className="relative overflow-hidden min-h-[500px]">
              {/* User Data Section */}
              <motion.div
                animate={{ 
                  x: activeSection === "userdata" ? 0 : '-100%',
                  opacity: activeSection === "userdata" ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`${activeSection === "userdata" ? "block" : "hidden"}`}
              >
                <section className="mb-12">
                  <div className="text-center mb-8">
                    <motion.img
                      src={image.src}
                      alt="Avatar"
                      className="mx-auto h-20 w-20 rounded-full border-4 border-black object-cover sm:h-28 sm:w-28"
                    />
                    <h2 className="mt-4 text-xl font-bold sm:text-2xl text-gray-900">
                      {firstname} {lastname}
                    </h2>
                    <p className="text-gray-600 sm:text-lg">{email || "--"}</p>
                  </div>

                  <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
                    <h3 className="mb-4 text-lg font-semibold sm:mb-0 sm:text-xl text-gray-900">
                      Personal Information
                    </h3>
                    <button
                      onClick={() => setEditUserData(!editUserData)}
                      className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 sm:w-auto sm:py-1 sm:text-base"
                    >
                      {editUserData ? "Cancel" : "Edit"}
                    </button>
                  </div>

                  <div className="space-y-4 mb-4">
                    <InfoField label="Age" value={user.age} />
                    <InfoField label="Weight (kg)" value={user.weight} />
                    <InfoField label="Height (cm)" value={user.height} />
                    <InfoField label="Blood Group" value={user.bloodgroup} />
                  </div>

                  {editUserData && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="rounded-lg border bg-gray-50 p-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <EditableField label="Age" name="age" value={formData.age} onChange={handleChange} />
                        <EditableField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
                        <EditableField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} />
                        <EditableField label="Blood Group" name="bloodGroup" value={formData.bloodgroup} onChange={handleChange} />
                      </div>
                      <button
                        onClick={handleSave}
                        className="mt-4 w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 sm:w-auto"
                      >
                        Save Changes
                      </button>
                    </motion.div>
                  )}
                </section>
              </motion.div>

              {/* Settings Section */}
              <motion.div
                animate={{ 
                  x: activeSection === "settings" ? 0 : '100%',
                  opacity: activeSection === "settings" ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute top-0 left-0 w-full ${activeSection === "settings" ? "block" : "hidden"}`}
              >
                <section>
                  <h3 className="mb-6 text-lg font-semibold sm:text-xl text-gray-900">Account Settings</h3>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      {/* First Name Field */}
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-900">First Name</label>
                        {!editFirstName ? (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">{user.firstName || "--"}</span>
                            <button
                              onClick={() => setEditFirstName(true)}
                              className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="flex-1 rounded-lg border p-2 text-sm"
                            />
                            <button
                              onClick={handleSave}
                              className="px-3 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelFirstName}
                              className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Last Name Field */}
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-900">Last Name</label>
                        {!editLastName ? (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">{user.lastName || "--"}</span>
                            <button
                              onClick={() => setEditLastName(true)}
                              className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="flex-1 rounded-lg border p-2 text-sm"
                            />
                            <button
                              onClick={handleSave}
                              className="px-3 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelLastName}
                              className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Password Field */}
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-900">Password</label>
                        {!editPassword ? (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">••••••••</span>
                            <button
                              onClick={() => setEditPassword(true)}
                              className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              type="password"
                              name="password"
                              onChange={handleChange}
                              className="flex-1 rounded-lg border p-2 text-sm"
                              placeholder="New password"
                            />
                            <button
                              onClick={handleSave}
                              className="px-3 py-1 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelPassword}
                              className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const InfoField = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
    <span className="font-medium text-gray-900">{label}</span>
    <span className="text-gray-600">{value || "--"}</span>
  </div>
);

const EditableField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-900 sm:text-base">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full rounded-lg border p-2 text-sm sm:text-base text-gray-900"
    />
  </div>
);