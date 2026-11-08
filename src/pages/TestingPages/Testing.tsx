import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function App() {
  // 1. Define your list of strings
  const formatOptions = ['image/jpeg', 'image/webp', 'image/png'];
  
  // 2. Create state to track the current selection. 
  // We set the default value to the first string in the array.
  const [selectedFormat, setSelectedFormat] = useState(formatOptions[0]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select Output Format</h2>
      
      <Select
        value={selectedFormat}
        onValueChange={(value) => {
          if (value !== null) setSelectedFormat(value)
        }}
      >
        <SelectTrigger aria-label="Select output format" className="w-full max-w-70">
          <SelectValue placeholder="Select an output format" />
        </SelectTrigger>
        <SelectContent>
          {formatOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p style={{ marginTop: '15px' }}>
        The parent component knows you selected: <strong>{selectedFormat}</strong>
      </p>
    </div>
  );
}