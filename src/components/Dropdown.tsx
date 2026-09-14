interface DropDownProps {
  options: string[]
  value: string
  onChange: (option: string) => void
}

export default function Dropdown({ options, value, onChange }: DropDownProps) {
    return (
    <div className="relative max-w-70">
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        {options.map((optionStr) => (
          <option key={optionStr} value={optionStr}>
            {optionStr}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow icon */}
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}