/**
 * AsciiSkillBar - Text-based progress bar component
 * 
 * Creates terminal-style progress bars using ASCII characters:
 * [████████░░] FastAPI 80%
 * 
 * Based on CLI progress bar patterns from simple-ascii-chart-cli
 */

interface AsciiSkillBarProps {
  label: string;
  percentage: number;
  maxBlocks?: number;
  className?: string;
}

export default function AsciiSkillBar({ 
  label, 
  percentage, 
  maxBlocks = 10,
  className = ""
}: AsciiSkillBarProps) {
  // Calculate filled and empty blocks
  const filledBlocks = Math.round((percentage / 100) * maxBlocks);
  const emptyBlocks = maxBlocks - filledBlocks;
  
  // Generate bar string
  const filledChar = '█';
  const emptyChar = '░';
  const bar = filledChar.repeat(filledBlocks) + emptyChar.repeat(emptyBlocks);
  
  return (
    <div className={`type-label-medium font-mono ${className}`}>
      <span className="text-muted-foreground">[</span>
      <span className="text-accent-info">{bar}</span>
      <span className="text-muted-foreground">]</span>
      <span className="ml-2 text-foreground">{label}</span>
      <span className="ml-1 text-accent-info-muted">{percentage}%</span>
    </div>
  );
}
