import { jsPDF } from 'jspdf';

export const generatePDF = async (
  transposedText: string,
  selectedKey: string
) => {
  if (!transposedText.trim()) {
    throw new Error('No transposed text available');
  }

  try {
    const doc = new jsPDF();
    
    // Add only the transposed content to PDF
    doc.setFontSize(12);
    doc.text(transposedText, 20, 20);

    // Save the PDF
    doc.save(`transposed-song-${selectedKey}.pdf`);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
}; 