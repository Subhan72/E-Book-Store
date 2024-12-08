import './App.css';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      {}
      <div style={{ backgroundColor: 'blue', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'white', margin: 0 }}>Admin</h2>
      </div>

      {/* Main Content */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Welcome to Admin Dashboard</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>
          Manage your bookstore inventory, view orders, and configure settings all from here.
        </p>
        <div>
          <button
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              margin: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('signup')}
          >
            Sign Up
          </button>
          <button
            style={{
              backgroundColor: '#008CBA',
              color: 'white',
              padding: '10px 20px',
              margin: '10px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
