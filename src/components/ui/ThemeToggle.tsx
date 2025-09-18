import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sun, Moon, Laptop } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved theme, default to system
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'system';
  });

  useEffect(() => {
    const applyTheme = (newTheme: Theme) => {
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (newTheme === 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        // System theme
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemPrefersDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    applyTheme(theme);

    // Listen for system theme changes when system theme is selected
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Laptop className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-primary/10 transition-colors"
        >
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-background border border-border shadow-lg z-50"
      >
        <DropdownMenuItem 
          onClick={() => handleThemeChange('light')}
          className="flex items-center gap-2 cursor-pointer hover:bg-primary/10"
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('dark')}
          className="flex items-center gap-2 cursor-pointer hover:bg-primary/10"
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange('system')}
          className="flex items-center gap-2 cursor-pointer hover:bg-primary/10"
        >
          <Laptop className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;