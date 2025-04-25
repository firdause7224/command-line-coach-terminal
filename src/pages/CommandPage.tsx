
import { useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Terminal from "@/components/Terminal";
import CommandDetails from "@/components/CommandDetails";
import { useCommand } from "@/providers/CommandProvider";
import { useEffect } from "react";
import NotFound from "./NotFound";

const CommandPage = () => {
  const { commandId } = useParams<{ commandId: string }>();
  const { commands, setActiveCommand } = useCommand();
  
  const currentCommand = commands.find(cmd => cmd.id === commandId);
  
  useEffect(() => {
    if (commandId) {
      setActiveCommand(commandId);
    }
    
    return () => {
      setActiveCommand(null);
    };
  }, [commandId, setActiveCommand]);
  
  if (!currentCommand) {
    return <NotFound />;
  }
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <CommandDetails command={currentCommand} />
          
          <div className="mt-6">
            <Terminal command={currentCommand} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPage;
