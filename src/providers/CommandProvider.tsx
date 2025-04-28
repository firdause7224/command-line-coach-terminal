
import React, { createContext, useContext, useState } from "react";
import { commandsData } from "@/data/commands";

type CommandContextType = {
  commands: typeof commandsData;
  activeCommand: string | null;
  completedCommands: string[];
  setActiveCommand: (id: string | null) => void;
  markCommandAsCompleted: (id: string) => void;
  isCommandAvailable: (id: string) => boolean;
  getNextAvailableCommand: (currentCommandId: string) => typeof commandsData[0] | null;
};

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);

  const markCommandAsCompleted = (id: string) => {
    if (!completedCommands.includes(id)) {
      setCompletedCommands(prev => [...prev, id]);
      console.log(`Command ${id} marked as completed. All completed:`, [...completedCommands, id]);
    }
  };

  const isCommandAvailable = (id: string) => {
    const currentCommandIndex = commandsData.findIndex(cmd => cmd.id === id);
    if (currentCommandIndex === 0) return true;
    
    const previousCommand = commandsData[currentCommandIndex - 1];
    return previousCommand ? completedCommands.includes(previousCommand.id) : true;
  };

  const getNextAvailableCommand = (currentCommandId: string) => {
    const currentIndex = commandsData.findIndex(cmd => cmd.id === currentCommandId);
    if (currentIndex === -1 || currentIndex >= commandsData.length - 1) return null;
    
    const nextCommand = commandsData[currentIndex + 1];
    return nextCommand;
  };

  const value = {
    commands: commandsData,
    activeCommand,
    completedCommands,
    setActiveCommand,
    markCommandAsCompleted,
    isCommandAvailable,
    getNextAvailableCommand,
  };

  return <CommandContext.Provider value={value}>{children}</CommandContext.Provider>;
}

export const useCommand = () => {
  const context = useContext(CommandContext);
  if (context === undefined) {
    throw new Error("useCommand must be used within a CommandProvider");
  }
  return context;
};
