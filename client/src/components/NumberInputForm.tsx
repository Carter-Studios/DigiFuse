import React, { useState } from "react";
import FuseButton from "./FuseButton";

interface NumberInputFormProps {
  onCalculate: (num1: number, num2: number) => void;
}

const NumberInputForm: React.FC<NumberInputFormProps> = ({ onCalculate }) => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError(null);
    
    // Validate inputs
    const number1 = parseInt(num1);
    const number2 = parseInt(num2);
    
    if (isNaN(number1) || isNaN(number2)) {
      setError("Please enter valid integers");
      return;
    }
    
    // Send values to parent for calculation
    onCalculate(number1, number2);
    
    // Reset form (parent will handle hiding the form during animation)
  };
  
  const validateNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, backspace, delete, arrows
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
      <div className="wave-group">
        <input
          required
          type="text"
          className="input"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          onKeyDown={validateNumberInput}
        />
        <span className="bar"></span>
        <label className="label">
          <span className="label-char" style={{ "--index": 0 } as React.CSSProperties}>N</span>
          <span className="label-char" style={{ "--index": 1 } as React.CSSProperties}>u</span>
          <span className="label-char" style={{ "--index": 2 } as React.CSSProperties}>m</span>
          <span className="label-char" style={{ "--index": 3 } as React.CSSProperties}>b</span>
          <span className="label-char" style={{ "--index": 4 } as React.CSSProperties}>e</span>
          <span className="label-char" style={{ "--index": 5 } as React.CSSProperties}>r</span>
          <span className="label-char" style={{ "--index": 6 } as React.CSSProperties}>1</span>
        </label>
      </div>
      
      <div className="wave-group">
        <input
          required
          type="text"
          className="input"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          onKeyDown={validateNumberInput}
        />
        <span className="bar"></span>
        <label className="label">
          <span className="label-char" style={{ "--index": 0 } as React.CSSProperties}>N</span>
          <span className="label-char" style={{ "--index": 1 } as React.CSSProperties}>u</span>
          <span className="label-char" style={{ "--index": 2 } as React.CSSProperties}>m</span>
          <span className="label-char" style={{ "--index": 3 } as React.CSSProperties}>b</span>
          <span className="label-char" style={{ "--index": 4 } as React.CSSProperties}>e</span>
          <span className="label-char" style={{ "--index": 5 } as React.CSSProperties}>r</span>
          <span className="label-char" style={{ "--index": 6 } as React.CSSProperties}>2</span>
        </label>
      </div>
      
      <div className={`text-red-500 text-sm h-6 transition-all duration-300 ${error ? 'opacity-100' : 'opacity-0'}`}>
        {error}
      </div>
      
      <FuseButton type="submit" />
    </form>
  );
};

export default NumberInputForm;
