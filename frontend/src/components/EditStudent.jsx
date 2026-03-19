import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditStudent(){

    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        // Fetch existing data
        const fetchStudent = async () => {
            try {
                const res = await fetch(`http://localhost:5000/student/${id}`);
                const data = await res.json();
                if(res.ok) {
                    setForm(data);
                }
            } catch (err) {
                console.error("Error fetching student:", err);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) =>{
        setForm({...form, [e.target.name] : e.target.value});
    }

    const validateForm = () =>{
        let err = {}

        if(!form.name) err.name = "Required"
        if(!form.usn) err.usn = "Required"
        if(form.email && !form.email.includes('@')) err.email = "Invalid Email without @"
        if(form.phone && form.phone.length !== 10) err.phone = "Invalid Phone Number"
        if(form.cgpa && Number(form.cgpa) < 6.0) err.cgpa = "Not Eligible"
        if (form.status === "Placed" && !form.company){
            err.company = "Company Name Required"
        }

        setErros(err)
        return Object.keys(err).length === 0; 
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try{
            const res = await fetch(`http://localhost:5000/update/${id}`,{
                method : "PUT",
                headers : { "Content-Type" : "application/json"},
                body : JSON.stringify(form)
            });
            const data = await res.json();

            if(!res.ok){
                alert(data.msg)
            }
            else{
                alert("Student Updated")
                navigate("/view"); // Go back to view page after editing
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <h2>Edit Student Details</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name || ""} placeholder="Name" onChange={handleChange}/>
                <span>{erros.name}</span>

                <input name="usn" value={form.usn || ""} placeholder="USN" onChange={handleChange}/>
                <span>{erros.usn}</span>

                <input name="email" value={form.email || ""} placeholder="Email" onChange={handleChange}/>
                <span>{erros.email}</span>

                <input name="phone" value={form.phone || ""} placeholder="Phone" onChange={handleChange}/>
                <span>{erros.phone}</span>

                <input name="cgpa" value={form.cgpa || ""} placeholder="Cgpa" onChange={handleChange}/>
                <span>{erros.cgpa}</span>

                <select name="status" value={form.status || ""} onChange={handleChange}>
                    <option value="">Select an Option</option>
                    <option value="Placed">Placed</option>
                    <option value="Not Placed">Not Placed</option>
                </select>

                {form.status === "Placed" && (
                    <input name="company" value={form.company || ""} placeholder="Company" onChange={handleChange}/>
                )} 
                <span>{erros.company}</span>

                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditStudent;
