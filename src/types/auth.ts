export type Jenjang = 'SD' | 'SMP' | 'SMA' | 'SMK';

export type BackendRole =
  | 'SISWA'
  | 'GURU'
  | 'KURIKULUM'
  | 'WALI_KELAS'
  | 'KEPALA_SEKOLAH'
  | 'ADMIN';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: BackendRole;
  jenjang?: Jenjang;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
