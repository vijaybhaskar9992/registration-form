import React, { useState } from "react";
import "./RegistrationForm.css"; // Import CSS for styling

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      fetch("https://fullstack-test-navy.vercel.app/api/users/create", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSuccessMessage("User account successfully created.");
        })
        .catch((error) =>
          console.error("There was an error creating the account.", error)
        );
      setSuccessMessage("User account successfully created.");
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.full_name.trim()) {
      errors.full_name = "Full name is required";
    }

    if (
      !formData.contact_number.trim() ||
      formData.contact_number.length < 10
    ) {
      errors.contact_number = "Contact number is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.date_of_birth.trim()) {
      errors.date_of_birth = "Date of birth is required";
    } else {
      const today = new Date();
      const dob = new Date(formData.date_of_birth);
      if (dob >= today) {
        errors.date_of_birth = "Date of birth must be in the past";
      }
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (!formData.confirm_password.trim()) {
      errors.confirm_password = "Confirm password is required";
    } else if (formData.password !== formData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="card">
      <h2>Registration Form</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
          {errors.full_name && (
            <p className="error-message">{errors.full_name}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="contact_number">Contact Number</label>
          <input
            type="text"
            id="contact_number"
            name="contact_number"
            value={formData.contact_number}
            placeholder="Mobile Number"
            required
            onChange={handleChange}
          />
          {errors.contact_number && (
            <p className="error-message">{errors.contact_number}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            required
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
          {errors.date_of_birth && (
            <p className="error-message">{errors.date_of_birth}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Create Password"
            required
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            placeholder="Confirm Password"
            required
            onChange={handleChange}
          />
          {errors.confirm_password && (
            <p className="error-message">{errors.confirm_password}</p>
          )}
        </div>
        <div className="buttons">
          <button type="button" className="btn-cencel">
            Cancel
          </button>
          <button type="submit" className="btn-register">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
