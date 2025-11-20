import axios from "axios";
import { useEffect, useState } from "react";

const History = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) return;

      await axios
        .get(`http://localhost:5000/api/results/user/${userId}`)
        .then((data) => {
          console.log(data);
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error obteniendo historial:", error);
          setLoading(false);
        });
    };

    fetchResults();
  }, []);

  if (loading) return <p>Cargando historial...</p>;
  if (!results.length) return <p>No hay partidas registradas.</p>;

  return (
    <table className="historial-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Precisión</th>
          <th>Duración (s)</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r, index) => (
          <tr key={r.id}>
            <td>{index + 1}</td>
            <td>{new Date(r.createdAt).toLocaleString()}</td>
            <td>{r.accuracy}%</td>
            <td>{r.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default History;
