import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'siswa' | 'guru' | 'kurikulum' | 'walikelas' | 'kepalasekolah' | 'admin';
export type Jenjang = 'SD' | 'SMP' | 'SMK';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
}

interface AppContextType {
  user: User | null;
  role: Role;
  jenjang: Jenjang;
  setRole: (role: Role) => void;
  setJenjang: (jenjang: Jenjang) => void;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultUsers: Record<Role, User> = {
  siswa: { id: '1', name: 'Ahmad Fauzi', email: 'ahmad@siswa.sch.id', role: 'siswa' },
  guru: { id: '2', name: 'Ibu Sri Wahyuni', email: 'sri@guru.sch.id', role: 'guru' },
  kurikulum: { id: '3', name: 'Pak Bambang Hartono', email: 'bambang@sekolah.sch.id', role: 'kurikulum' },
  walikelas: { id: '4', name: 'Ibu Dewi Sartika', email: 'dewi@guru.sch.id', role: 'walikelas' },
  kepalasekolah: { id: '5', name: 'Dr. Hadi Suprapto', email: 'kepala@sekolah.sch.id', role: 'kepalasekolah' },
  admin: { id: '6', name: 'Administrator', email: 'admin@sekolah.sch.id', role: 'admin' },
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>('siswa');
  const [jenjang, setJenjang] = useState<Jenjang>('SMP');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    if (isAuthenticated) {
      setUser(defaultUsers[newRole]);
    }
  };

  const login = (selectedRole: Role) => {
    setRole(selectedRole);
    setUser(defaultUsers[selectedRole]);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
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
