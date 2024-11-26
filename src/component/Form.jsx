import React, { useState } from "react";

export default function Form() {
  const sportsList = [
    "Basketball",
    "Cricket",
    "Golf",
    "Hockey",
    "Swimming",
    "Tennis",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    active: "",
    review: "",
    sports: []
  });

  const [tables, setTables] = useState([]);
  const [showSports, setShowSports] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSportChange = (sport) => {
    setFormData((prevFormData) => {
      const games = prevFormData.sports.includes(sport)
        ? prevFormData.sports.filter((s) => s !== sport)
        : [...prevFormData.sports, sport];
      return {
        ...prevFormData,
        games,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTables([...tables, { ...formData, id: tables.length + 1 }]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      active: "",
      review: "",
      sports: [],
    });
    setShowSports(false);
  };

  const handleDelete = (id) => {
    setTables(tables.filter((entry) => entry.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter the name"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="email">Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter the email"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="phone">Phone Number:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: e.target.name,
                        value: e.target.value.replace(/\D/g, "").slice(0, 10),
                      },
                    })
                  }
                  placeholder="Enter the phone"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="gender">Gender:</label>
              </td>
              <td>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="active">Active:</label>
              </td>
              <td>
                <select
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Active</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="review">Review:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Enter the review"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="sports">Sports:</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Selected Sports"
                  value={formData.sports.join(", ")}
                  onClick={() => setShowSports(!showSports)}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td></td>
              {showSports && (
                <td>
                  {sportsList.map((sport) => (
                    <div key={sport}>
                      <input
                        type="checkbox"
                        checked={formData.sports.includes(sport)}
                        onChange={() => handleSportChange(sport)}
                      />
                      {sport}
                    </div>
                  ))}
                </td>
              )}
            </tr>
            <tr>
              <td>
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Active</th>
            <th>Review</th>
            <th>Sports</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.name}</td>
              <td>{entry.email}</td>
              <td>{entry.phone}</td>
              <td>{entry.gender}</td>
              <td>{entry.active}</td>
              <td>{entry.review}</td>
              <td>{entry.sports.join(", ")}</td>
              <td>
                <button onClick={() => handleDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 