"use client";

export default function TextGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      padding: '20px',
      marginTop: '60px',
      minHeight: 'calc(100vh - 60px)',
    }}>
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: '16px',
      }}>
        Left Pane
      </div>
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: '16px',
      }}>
        Right Pane
      </div>
    </div>
  );
} 