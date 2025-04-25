
import React, { createContext, useContext, useState } from "react";
import { commandsData } from "@/data/commands";

type CommandContextType = {
  commands: typeof commandsData;
  activeCommand: string | null;
  setActiveCommand: (id: string | null) => void;
};

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);

  const value = {
    commands: commandsData,
    activeCommand,
    setActiveCommand,
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
