
import { useState, useRef, useEffect } from "react";
import { Command } from "@/data/commands";

interface TerminalProps {
  command: Command;
}

interface TerminalLine {
  input?: string;
  outputs?: {
    text: string;
    type: "standard" | "error" | "success";
  }[];
  isCommand: boolean;
}

export default function Terminal({ command }: TerminalProps) {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { isCommand: false, outputs: [{ text: `Welcome to the interactive terminal! Try using the '${command.name}' command.`, type: "standard" }] }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim() !== "") {
      processCommand(currentInput.trim());
      setCurrentInput("");
    }
  };

  const processCommand = (input: string) => {
    const newLine: TerminalLine = { input, isCommand: true };
    
    // Check if the command is allowed
    if (command.allowedCommands.includes(input)) {
      newLine.outputs = command.output[input] || [{
        text: "Command executed but no output defined.",
        type: "standard"
      }];
    } else if (input.startsWith(command.name)) {
      newLine.outputs = [{
        text: `Invalid use of '${command.name}'. Try one of the examples.`,
        type: "error"
      }];
    } else {
      newLine.outputs = [{
        text: `This terminal is focused on the '${command.name}' command. Try using '${command.name}' with appropriate options.`,
        type: "error"
      }];
    }
    
    setTerminalLines([...terminalLines, newLine]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalLines]);

  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div 
      className="terminal" 
      ref={terminalRef} 
      onClick={focusInput}
      role="textbox"
      tabIndex={0}
    >
      {terminalLines.map((line, index) => (
        <div key={index} className="mb-1">
          {line.isCommand && (
            <div className="flex">
              <span className="command-prompt">$</span>
              <span className="command-text">{line.input}</span>
            </div>
          )}
          
          {line.outputs && line.outputs.map((output, i) => (
            <div key={i} className={`command-${output.type}`}>
              {output.text.split('\n').map((text, j) => (
                <div key={j}>{text}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
      
      <div className="flex mt-2">
        <span className="command-prompt">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="terminal-input"
          aria-label="Terminal input"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
        <span className="cursor"></span>
      </div>
    </div>
  );
}
