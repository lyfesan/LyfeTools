import { useState } from 'react';
import { ComboBox } from '@/components/ComboBox';

export default function App() {
  // 1. Define your list of strings
  const formatOptions = ['image/jpeg', 'image/webp', 'image/png'];
  
  // 2. Create state to track the current selection. 
  // We set the default value to the first string in the array.
  const [selectedFormat, setSelectedFormat] = useState(formatOptions[0]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Output Format</h2>
      
      {/* 3. Pass the data and the state setter to the Dropdown */}
      <ComboBox
        options={formatOptions.map(option => ({ label: option, value: option }))}
        value={selectedFormat}
        onChange={setSelectedFormat}
        placeholder="Select an output format"
      />

      <p style={{ marginTop: '15px' }}>
        The parent component knows you selected: <strong>{selectedFormat}</strong>
      </p>
    </div>
  );
}