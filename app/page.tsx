"use client";

import Image from 'next/image';
import TextGrid from './components/TextGrid';
import { useState } from 'react';
import { transpose } from 'chord-transposer';

export default function Home() {
  const [originalText, setOriginalText] = useState('');
  const [transposedText, setTransposedText] = useState('');
  const [selectedKey, setSelectedKey] = useState('C');

  const keys = [
    'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F',
    'F#/G♭', 'G', 'G#/A♭', 'A', 'A#/B♭', 'B'
  ];

  const handleTranspose = () => {
    try {
      const transposed = transpose(originalText).toKey(selectedKey);
      setTransposedText(transposed.toString());
    } catch (error) {
      console.error('Transposition error:', error);
      setTransposedText('Error transposing chords. Please check the format of your input.');
    }
  };

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
        gap: '12px',
      }}>
        <Image
          src="/transposer.png"
          alt="Transposer icon"
          width={48}
          height={48}
          style={{
            marginRight: '8px'
          }}
        />
        <label style={{
          fontWeight: 'bold',
        }}>
          Select a key:
        </label>
        <select 
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          style={{
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '16px',
          }}
        >
          {keys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button 
          onClick={handleTranspose}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Transpose
        </button>
      </div>
      <TextGrid 
        originalText={originalText}
        setOriginalText={setOriginalText}
        transposedText={transposedText}
      />
    </main>
  );
}
