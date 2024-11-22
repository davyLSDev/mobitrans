"use client";

export default function TextGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      padding: '20px',
      marginTop: '60px',
      height: 'calc(100vh - 60px)',
    }}>
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: '16px',
      }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
        }}>
          Original Song
        </label>
        <textarea 
          style={{
            width: '100%',
            height: 'calc(100vh - 160px)',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'none',
          }}
        />
      </div>
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: '16px',
      }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
        }}>
          Transposed Song
        </label>
        <textarea 
          style={{
            width: '100%',
            height: 'calc(100vh - 160px)',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'none',
          }}
          readOnly
        />
      </div>
    </div>
  );
} 