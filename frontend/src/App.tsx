import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {

    const [message, setMessage] = useState("");

    useEffect(() => {

        fetch(`${API_URL}/api/hello`)
            .then(res => res.text())
            .then(data => setMessage(data));

    }, []);

    return (
        <div style={{textAlign:"center", marginTop:"100px"}}>
            <h1>Backend says:</h1>
            <h2>{message}</h2>
        </div>
    );
}

export default App;