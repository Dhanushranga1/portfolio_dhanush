import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, SkipForward, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type SortStep = {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
  message: string;
};

// Generate random array
function generateArray(size: number = 20): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
}

// Bubble Sort with step generation
function* bubbleSortSteps(arr: number[]): Generator<SortStep> {
  const array = [...arr];
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        array: [...array],
        comparing: [j, j + 1],
        message: `Comparing ${array[j]} and ${array[j + 1]}`,
      };

      if (array[j] > array[j + 1]) {
        yield {
          array: [...array],
          swapping: [j, j + 1],
          message: `Swapping ${array[j]} and ${array[j + 1]}`,
        };

        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        yield {
          array: [...array],
          message: `Swapped: ${array[j]} and ${array[j + 1]}`,
        };
      }
    }
  }

  yield {
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    message: "Sorting complete!",
  };
}

// Quick Sort with step generation
function* quickSortSteps(arr: number[], start: number = 0, end?: number): Generator<SortStep> {
  const array = [...arr];
  if (end === undefined) end = array.length - 1;

  if (start < end) {
    const pivotIndex = yield* partition(array, start, end);
    yield* quickSortSteps(array, start, pivotIndex - 1);
    yield* quickSortSteps(array, pivotIndex + 1, end);
  }

  yield {
    array: [...array],
    message: "Sorting complete!",
  };
}

function* partition(array: number[], start: number, end: number): Generator<SortStep, number> {
  const pivot = array[end];
  let i = start - 1;

  yield {
    array: [...array],
    comparing: [end, end],
    message: `Pivot: ${pivot}`,
  };

  for (let j = start; j < end; j++) {
    yield {
      array: [...array],
      comparing: [j, end],
      message: `Comparing ${array[j]} with pivot ${pivot}`,
    };

    if (array[j] < pivot) {
      i++;
      if (i !== j) {
        yield {
          array: [...array],
          swapping: [i, j],
          message: `Swapping ${array[i]} and ${array[j]}`,
        };

        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }

  if (i + 1 !== end) {
    yield {
      array: [...array],
      swapping: [i + 1, end],
      message: `Placing pivot ${pivot} in correct position`,
    };

    [array[i + 1], array[end]] = [array[end], array[i + 1]];
  }

  return i + 1;
}

// Merge Sort with step generation
function* mergeSortSteps(arr: number[], start: number = 0, end?: number): Generator<SortStep> {
  const array = [...arr];
  if (end === undefined) end = array.length - 1;

  if (start < end) {
    const mid = Math.floor((start + end) / 2);

    yield {
      array: [...array],
      comparing: [start, end],
      message: `Dividing array from index ${start} to ${end}`,
    };

    yield* mergeSortSteps(array, start, mid);
    yield* mergeSortSteps(array, mid + 1, end);
    yield* merge(array, start, mid, end);
  }

  yield {
    array: [...array],
    message: "Sorting complete!",
  };
}

function* merge(array: number[], start: number, mid: number, end: number): Generator<SortStep> {
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);

  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    yield {
      array: [...array],
      comparing: [start + i, mid + 1 + j],
      message: `Merging: comparing ${left[i]} and ${right[j]}`,
    };

    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    k++;
  }

  while (i < left.length) {
    array[k] = left[i];
    i++;
    k++;
  }

  while (j < right.length) {
    array[k] = right[j];
    j++;
    k++;
  }

  yield {
    array: [...array],
    message: `Merged section from ${start} to ${end}`,
  };
}

type Algorithm = "bubble" | "quick" | "merge";

