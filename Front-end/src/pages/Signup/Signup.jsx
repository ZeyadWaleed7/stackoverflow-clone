import { useState } from "react"
import "./Signup.css"
import logo from "../../assets/twitter-logo.jpg";
import { X } from "lucide-react"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    month: "",
    day: "",
    year: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // form logic
  }
  
  return (
    <div className="signup-container">
      <div className="signup-modal">
        <div className="header">
          <button className="close-button">
            <X size={20} />
          </button>
          <div className="logo">
            <img src={logo} alt="Twitter Logo" className="twitter-logo" />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Create your account</h1>

          <div className="form-group">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="dob-section">
            <h2>Date of birth</h2>
            <p className="dob-info">
              This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or
              something else.
            </p>

            <div className="dob-inputs">
              <div className="select-wrapper">
                <select name="month" value={formData.month} onChange={handleChange} required>
                  <option value="" disabled>
                    Month
                  </option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <div className="select-arrow">▼</div>
              </div>

              <div className="select-wrapper">
                <select name="day" value={formData.day} onChange={handleChange} required>
                  <option value="" disabled>
                    Day
                  </option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <div className="select-arrow">▼</div>
              </div>

              <div className="select-wrapper">
                <select name="year" value={formData.year} onChange={handleChange} required>
                  <option value="" disabled>
                    Year
                  </option>
                  {[...Array(100)].map((_, i) => {
                    const year = new Date().getFullYear() - i
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>
          </div>

          <button type="submit" className="next-button">
            Next
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm

