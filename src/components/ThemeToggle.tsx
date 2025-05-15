
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const { toast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("system");
      applyTheme("system");
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement;
    
    if (newTheme === "dark" || (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      duration: 1500,
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
