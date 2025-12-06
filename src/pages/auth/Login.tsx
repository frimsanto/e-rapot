import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, Role } from '@/contexts/AppContext';
import { GraduationCap, User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const defaultRouteByRole: Record<Role, string> = {
  siswa: '/siswa',
  guru: '/guru',
  kurikulum: '/kurikulum',
  walikelas: '/walikelas',
  kepalasekolah: '/kepalasekolah',
  admin: '/admin',
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Login gagal',
        description: 'Email dan password wajib diisi.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const role = await login(email, password);
      const target = defaultRouteByRole[role] ?? '/';
      navigate(target, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan saat login.';
      toast({
        title: 'Login gagal',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur-sm">
              <GraduationCap className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">E-Raport PRO</h1>
              <p className="text-primary-foreground/80">Sistem Raport Digital Modern</p>
            </div>
          </div>
          <div className="space-y-6 max-w-md">
            <p className="text-xl leading-relaxed text-primary-foreground/90">
              Platform manajemen raport digital terlengkap untuk SD, SMP, dan SMK dengan fitur modern dan tampilan premium.
            </p>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary-foreground/60" />
                Multi-jenjang pendidikan (SD, SMP, SMK)
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary-foreground/60" />
                6 Role pengguna terintegrasi
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary-foreground/60" />
                Dashboard analitik real-time
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary-foreground/60" />
                Cetak rapor digital otomatis
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-foreground">E-Raport PRO</h1>
                <p className="text-sm text-muted-foreground">Sistem Raport Digital</p>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">Selamat Datang</h2>
            <p className="mt-2 text-muted-foreground">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sekolah.sch.id"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className={cn('btn-primary w-full', isSubmitting && 'opacity-80 cursor-not-allowed')} disabled={isSubmitting}>
              <span>{isSubmitting ? 'Memproses...' : 'Masuk'}</span>
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            © 2024 E-Raport PRO. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
