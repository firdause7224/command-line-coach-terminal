
import React, { useState } from "react";
import { useCommand } from "@/providers/CommandProvider";
import { Command } from "@/data/commands";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TerminalProps {
  command: Command;
}

export default function Terminal({ command }: TerminalProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<{ text: string; type: string }[]>([]);
  const { markCommandAsCompleted, completedCommands, getNextAvailableCommand } = useCommand();
  const isCompleted = completedCommands.includes(command.id);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if the input command is allowed
    if (command.allowedCommands.includes(input)) {
      // Get the output for this command
      const commandOutput = command.output[input] || [{ text: "Command not recognized", type: "error" }];
      setOutput(commandOutput);
      
      // Mark command as completed
      markCommandAsCompleted(command.id);
      
      console.log(`Command ${command.id} marked as completed`);
    } else {
      setOutput([{ text: `Command not allowed. Try one of: ${command.allowedCommands.join(", ")}`, type: "error" }]);
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
      <div className="min-h-40 max-h-60 overflow-y-auto mb-4">
        {output.map((line, index) => (
          <div 
            key={index}
            className={line.type === "error" ? "text-red-400" : line.type === "success" ? "text-green-500" : ""}
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
          className="flex-1 bg-transparent border-none outline-none"
          placeholder="Type command here..."
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
