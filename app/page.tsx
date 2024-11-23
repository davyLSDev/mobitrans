"use client";

import { useState } from 'react';
import TextGrid from './components/TextGrid';
import Image from 'next/image';
import { transpose } from 'chord-transposer';
import { jsPDF } from 'jspdf';

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

  const handlePdfSave = async () => {
    try {
      const doc = new jsPDF();
      
      // Add content to PDF
      doc.setFontSize(12);
      const lines = transposedText.split('\n');
      let y = 20;
      lines.forEach(line => {
        doc.text(line, 20, y);
        y += 10;
      });
      
      const pdfBlob = doc.output('blob');
      
      // Type assertion to fix build error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handle = await (window as any).showSaveFilePicker({
        suggestedName: 'transposed-song.pdf',
        types: [{
          description: 'PDF File',
          accept: {'application/pdf': ['.pdf']},
        }],
      });
      
      const writable = await handle.createWritable();
      await writable.write(pdfBlob);
      await writable.close();
    } catch (error) {
      console.error('Error generating PDF:', error);
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
        <button 
          onClick={handlePdfSave}
          style={{
            backgroundColor: '#e0e0e0',
            color: '#333',
            border: '1px solid #ccc',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          to pdf
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
