import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup } from 'react-leaflet';
import axios from 'axios';

function App() {
  const [network, setNetwork] = useState({ Routes: [], Load: [], Dump: [] });
  const [camiones, setCamiones] = useState([]);
  const [reporte, setReporte] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:8081/api/simulacion';

  useEffect(() => {
    axios.get(`${API_BASE}/red`)
      .then(res => {
        setNetwork(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("No se pudo conectar con el servidor para cargar los datos.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(`${API_BASE}/estado`)
        .then(res => setCamiones(res.data))
        .catch(err => console.error("Error consultando estado:", err));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const iniciarSimulacion = () => {
    axios.post(`${API_BASE}/iniciar`)
      .then(() => alert("¡Simulación iniciada con éxito!"))
      .catch(() => alert("Error al intentar iniciar la simulación."));
  };

  const verReporte = () => {
    axios.get(`${API_BASE}/reporte`)
      .then(res => setReporte(res.data))
      .catch(() => alert("Error al obtener el reporte."));
  };

  if (loading) return <div style={{ padding: '20px' }}>Cargando mapa y red vial...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  const centerPosition = [-15.14, -75.72];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>


      <div style={{ padding: '15px', backgroundColor: '#1f2937', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0 }}>Simulación MS4M</h2>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>
            Rutas: {network.Routes.length} | Cargas: {network.Load.length} | Descargas: {network.Dump.length}
          </span>
        </div>
        <div>
          <button onClick={verReporte} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            📊 Ver Reporte
          </button>
          <button onClick={iniciarSimulacion} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            ▶ Iniciar Simulación
          </button>
        </div>
      </div>


      <div style={{ position: 'relative', flex: 1 }}>

        <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000, background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Leyenda</h4>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}><span style={{ color: '#22c55e', fontSize: '20px', marginRight: '5px' }}>●</span> Carga</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}><span style={{ color: '#ef4444', fontSize: '20px', marginRight: '5px' }}>●</span> Descarga</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}><span style={{ color: '#eab308', fontSize: '20px', marginRight: '5px' }}>●</span> Camión</div>
          <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ color: '#3388ff', fontSize: '20px', marginRight: '5px' }}>▬</span> Ruta Transitable</div>
        </div>

        <MapContainer center={centerPosition} zoom={13} style={{ height: '100%', width: '100%', zIndex: 0 }}>
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {network.Routes.map(route => (
            <Polyline key={route.id_trm_cs} positions={route.points} pathOptions={{ color: route.color || '#3388ff', weight: 4 }}>
              <Popup>{route.nombre_tramo}</Popup>
            </Polyline>
          ))}
          {network.Load.map(load => (
            <CircleMarker key={`load-${load.id}`} center={load.coor} radius={7} pathOptions={{ color: 'darkgreen', fillColor: '#22c55e', fillOpacity: 0.9 }}>
              <Popup><strong>CARGA:</strong> {load.name}</Popup>
            </CircleMarker>
          ))}
          {network.Dump.map(dump => (
            <CircleMarker key={`dump-${dump.id}`} center={dump.coor} radius={7} pathOptions={{ color: 'darkred', fillColor: '#ef4444', fillOpacity: 0.9 }}>
              <Popup><strong>DESCARGA:</strong> {dump.name}</Popup>
            </CircleMarker>
          ))}
          {camiones.map(camion => (
            camion.posicionActual && camion.estado !== "FINALIZADO" && (
              <CircleMarker key={camion.id} center={camion.posicionActual} radius={9} pathOptions={{ color: 'black', fillColor: '#eab308', fillOpacity: 1, weight: 2 }}>
                <Popup>
                  <strong>{camion.id}</strong><br />
                  Velocidad: {camion.velocidadActual} km/h<br />
                  Estado: {camion.estado}
                </Popup>
              </CircleMarker>
            )
          ))}
        </MapContainer>
      </div>

      {reporte && (
        <div style={{ padding: '20px', backgroundColor: '#f3f4f6', borderTop: '2px solid #e5e7eb', maxHeight: '200px', overflowY: 'auto' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Reporte y Análisis Heurístico</h3>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{reporte}</pre>
        </div>
      )}

    </div>
  );
}

export default App;