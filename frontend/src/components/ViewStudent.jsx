import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function ViewStudent(){
    const navigate = useNavigate();
        
    const [data, setData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null); // Added state for viewing details

    const fetchData = async()=>{
        const res = await fetch("http://localhost:5000/students");
        const result = await res.json()

        setData(result)
    }

    useEffect(() => {
        fetch("http://localhost:5000/students")
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, []);


    const deleteStudent = async (id) =>{
        await fetch(`http://localhost:5000/delete/${id}`,{
            method : "DELETE"
        })
        fetchData();
    }

    const search = async (key) => {
        const res = await fetch(`http://localhost:5000/search?key=${key}`);
        const result = await res.json();

        if (Array.isArray(result)) {
            setData(result);
        } else {
            setData([]);   
        }
    };
    return (
        <div className="view-student-container">
            <h2>View Students</h2>
            <input placeholder="Search" onChange={(e)=>search(e.target.value)} />

            <div className="table-container">
            <table border="1">
            <thead>
                <tr>
                <th>Name</th>
                <th>USN</th>
                <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {data.map((s) => (
                <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.usn}</td>
                    <td>
                    <button onClick={() => setSelectedStudent(s)} style={{marginRight: "10px"}}>View</button>
                    <button onClick={() => navigate(`/edit/${s._id}`)}>Edit</button>
                    <button onClick={() => deleteStudent(s._id)} style={{marginLeft: "10px"}}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>

            {selectedStudent && (
                <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <h3>Student Details</h3>
                    <p><strong>Name:</strong> {selectedStudent.name}</p>
                    <p><strong>USN:</strong> {selectedStudent.usn}</p>
                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                    <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                    <p><strong>Department:</strong> {selectedStudent.department}</p>
                    <p><strong>CGPA:</strong> {selectedStudent.cgpa}</p>
                    <p><strong>Company:</strong> {selectedStudent.company}</p>
                    <p><strong>Status:</strong> {selectedStudent.status}</p>
                    <button onClick={() => setSelectedStudent(null)} style={{marginTop: '10px'}}>Close</button>
                </div>
            )}

        </div>
    );
}

export default ViewStudent;
