import {useState, useEffect} from 'react';

function ViewStudent(){
        
    const [data, setData] = useState([]);

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
        <div>

            <input placeholder="Search" onChange={(e)=>search(e.target.value)} />

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
                    <button onClick={() => deleteStudent(s._id)}>Delete</button>
                    </td>
                </tr>
                ))}
                
            </tbody>

            </table>

        </div>
    );
}

export default ViewStudent;

