import { useApp, Role, Jenjang } from '@/contexts/AppContext';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const jenjangColors: Record<Jenjang, string> = {
  SD: 'badge-sd',
  SMP: 'badge-smp',
  SMK: 'badge-smk',
};

const roleLabels: Record<Role, string> = {
  siswa: 'Siswa',
  guru: 'Guru',
  kurikulum: 'Kurikulum',
  walikelas: 'Wali Kelas',
  kepalasekolah: 'Kepala Sekolah',
  admin: 'Administrator',
};

export const Navbar = () => {
  const { user, role, jenjang, setRole, setJenjang, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    navigate(`/${newRole}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left - Breadcrumb/Title */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Jenjang Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                <Badge variant="outline" className={cn('font-semibold', jenjangColors[jenjang])}>
                  {jenjang}
                </Badge>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Pilih Jenjang</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(['SD', 'SMP', 'SMK'] as Jenjang[]).map((j) => (
                <DropdownMenuItem
                  key={j}
                  onClick={() => setJenjang(j)}
                  className={cn(jenjang === j && 'bg-accent')}
                >
                  <Badge variant="outline" className={cn('mr-2', jenjangColors[j])}>
                    {j}
                  </Badge>
                  {j === 'SD' && 'Sekolah Dasar'}
                  {j === 'SMP' && 'SMP'}
                  {j === 'SMK' && 'SMK'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Role Switcher (Demo) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent">
                <span className="text-muted-foreground">Role:</span>
                <span>{roleLabels[role]}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(roleLabels) as Role[]).map((r) => (
                <DropdownMenuItem
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={cn(role === r && 'bg-accent')}
                >
                  {roleLabels[r]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                    {user ? getInitials(user.name) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
