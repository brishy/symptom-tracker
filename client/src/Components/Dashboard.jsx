import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import { Line } from 'react-chartjs-2';

const Dashboard = () => {
  const [bloodPressureData, setBloodPressureData] = useState(
    JSON.parse(localStorage.getItem("bloodPressureData")) || []
  );
  useEffect(() => {
    localStorage.setItem(
      "bloodPressureData",
      JSON.stringify(bloodPressureData)
    );
  }, [bloodPressureData]);

  const [formData, setFormData] = useState({
    date: "",
    systolic: "",
    diastolic: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "bloodPressureData",
        JSON.stringify(bloodPressureData)
      );
    }
    return () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("bloodPressureData");
      }
    };
  }, [bloodPressureData]);

  //delete something from the list
  const handleDelete = (index) => {
    const newData = bloodPressureData.filter((item, i) => i !== index);
    setBloodPressureData(newData);
  };

  //Form submission to symptom-history api endpoint
  const handleFormSubmit = async (e) => {
    // prevent the default form submission behavior
    e.preventDefault();

    // check if any of the form fields are empty
    if (Object.values(formData).some((val) => val === "")) {
      alert("Please fill in all the fields before submitting!");
      return;
    }

    try {
      // make a POST request to the server with the form data
      const res = await axios.post("/api/symptom-history", formData);

      // check if there are already 7 items in the bloodPressureData array
      if (bloodPressureData.length === 7) {
        // if so, remove the oldest item and add the new item to the array
        setBloodPressureData((prevData) => [
          ...prevData.slice(1),
          res.data.bloodPressureData,
        ]);
      } else {
        // otherwise, just add the new item to the array
        setBloodPressureData([
          ...bloodPressureData,
          res.data.bloodPressureData,
        ]);
      }

      // clear the form data
      setFormData({ date: "", systolic: "", diastolic: "" });
    } catch (err) {
      // if an error occurs, set the error message
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/symptom-history");
        setBloodPressureData(res.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <h1>Blood Pressure Dashboard</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="date">
          Date:
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="systolic">
          Systolic:
          <input
            type="number"
            id="systolic"
            name="systolic"
            value={formData.systolic}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="diastolic">
          Diastolic:
          <input
            type="text"
            id="diastolic"
            name="diastolic"
            value={formData.diastolic}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="blood-pressure-data">
        <h2>Last 7 Days of Data</h2>
        <ul>
          {/* list of last 7 submissions */}
          {bloodPressureData
            .sort((a, b) => b.date - a.date)
            .slice(0, 7)
            .map((data, index) => (
              <li key={index}>
                {data.date} - Systolic: {data.systolic} Diastolic:{" "}
                {data.diastolic}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
