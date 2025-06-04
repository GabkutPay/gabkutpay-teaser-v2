import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const GraphiqueAnomalies = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const res = await axios.get('/api/ia/anomalies/stats');
        const formatted = res.data.map(item => ({
          date: item._id,
          anomalies: item.count
        }));
        setData(formatted);
      } catch (err) {
        console.error('Erreur lors du chargement des anomalies', err);
      }
    };

    fetchAnomalies();
  }, []);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">📉 Graphique des Anomalies IA</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="anomalies"
              stroke="#f87171" // rouge clair
              activeDot={{ r: 8 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">Chargement ou aucune anomalie détectée.</p>
      )}
    </div>
  );
};

export default GraphiqueAnomalies;
