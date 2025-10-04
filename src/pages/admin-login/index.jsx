import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Mock admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@enterprise-ux.com',
    password: 'admin123'
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      if (data?.email === ADMIN_CREDENTIALS?.email && data?.password === ADMIN_CREDENTIALS?.password) {
        // Simulate successful login
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          email: data?.email,
          name: 'Admin User',
          loginTime: new Date()?.toISOString()
        }));

        if (rememberMe) {
          localStorage.setItem('rememberAdminLogin', 'true');
        }

        // Navigate to intended destination or dashboard
        const from = location?.state?.from?.pathname || '/admin-dashboard';
        navigate(from, { replace: true });
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset instructions would be sent to your email.');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-muted-foreground">
            Sign in to access the portfolio administration panel
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your admin email"
              required
              error={errors?.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />

            {/* Password Input */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                error={errors?.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e?.target?.checked)}
                  className="h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-md">
                <div className="flex items-center space-x-2 text-error text-sm">
                  <span>{loginError}</span>
                </div>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              className="h-12"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
              <div className="text-xs text-warning font-medium mb-2">Demo Credentials</div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Email: admin@enterprise-ux.com</div>
                <div>Password: admin123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            This is a secure admin area. Your session will expire after 24 hours of inactivity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;