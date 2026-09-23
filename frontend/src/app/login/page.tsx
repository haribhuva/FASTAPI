"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Eye, EyeOff, User, Lock, Mail, UserPlus, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Mode = "login" | "register";

async function postJson(path: string, body: unknown) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      typeof data.detail === "string" ? data.detail : `Request failed (${res.status})`
    );
  }
  return data;
}

function Field({
  id,
  label,
  icon: Icon,
  endElement,
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  endElement?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-foreground/80">
        {label}
      </Label>
      <div className="relative flex items-center">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
        )}
        <Input
          id={id}
          className={`${Icon ? "pl-9" : ""} ${endElement ? "pr-10" : ""}`}
          {...props}
        />
        {endElement && <div className="absolute right-2 flex items-center">{endElement}</div>}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState<{ text: string; type: "error" | "success" } | null>(null);
  const [busy, setBusy] = useState(false);

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setMsg(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (mode === "register") {
      if (password !== confirmPassword) {
        setMsg({ text: "Passwords do not match", type: "error" });
        return;
      }
    }

    setBusy(true);

    try {
      if (mode === "login") {
        const data = await postJson("/login", { username, password });
        setMsg({
          text: data.message ?? `Welcome back, ${data.username ?? username}!`,
          type: "success",
        });
      } else {
        const data = await postJson("/register", { username, email, password });
        setMsg({
          text: data.message ?? `Account created successfully for ${username}!`,
          type: "success",
        });
      }
    } catch (err) {
      setMsg({
        text: err instanceof Error ? err.message : "Request failed. Please try again.",
        type: "error",
      });
    } finally {
      setBusy(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <Card className="w-full max-w-md shadow-xl border border-border/50 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-4 text-center sm:text-left">
          {/* Mode Switcher Tabs */}
          <div className="flex w-full rounded-xl bg-muted p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 transition-all ${
                isLogin
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LogIn className="size-3.5" />
              <span>Login</span>
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 transition-all ${
                !isLogin
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <UserPlus className="size-3.5" />
              <span>New User / Register</span>
            </button>
          </div>

          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              {isLogin ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              {isLogin
                ? "Enter your credentials to sign in to your account."
                : "Fill in all fields below to register as a new user."}
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            {/* Username Field */}
            <Field
              id="username"
              label="Username"
              icon={User}
              placeholder={isLogin ? "e.g. johndoe" : "Choose a unique username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />

            {/* Email Field - Register Mode Only */}
            {!isLogin && (
              <Field
                id="email"
                label="Email Address"
                icon={Mail}
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            )}

            {/* Password Field */}
            <Field
              id="password"
              label="Password"
              icon={Lock}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              endElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />

            {/* Confirm Password Field - Register Mode Only */}
            {!isLogin && (
              <Field
                id="confirmPassword"
                label="Confirm Password"
                icon={Lock}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            )}

            {/* Status Feedback Message */}
            {msg && (
              <div
                className={`flex items-center gap-2 rounded-lg p-3 text-xs font-medium border ${
                  msg.type === "error"
                    ? "bg-destructive/10 text-destructive border-destructive/20"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                }`}
                role="status"
              >
                {msg.type === "error" ? (
                  <AlertCircle className="size-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="size-4 shrink-0" />
                )}
                <span>{msg.text}</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-2 flex flex-col gap-3">
            <Button
              type="submit"
              variant="default"
              className="w-full font-semibold shadow"
              isDisabled={busy}
            >
              {busy ? (
                <span>{isLogin ? "Signing in..." : "Creating Account..."}</span>
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? <LogIn className="size-4" /> : <UserPlus className="size-4" />}
                  {isLogin ? "Login" : "Register Account"}
                </span>
              )}
            </Button>

            {/* Bottom Mode Switch Link */}
            <div className="text-center text-xs text-muted-foreground">
              {isLogin ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("register")}
                    className="font-semibold text-primary underline-offset-4 hover:underline transition-all"
                  >
                    New user / Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => switchMode("login")}
                    className="font-semibold text-primary underline-offset-4 hover:underline transition-all"
                  >
                    Login to existing account
                  </button>
                </p>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

