"use client";

import TextGrid from './components/TextGrid';

export default function Home() {
  return (
    <main>
      <div style={{
        width: '100%',
        height: '60px',
        backgroundColor: '#f0f0f0',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
      }}>
        <button style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Transpose
        </button>
      </div>
      <TextGrid />
    </main>
  );
}
