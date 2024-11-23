interface TransposeHeaderProps {
    selectedKey: string;
    onKeyChange: (key: string) => void;
    onTranspose: () => void;
  }
  
  const keys = [
    'C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F',
    'F#/G♭', 'G', 'G#/A♭', 'A', 'A#/B♭', 'B'
  ];
  
  export default function TransposeHeader({ 
    selectedKey, 
    onKeyChange, 
    onTranspose 
  }: TransposeHeaderProps) {
    return (
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
        <label style={{
          fontWeight: 'bold',
        }}>
          Select a key:
        </label>
        <select 
          value={selectedKey}
          onChange={(e) => onKeyChange(e.target.value)}
          style={{
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '16px',
          }}
        >
          {keys.map((key) => (
            <option key={key} value={key.split('/')[0]}>
              {key}
            </option>
          ))}
        </select>
        <button 
          onClick={onTranspose}
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
    );
  }