export default function AlgoPlayground() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [array, setArray] = useState<number[]>(generateArray(20));
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]); // 1-100, higher = faster
  const [status, setStatus] = useState("Ready. Press 'Play' or 'Step'.");
  
  const intervalRef = useRef<number | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Generate sorting steps
  const generateSteps = () => {
    const sortSteps: SortStep[] = [];
    let generator;

    switch (algorithm) {
      case "bubble":
        generator = bubbleSortSteps(array);
        break;
      case "quick":
        generator = quickSortSteps(array);
        break;
      case "merge":
        generator = mergeSortSteps(array);
        break;
    }

    for (const step of generator) {
      sortSteps.push(step);
    }

    setSteps(sortSteps);
    setCurrentStep(0);
    setStatus(`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort ready. ${sortSteps.length} steps generated.`);
  };

  // Reset
  const reset = () => {
    setIsPlaying(false);
    const newArray = generateArray(20);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setStatus("Ready. Generate a new array or change algorithm.");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setStatus(steps[currentStep + 1].message);
    } else {
      setIsPlaying(false);
      setStatus("Sorting complete!");
    }
  };

  // Play/Pause
  const togglePlay = () => {
    if (steps.length === 0) {
      generateSteps();
      return;
    }

    setIsPlaying(!isPlaying);
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const delay = Math.max(50, 1000 - speed[0] * 9); // Convert speed to delay
      intervalRef.current = window.setInterval(() => {
        nextStep();
      }, delay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (currentStep >= steps.length - 1 && isPlaying) {
        setIsPlaying(false);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, speed, steps.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case " ":
        case "p":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
        case "n":
          e.preventDefault();
          if (!isPlaying) nextStep();
          break;
        case "r":
          e.preventDefault();
          reset();
          break;
        case "g":
          e.preventDefault();
          generateSteps();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, steps]);

  const currentData = steps[currentStep] || { array, message: status };
  const maxValue = Math.max(...currentData.array);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text p-4 sm:p-6 lg:p-8 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-terminal-accent-blue mb-2">
            <span className="text-terminal-accent-green">❯</span> Algorithm Playground
          </h1>
          <p className="text-terminal-text-dim">
            Interactive sorting visualizer • Priority: 432
          </p>
        </div>

        {/* Controls */}
        <Card className="terminal-card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Algorithm Selection */}
            <div>
              <label className="text-sm text-terminal-text-dim mb-2 block">Algorithm</label>
              <Select
                value={algorithm}
                onValueChange={(v) => {
                  setAlgorithm(v as Algorithm);
                  setSteps([]);
                  setCurrentStep(0);
                }}
              >
                <SelectTrigger className="bg-terminal-bg-alt border-terminal-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bubble">Bubble Sort - O(n²)</SelectItem>
                  <SelectItem value="quick">Quick Sort - O(n log n)</SelectItem>
                  <SelectItem value="merge">Merge Sort - O(n log n)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Speed Control */}
            <div>
              <label className="text-sm text-terminal-text-dim mb-2 block">
                Speed: {speed[0]}%
              </label>
              <Slider
                value={speed}
                onValueChange={setSpeed}
                max={100}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button
              onClick={togglePlay}
              className={isPlaying ? "bg-terminal-accent-yellow" : "bg-terminal-accent-green"}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </>
              )}
            </Button>

            <Button onClick={nextStep} variant="outline" disabled={isPlaying || currentStep >= steps.length - 1}>
              <SkipForward className="h-4 w-4 mr-2" />
              Step
            </Button>

            <Button onClick={generateSteps} variant="outline" disabled={isPlaying}>
              <Zap className="h-4 w-4 mr-2" />
              Generate Steps
            </Button>

            <Button onClick={reset} variant="outline" disabled={isPlaying}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Progress */}
          {steps.length > 0 && (
            <div className="mt-4 pt-4 border-t border-terminal-border">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-terminal-text-dim">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-terminal-accent-blue">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-terminal-bg-alt rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-terminal-accent-blue transition-all duration-300 absolute top-0 left-0"
                  {...{ style: { width: `${((currentStep + 1) / steps.length) * 100}%` } }}
                />
              </div>
            </div>
          )}
        </Card>

        {/* Visualizer */}
        <Card className="terminal-card p-6 mb-6">
          <div className="aspect-video flex items-end gap-1 bg-terminal-bg-alt rounded p-4 relative">
            {currentData.array.map((value, idx) => {
              const isComparing = currentData.comparing?.includes(idx);
              const isSwapping = currentData.swapping?.includes(idx);
              const isSorted = currentData.sorted?.includes(idx);

              let bgColor = "bg-terminal-accent-blue";
              if (isSwapping) bgColor = "bg-terminal-accent-yellow";
              else if (isComparing) bgColor = "bg-terminal-accent-green";
              else if (isSorted) bgColor = "bg-terminal-accent-green/50";

              const heightPercent = (value / maxValue) * 100;

              return (
                <div
                  key={idx}
                  className={`flex-1 ${bgColor} transition-all duration-300 rounded-t flex items-end justify-center relative`}
                  aria-label={`Value ${value}`}
                  title={`${value}`}
                  {...{ style: { height: `${heightPercent}%` } }}
                >
                  <span className="text-xs text-terminal-bg pb-1 opacity-75">{value}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-terminal-accent-blue rounded"></div>
              <span className="text-terminal-text-dim">Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-terminal-accent-green rounded"></div>
              <span className="text-terminal-text-dim">Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-terminal-accent-yellow rounded"></div>
              <span className="text-terminal-text-dim">Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-terminal-accent-green/50 rounded"></div>
              <span className="text-terminal-text-dim">Sorted</span>
            </div>
          </div>
        </Card>

        {/* Status */}
        <div
          ref={statusRef}
          role="status"
          aria-live="polite"
          className="terminal-card p-4 text-sm"
        >
          <span className="text-terminal-accent-green">❯</span>{" "}
          <span className="text-terminal-text">{status}</span>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-6 text-sm text-terminal-text-dim">
          <p className="mb-2 font-semibold">Keyboard Shortcuts:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">Space</kbd> or{" "}
              <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">P</kbd> - Play/Pause
            </div>
            <div>
              <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">→</kbd> or{" "}
              <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">N</kbd> - Next Step
            </div>
            <div>
              <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">R</kbd> - Reset
            </div>
            <div>
              <kbd className="px-2 py-1 bg-terminal-bg-alt rounded border border-terminal-border">G</kbd> - Generate Steps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
