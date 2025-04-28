
import React, { createContext, useContext, useState } from "react";
import { commandsData } from "@/data/commands";

type CommandContextType = {
  commands: typeof commandsData;
  activeCommand: string | null;
  completedCommands: string[];
  setActiveCommand: (id: string | null) => void;
  markCommandAsCompleted: (id: string) => void;
  isCommandAvailable: (id: string) => boolean;
};

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);

  const markCommandAsCompleted = (id: string) => {
    if (!completedCommands.includes(id)) {
      setCompletedCommands([...completedCommands, id]);
    }
  };

  const isCommandAvailable = (id: string) => {
    const currentCommandIndex = commandsData.findIndex(cmd => cmd.id === id);
    if (currentCommandIndex === 0) return true;
    
    const previousCommand = commandsData[currentCommandIndex - 1];
    return previousCommand ? completedCommands.includes(previousCommand.id) : true;
  };

  const value = {
    commands: commandsData,
    activeCommand,
    completedCommands,
    setActiveCommand,
    markCommandAsCompleted,
    isCommandAvailable,
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
