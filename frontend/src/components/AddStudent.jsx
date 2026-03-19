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
        company : ""
    });

    const [erros, setErros ] = useState({});

    const handleChange = (e) =>{
        setForm({...form, [e.target.name] : e.target.value});
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
        <>
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

                <select name="status" onChange={handleChange}>
                    <option value="">Select an Option</option>
                    <option value="Placed">Placed</option>
                    <option value="Not Placed">Not Placed</option>
                </select>

                {form.status === "Placed" && (
                    <input name="company" placeholder="Company" onChange={handleChange}/>
                )} 
                <span>{erros.company}</span>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AddStudent;