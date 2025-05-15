
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn } from "lucide-react";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  
  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!loginForm.username || !loginForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      setIsLoading(false);
      // In a real app, you would handle authentication state and redirect
    }, 1000);
  };
  
  // Handle register form submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!registerForm.username || !registerForm.email || !registerForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Your account has been created",
      });
      setIsLoading(false);
      // In a real app, you would handle authentication state and redirect
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-muted-foreground mt-2">Sign in or create an account</p>
      </div>
      
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                className="ios-input"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                className="ios-input"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end">
              <button type="button" className="text-ios-blue text-sm">
                Forgot password?
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full ios-button"
              disabled={isLoading}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Username"
                className="ios-input"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                className="ios-input"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                className="ios-input"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="ios-input"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full ios-button"
              disabled={isLoading}
            >
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
