import { useState } from "react";

function AddStudent(){

    const [form, setForm] = useState({
        name : "",
        usn : "",
        email : "",
        phone : "",
        department : "",
        cgpa : "",
        skills : [],
        gender : "",
        status : "",
        company : "",
        roles : [],
        placementDate : ""
    });
    

    const [erros, setErros ] = useState({});

    const handleChange = (e) =>{
        setForm({...form, [e.target.name] : e.target.value});
    }

    // Handler for skills checkboxes
    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        setForm(prev => ({
            ...prev,
            skills: checked
                ? [...prev.skills, value]
                : prev.skills.filter(s => s !== value)
        }));
    }

    // Handler for roles multi-select
    const handleMultiSelect = (e) => {
        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
        setForm(prev => ({ ...prev, roles: selected }));
    }

    // Name & USN Reuired, email should have @, phone length must be 10, cgpa > 6, Status Placed -> Company Name is required
    const validateForm = () =>{
        let err = {}

        if(!form.name) err.name = "Required"
        if(!form.usn) err.usn = "Required"
        if(!form.email.includes('@')) err.email = "Invalid Email without @"
        if(form.phone.length !== 10) err.phone = "INvalid Phone Number"
        if(Number(form.cgpa) < 6.0) err.cgpa = "Not Eligible"
        if (form.status === "Placed" && !form.company){
            err.company = "Company Name Required"
        }
        if(form.skills.length === 0) err.skills = "Select at least one skill"
        if(form.roles.length === 0) err.roles = "Select at least one role"

        setErros(err)
        return Object.keys(err).length === 0; 
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        console.log("Submit clicked");

        try{
            const res = await fetch('http://localhost:5000/addStudent',{
                method : "POST",
                headers : { "Content-Type" : "application/json"},
                body : JSON.stringify(form)
            });
            const data = await res.json();

            if(!res.ok){
                alert(data.msg)
            }
            else{
                alert("Student Added")
            }
        }
        catch(err){
            console.log(err)
        }

    }


    

    return(
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange}/>
                <span>{erros.name}</span>

                <input name="usn" placeholder="USN" onChange={handleChange}/>
                <span>{erros.usn}</span>

                <input name="email" placeholder="Email" onChange={handleChange}/>
                <span>{erros.email}</span>

                <input name="phone" placeholder="Phone" onChange={handleChange}/>
                <span>{erros.phone}</span>

                <input name="cgpa" placeholder="Cgpa" onChange={handleChange}/>
                <span>{erros.cgpa}</span>

                {/* Dropdown — Department */}
                <select name="department" value={form.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                </select>

                {/* Radio Buttons — Gender */}
                <div style={{textAlign:"left"}}>
                    <label>Gender:</label><br/>
                    {["Male", "Female"].map(g => (
                        <label key={g} style={{marginRight:"12px"}}>
                            <input type="radio" name="gender" value={g}
                                checked={form.gender === g}
                                onChange={handleChange}/> {g}
                        </label>
                    ))}
                </div>

                {/* Checkboxes — Skills */}
                <div style={{textAlign:"left"}}>
                    <label>Skills:</label><br/>
                    {["Java", "Python", "C++", "JavaScript"].map(skill => (
                        <label key={skill} style={{marginRight:"12px"}}>
                            <input type="checkbox" value={skill}
                                checked={form.skills.includes(skill)}
                                onChange={handleCheckbox}/> {skill}
                        </label>
                    ))}
                </div>
                <span>{erros.skills}</span>

                {/* Multi-Select — Roles */}
                <label style={{textAlign:"left"}}>Roles (hold Ctrl to select multiple):</label>
                <select multiple value={form.roles} onChange={handleMultiSelect}
                    style={{height:"80px"}}>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Fullstack">Fullstack</option>
                </select>
                <span>{erros.roles}</span>

                {/* Status Dropdown (existing) */}
                <select name="status" onChange={handleChange}>
                    <option value="">Select Placement Status</option>
                    <option value="Placed">Placed</option>
                    <option value="Not Placed">Not Placed</option>
                </select>

                {/* Conditional fields — only if Placed */}
                {form.status === "Placed" && (
                    <>
                        <input name="company" placeholder="Company" onChange={handleChange}/>
                        <input name="placementDate" type="date" onChange={handleChange}/>
                    </>
                )}
                <span>{erros.company}</span>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddStudent;