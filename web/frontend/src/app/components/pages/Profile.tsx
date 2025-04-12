"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  age?: string;
  weight?: string;
  bloodGroup?: string;
  password?: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    avatar: "",
    bio: "",
    age: "",
    weight: "",
    bloodGroup: "",
  });

  const [editUserData, setEditUserData] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(user);

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("email");
      const accesstoken = localStorage.getItem("accesstoken");

      try {
        const res = await axios.post(
          "http://localhost:8001/api/user/profiledata",
          { email },
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
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
        "http://localhost:8001/api/user/updateprofile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      setUser(res.data);
      setEditUserData(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-10">
      <div className="w-[800px] bg-white border border-gray-300 rounded-xl p-10 shadow-xl">
        {/* Profile Header */}
        <div className="text-center mb-10">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 object-cover"
          />
          <h2 className="text-2xl font-bold mt-4">{user.name || "--"}</h2>
          <p className="text-gray-600">{user.email || "--"}</p>
          <p className="text-gray-700 mt-2">{user.bio || "--"}</p>
        </div>

        {/* SECTION 1: USER DATA */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">User Data</h3>
            {!editUserData ? (
              <button
                onClick={() => setEditUserData(true)}
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            )}
          </div>
          <div className="space-y-4">
            {renderField("Age", "age", formData.age, editUserData, handleChange)}
            {renderField("Weight (kg)", "weight", formData.weight, editUserData, handleChange)}
            {renderField("Blood Group", "bloodGroup", formData.bloodGroup, editUserData, handleChange)}
            {renderField("Bio", "bio", formData.bio, editUserData, handleChange)}
          </div>
        </section>

        {/* SECTION 2: PRIVACY SETTINGS */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Privacy Settings</h3>

          {/* Change Username */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Change Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Change Password */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function renderField(
  label: string,
  name: string,
  value: string | undefined,
  editable: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      {editable ? (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      ) : (
        <p className="text-gray-700">{value || "--"}</p>
      )}
    </div>
  );
}
