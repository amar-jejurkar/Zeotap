import React, { useState } from 'react';
import'./Form.css';
import Axios from 'axios';

const EligibilityForm = () => {
    const [formData, setFormData] = useState({
        age: '',
        department: '',
        income: '',
        spend: ''
    });
    
    const [eligibility, setEligibility] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(formData);
        setFormData({
            ...formData,
            [name]: value
        });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3000/form', formData);
            console.log(response)
            setEligibility(response.data.eligible ? 'Eligible' : 'Not Eligible');
        } catch (error) {
            console.error('Error checking eligibility', error);
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
            <h2>Eligibility Check</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='age'>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div className='input-group'>
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                </select>
                </div>
                <div className='input-group'>
                    <label htmlFor='income'>Income:</label>
                    <input
                        type="number"
                        id='income'
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='spend'>Experience (in years)</label>
                    <input
                        type="number"
                        id='spend'
                        name="spend"
                        value={formData.spend}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none" }}>Check Eligibility</button>
            </form>
            {eligibility !== null && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <h3>{eligibility}</h3>
                </div>
            )}
        </div>
    );
};

export default EligibilityForm;
