import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="w-full max-w-[400px]"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20">
        <div className="border-b border-border bg-bg-elevated px-6 py-8 sm:px-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-text-primary">FleetPro</h1>
            <p className="mt-2 text-sm text-text-secondary">Sign in to continue to your dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-8 sm:px-8">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-text-secondary">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="h-11 border-border bg-bg-elevated text-text-primary placeholder:text-text-secondary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-text-secondary">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="h-11 border-border bg-bg-elevated pr-12 text-text-primary placeholder:text-text-secondary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-3 flex items-center text-text-secondary transition-colors hover:text-text-primary"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-text-secondary">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm font-medium text-primary hover:text-primary-hover">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="h-11 w-full bg-primary text-white hover:bg-primary-hover">
            <span className="mr-2 inline-flex items-center">
              <KeyRound className="h-4 w-4" />
            </span>
            Sign In
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
