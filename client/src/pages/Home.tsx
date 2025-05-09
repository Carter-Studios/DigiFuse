import { useState } from "react";
import RippleBackground from "@/components/RippleBackground";
import NumberInputForm from "@/components/NumberInputForm";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [view, setView] = useState<"input" | "processing" | "result">("input");
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [isScaledUp, setIsScaledUp] = useState<boolean>(false);

  const handleCalculation = (num1: number, num2: number) => {
    // Calculate result
    const result = Math.floor((num1 + num2) / 3);
    setCalculatedValue(result);
    
    // Start animation sequence
    animateSequence();
  };
  
  const animateSequence = async () => {
    // Scale up
    setIsScaledUp(true);
    
    // Hide input form, show processing
    setView("processing");
    setProcessingStep(1);
    
    // Processing steps
    await new Promise(r => setTimeout(r, 2000));
    setProcessingStep(2);
    
    await new Promise(r => setTimeout(r, 2000));
    setProcessingStep(3);
    
    await new Promise(r => setTimeout(r, 1000));
    
    // Show result
    setView("result");
    
    // Wait for user to see result
    await new Promise(r => setTimeout(r, 3000));
    
    // Reset everything
    setView("input");
    setIsScaledUp(false);
  };
  
  const getProcessingText = () => {
    switch (processingStep) {
      case 1:
        return "Connecting to banking API";
      case 2:
        return "Authorizing";
      case 3:
        return "Processing calculation";
      default:
        return "Processing";
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <RippleBackground />
      
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center bg-white dark:bg-dark rounded-xl p-8 shadow-2xl transition-all duration-500 w-[90%] max-w-md main-container ${isScaledUp ? 'scale-up' : 'scale-down'}`}
      >
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-background tracking-wide">DigiFuse</h1>
        
        {view === "input" && (
          <NumberInputForm onCalculate={handleCalculation} />
        )}
        
        {view === "processing" && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-lg text-background">
              {getProcessingText()}
              <span className="dots"><span>.</span><span>.</span><span>.</span></span>
            </div>
          </div>
        )}
        
        {view === "result" && (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <p className="text-sm text-background/70 mb-1">Result</p>
              <div className="text-4xl font-bold text-primary">{calculatedValue}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
