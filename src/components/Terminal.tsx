
import React, { useState, KeyboardEvent } from "react";
import { useCommand } from "@/providers/CommandProvider";
import { Command } from "@/data/commands";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TerminalProps {
  command: Command;
}

export default function Terminal({ command }: TerminalProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ text: string; type: string }[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { markCommandAsCompleted, completedCommands, getNextAvailableCommand } = useCommand();
  const isCompleted = completedCommands.includes(command.id);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save command to history
    if (input.trim()) {
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
    }

    // Check if the input command is allowed
    if (command.allowedCommands.includes(input)) {
      const commandOutput = command.output[input] || [{ text: "Command not recognized", type: "error" }];
      setOutput(prev => [...prev, { text: `$ ${input}`, type: "command" }, ...commandOutput]);
      markCommandAsCompleted(command.id);
      console.log(`Command ${command.id} marked as completed`);
    } else {
      setOutput(prev => [
        ...prev,
        { text: `$ ${input}`, type: "command" },
        { text: `Command not allowed. Try one of: ${command.allowedCommands.join(", ")}`, type: "error" }
      ]);
    }
    
    setInput("");
  };

  const handleNextCommand = () => {
    const nextCommand = getNextAvailableCommand(command.id);
    console.log("Next command:", nextCommand);
    if (nextCommand) {
      navigate(`/command/${nextCommand.id}`);
    } else {
      console.log("No next command available");
    }
  };

  return (
    <div className="border border-border rounded-md bg-black text-green-400 font-mono text-sm p-4">
      <div className="min-h-40 max-h-60 overflow-y-auto mb-4 space-y-1">
        {output.map((line, index) => (
          <div 
            key={index}
            className={
              line.type === "error" 
                ? "text-red-400" 
                : line.type === "success" 
                ? "text-green-500"
                : line.type === "command"
                ? "text-yellow-500"
                : ""
            }
          >
            {line.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none"
          placeholder="Type command here... (Use ↑↓ for history)"
          autoFocus
        />
        <Button type="submit" variant="ghost" size="sm" className="text-terminal-green">
          Run
        </Button>
      </form>
      
      {isCompleted && (
        <div className="mt-4 p-2 bg-green-950/30 text-green-400 rounded border border-green-700">
          <div className="flex items-center justify-between">
            <span>Command completed successfully!</span>
            <Button 
              onClick={handleNextCommand} 
              className="flex items-center gap-2 text-sm bg-green-700 hover:bg-green-800"
              size="sm"
            >
              Next Command
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
