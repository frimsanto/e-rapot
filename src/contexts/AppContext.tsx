import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { AuthUser, BackendRole } from '@/types/auth';
import { login as authLogin } from '@/services/authService';

export type Role = 'siswa' | 'guru' | 'kurikulum' | 'walikelas' | 'kepalasekolah' | 'admin';
export type Jenjang = 'SD' | 'SMP' | 'SMA' | 'SMK';

interface User extends AuthUser {
  // Keep lowercase role for existing UI while backend uses BackendRole
  frontendRole: Role;
}

interface AppContextType {
  user: User | null;
  role: Role;
  jenjang: Jenjang;
  setRole: (role: Role) => void;
  setJenjang: (jenjang: Jenjang) => void;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<Role>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const backendToFrontendRole: Record<BackendRole, Role> = {
  SISWA: 'siswa',
  GURU: 'guru',
  KURIKULUM: 'kurikulum',
  WALI_KELAS: 'walikelas',
  KEPALA_SEKOLAH: 'kepalasekolah',
  ADMIN: 'admin',
};

const frontendToBackendRole: Record<Role, BackendRole> = {
  siswa: 'SISWA',
  guru: 'GURU',
  kurikulum: 'KURIKULUM',
  walikelas: 'WALI_KELAS',
  kepalasekolah: 'KEPALA_SEKOLAH',
  admin: 'ADMIN',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>('siswa');
  const [jenjang, setJenjang] = useState<Jenjang>('SMP');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const handleSetRole = (newRole: Role) => {
    // Demo role switcher in navbar: update role and user.frontendRole only
    setRole(newRole);
    setUser((prev) =>
      prev
        ? {
            ...prev,
            frontendRole: newRole,
          }
        : prev,
    );
  };

  const login = async (email: string, password: string): Promise<Role> => {
    const response = await authLogin(email, password);
    const frontendRole = backendToFrontendRole[response.user.role];

    const nextUser: User = {
      ...response.user,
      frontendRole,
    };

    setUser(nextUser);
    setRole(frontendRole);
    if (response.user.jenjang) {
      setJenjang(response.user.jenjang);
    }
    setToken(response.token);
    setIsAuthenticated(true);
    return frontendRole;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        role,
        jenjang,
        setRole: handleSetRole,
        setJenjang,
        setUser,
        isAuthenticated,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
