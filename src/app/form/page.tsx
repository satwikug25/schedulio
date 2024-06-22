"use client";
import React, { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    file: null,
    phoneNumber: "",
    companyName: "",
    voiceSelect: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prevState) => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do email type check so it is valid and post form data to an api
    // post this form data to a backend django api
    try {
      const response = await fetch("/create/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        // Handle successful response
        console.log("Form data submitted successfully");
      } else {
        // Handle error response
        console.error("Failed to submit form data");
      }
    } catch (error) {
      // Handle network error
      console.error("Failed to submit form data", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
        placeholder="Company Name"
      />
      <select
        name="voiceSelect"
        value={form.voiceSelect}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        // Add more options as needed
      </select>
      <textarea
        name="instructions"
        value={form.instructions}
        onChange={handleChange}
        placeholder="Instructions"
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
