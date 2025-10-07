const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export async function fetchProtected() {
    console.log(process.env.REACT_APP_API_URL);
    const res = await fetch(`${API_URL}/protected`);
    return res.json();
}
