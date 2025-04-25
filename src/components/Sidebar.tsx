
import { useNavigate } from "react-router-dom";
import { commandCategories, commandsData } from "@/data/commands";
import { useState } from "react";
import { useCommand } from "@/providers/CommandProvider";
import { Terminal, Command, Folder, FileText, Info } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { activeCommand, setActiveCommand } = useCommand();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    commandCategories.map(cat => cat.id)
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCommandClick = (commandId: string) => {
    setActiveCommand(commandId);
    navigate(`/command/${commandId}`);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "folder":
        return <Folder className="w-4 h-4" />;
      case "file":
        return <Command className="w-4 h-4" />;
      case "file-text":
        return <FileText className="w-4 h-4" />;
      case "info":
        return <Info className="w-4 h-4" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Terminal className="w-5 h-5" />
        <h1 className="font-bold text-lg">Command Line Coach</h1>
      </div>
      
      <div className="overflow-y-auto flex-grow p-2">
        {commandCategories.map((category) => (
          <div key={category.id} className="mb-2">
            <div 
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-secondary/50 rounded-md"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center gap-2">
                {getCategoryIcon(category.icon)}
                <span className="font-medium">{category.name}</span>
              </div>
              <span>{expandedCategories.includes(category.id) ? "−" : "+"}</span>
            </div>
            
            {expandedCategories.includes(category.id) && (
              <div className="ml-4 mt-1 space-y-1">
                {commandsData
                  .filter(cmd => cmd.category === category.id)
                  .map(command => (
                    <div
                      key={command.id}
                      className={`sidebar-item ${activeCommand === command.id ? "active" : ""}`}
                      onClick={() => handleCommandClick(command.id)}
                    >
                      <Terminal className="w-4 h-4" />
                      <span>{command.name}</span>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
