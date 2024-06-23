"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const saveBusiness = useMutation(api.business.saveBusiness);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    address: "",
    voiceSelect: "",
    instructions: "",
    events: [{phoneNumber: "", summary:""}],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res2 = await saveBusiness({
      name: form.name,
      email: form.email,
      phoneNumber: form.phoneNumber,
      companyName: form.companyName,
      address: form.address,
      voiceSelect: form.voiceSelect,
      instructions: form.instructions,
      events: [{phoneNumber: "", summary:""}],
    });
    router.push('/')

  };

  return (
    <div id="formBox">
      <div id="createBusinessHeader">Create A Business</div>
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
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Business Address"
        />
        <select
          name="voiceSelect"
          value={form.voiceSelect}
          onChange={handleChange}
        >
          <option value="">Voice...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          // Add more options as needed
        </select>
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          placeholder="Instructions"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
