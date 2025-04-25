
import { Command } from "@/data/commands";

interface CommandDetailsProps {
  command: Command;
}

export default function CommandDetails({ command }: CommandDetailsProps) {
  return (
    <div className="p-4 bg-card rounded-md border border-border">
      <h2 className="text-2xl font-bold mb-2">{command.name}</h2>
      <p className="text-muted-foreground mb-4">{command.description}</p>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Syntax</h3>
        <div className="bg-background p-2 rounded border border-border font-mono">
          {command.syntax}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Examples</h3>
        <div className="space-y-2">
          {command.examples.map((example, index) => (
            <div key={index} className="bg-background p-3 rounded border border-border">
              <div className="flex items-center text-terminal-green">
                <span className="mr-2">$</span>
                <code>{example.command}</code>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{example.explanation}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Interactive Terminal</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Try running the command below. Valid commands for this terminal are:
        </p>
        <ul className="list-disc list-inside mb-3 space-y-1">
          {command.allowedCommands.map((cmd, index) => (
            <li key={index} className="text-sm font-mono text-terminal-blue">
              {cmd}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
