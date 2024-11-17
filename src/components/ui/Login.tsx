import React, { useState, useEffect, useCallback } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import MarvelBackgrond from "@/assets/marvel-background-web.webp";
import MarvelLogo from "@/assets/marvel-logo.svg";
import ShieldSVG from "@/assets/Captain_America_Shield.svg";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const isEmailValid = validateEmail(email);
      const isPasswordValid = password.trim() !== "";

      setIsEmailValid(isEmailValid);
      setIsPasswordValid(isPasswordValid);

      if (!isEmailValid || !isPasswordValid) {
        return;
      }

      setLoading(true);
      localStorage.setItem("userEmail", email);
      setLoading(false);

      toast({
        title: "Login sucessful",
        description: "Welcome back!",
      });
      window.location.reload();
    },
    [email, password, validateEmail]
  );

  return (
    <div
      className="login-container flex justify-center items-center h-screen bg-gray-900 text-white transition-all"
      style={{
        background: `url('${MarvelBackgrond}')`,
        backgroundPosition: "top",
        backgroundSize: "cover",
      }}
    >
      <div className="login-box p-10 rounded-lg shadow-lg bg-gray-900 w-[350px]">
        <div className="text-4xl font-bold flex flex-col gap-2 items-center cursor-pointer justify-center">
          <img
            src={ShieldSVG}
            alt="Marvelpedia"
            className="aspect-square h-24"
          />
          <span className="hover:text-gray-400">Marvelpedia</span>
        </div>
        <p className="text-gray-500 text-sm py-10">
          Welcome to Marvelpedia! Dive into the extraordinary world of heroes,
          villains, and epic tales. But first, let’s unlock your adventure —
          enter your email, and let the journey begin!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email address
            </label>
            <Input
              type="email"
              id="email"
              className="w-full p-2 rounded-lg "
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address.
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              className="w-full p-2 rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <p className="text-red-500 text-sm mt-1">
                Password cannot be empty.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full p-2 rounded-lg mt-4"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>By logging in, you agree to our terms and conditions.</p>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 p-10 bg-gray-950 flex justify-center items-center gap-10 text-white">
        <img src={MarvelLogo} className="h-10" alt="Marvel Logo" />
        <p>
          &copy; {new Date().getFullYear()} Marvel Entertainment. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
