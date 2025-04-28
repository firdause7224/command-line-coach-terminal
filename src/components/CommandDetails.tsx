
import { Command } from "@/data/commands";
import { useCommand } from "@/providers/CommandProvider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CommandDetailsProps {
  command: Command;
}

export default function CommandDetails({ command }: CommandDetailsProps) {
  const { completedCommands, commands, getNextAvailableCommand } = useCommand();
  const navigate = useNavigate();
  const isCompleted = completedCommands.includes(command.id);

  const handleNextCommand = () => {
    const nextCommand = getNextAvailableCommand(command.id);
    if (nextCommand) {
      navigate(`/command/${nextCommand.id}`);
    }
  };

  return (
    <div className="p-6 bg-card rounded-md border border-border">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        {command.name}
        {isCompleted && (
          <span className="text-green-500 text-sm">(Completed)</span>
        )}
      </h2>
      
      {!isCompleted && (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Complete this command's exercises to unlock the next command
          </AlertDescription>
        </Alert>
      )}
      
      {isCompleted && (
        <div className="mb-6 flex justify-end">
          <Button onClick={handleNextCommand} className="flex items-center gap-2">
            Next Command
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{command.description}</p>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Syntax</h3>
          <div className="bg-background p-3 rounded border border-border font-mono">
            {command.syntax}
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Examples</h3>
          <div className="space-y-3">
            {command.examples.map((example, index) => (
              <div key={index} className="bg-background p-4 rounded border border-border">
                <div className="flex items-center text-terminal-green mb-2">
                  <span className="mr-2">$</span>
                  <code>{example.command}</code>
                </div>
                <p className="text-sm text-muted-foreground">{example.explanation}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Interactive Terminal</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Practice with the command below. Try running these allowed commands:
          </p>
          <ul className="list-disc list-inside mb-3 space-y-1">
            {command.allowedCommands.map((cmd, index) => (
              <li key={index} className="text-sm font-mono text-terminal-blue">
                {cmd}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
