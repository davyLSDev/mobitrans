"use client";

import TextGrid from './components/TextGrid';
import ErrorModal from './components/ErrorModal';
import TransposeHeader from './components/TransposeHeader';
import { generatePDF } from './components/PDFGenerator';
import { useState, useEffect } from 'react';

type TransposeFunction = (text: string) => {
  toKey: (key: string) => { toString: () => string }
};

export default function Home() {
  const [originalText, setOriginalText] = useState('');
  const [transposedText, setTransposedText] = useState('');
  const [transpose, setTranspose] = useState<TransposeFunction | null>(null);
  const [showError, setShowError] = useState(false);
  const [selectedKey, setSelectedKey] = useState('C');

  useEffect(() => {
    import('chord-transposer').then((module) => {
      setTranspose(() => module.transpose);
    });
  }, []);

  const handleTranspose = () => {
    if (!transpose) return;
    
    if (!originalText.trim()) {
      setShowError(true);
      return;
    }
    
    try {
      const transposed = transpose(originalText).toKey(selectedKey);
      setTransposedText(transposed.toString());
    } catch (error) {
      console.error('Transposition error:', error);
      setTransposedText('Error transposing chords. Please check the format.');
    }
  };

  const handleGeneratePDF = async () => {
    if (!transposedText.trim()) {
      setShowError(true);
      return;
    }

    try {
      await generatePDF(transposedText, selectedKey);
    } catch (error) {
      console.error('PDF generation error:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <main>
      <TransposeHeader
        selectedKey={selectedKey}
        onKeyChange={setSelectedKey}
        onTranspose={handleTranspose}
        onGeneratePDF={handleGeneratePDF}
      />
      <TextGrid 
        originalText={originalText}
        setOriginalText={setOriginalText}
        transposedText={transposedText}
        setTransposedText={setTransposedText}
      />
      <ErrorModal 
        isOpen={showError}
        onClose={() => setShowError(false)}
        message="Please enter a song with chords in the Original Song pane"
      />
    </main>
  );
}
