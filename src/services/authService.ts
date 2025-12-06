import { AuthResponse, BackendRole } from '@/types/auth';
import { api } from '@/services/api';

const defaultRouteByRole: Record<BackendRole, string> = {
  SISWA: '/siswa',
  GURU: '/guru',
  KURIKULUM: '/kurikulum',
  WALI_KELAS: '/walikelas',
  KEPALA_SEKOLAH: '/kepalasekolah',
  ADMIN: '/admin',
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', { email, password });
  return res;
}

export { defaultRouteByRole };
