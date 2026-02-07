import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, User, FlaskConical, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('user');

  const handleLogin = (e) => {
    e.preventDefault();
    // Phase 4: Will implement actual Auth here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-space-950">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-purple/20 via-space-950 to-space-950" />
      <div className="absolute inset-0 bg-noise opacity-20" />
      
      <Card className="w-full max-w-md relative z-10 border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="mx-auto w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center mb-4 border border-accent-purple/30">
            <Rocket className="w-6 h-6 text-accent-purple" />
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access the Deep Space Network</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setSelectedRole('user')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-200 ${
                  selectedRole === 'user' 
                    ? 'bg-accent-purple/20 border-accent-purple text-white' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <User className="w-6 h-6" />
                <span className="text-xs font-medium uppercase tracking-wider">Normal User</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('researcher')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all duration-200 ${
                  selectedRole === 'researcher' 
                    ? 'bg-blue-500/20 border-blue-500 text-white' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <FlaskConical className="w-6 h-6" />
                <span className="text-xs font-medium uppercase tracking-wider">Researcher</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="name@agency.gov"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-accent-purple/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent-purple hover:bg-accent-purple/90 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]"
            >
              Initiate Session <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;