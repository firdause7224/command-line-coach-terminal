
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="p-3 rounded-full bg-secondary">
              <Terminal className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">Command Line Coach</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Learn command line tools interactively with our built-in terminal simulator. 
            Master essential commands with guided examples and practical exercises.
          </p>
          
          <div className="mb-10">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate("/command/ls")}
            >
              Start Learning
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Feature 
              title="Interactive Terminal" 
              description="Practice commands in a realistic terminal environment without any risk to your system."
            />
            <Feature 
              title="Step-by-Step Tutorials" 
              description="Learn commands with clear examples and explanations for different use cases."
            />
            <Feature 
              title="Command Categories" 
              description="Explore different command types from navigation to system management."
            />
          </div>
        </div>
      </div>
      
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Command Line Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

function Feature({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 bg-card rounded-lg border border-border">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default Index;
