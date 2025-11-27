import { Jenjang } from '@/contexts/AppContext';

// Users
export const users = [
  { id: '1', name: 'Ahmad Fauzi', email: 'ahmad@siswa.sch.id', role: 'siswa', class: 'IX-A', nisn: '0012345678' },
  { id: '2', name: 'Siti Nurhaliza', email: 'siti@siswa.sch.id', role: 'siswa', class: 'IX-A', nisn: '0012345679' },
  { id: '3', name: 'Budi Santoso', email: 'budi@siswa.sch.id', role: 'siswa', class: 'IX-B', nisn: '0012345680' },
  { id: '4', name: 'Ibu Sri Wahyuni', email: 'sri@guru.sch.id', role: 'guru', nip: '198501012010012001' },
  { id: '5', name: 'Pak Bambang Hartono', email: 'bambang@sekolah.sch.id', role: 'kurikulum', nip: '197801012005011001' },
  { id: '6', name: 'Ibu Dewi Sartika', email: 'dewi@guru.sch.id', role: 'walikelas', nip: '198201012008012001', class: 'IX-A' },
  { id: '7', name: 'Dr. Hadi Suprapto', email: 'kepala@sekolah.sch.id', role: 'kepalasekolah', nip: '196501011990011001' },
  { id: '8', name: 'Administrator', email: 'admin@sekolah.sch.id', role: 'admin' },
];

// Classes
export const classes = [
  { id: '1', name: 'VII-A', grade: 7, jenjang: 'SMP' as Jenjang, homeroom: 'Ibu Ani', students: 32 },
  { id: '2', name: 'VII-B', grade: 7, jenjang: 'SMP' as Jenjang, homeroom: 'Pak Dedi', students: 30 },
  { id: '3', name: 'VIII-A', grade: 8, jenjang: 'SMP' as Jenjang, homeroom: 'Ibu Ratna', students: 31 },
  { id: '4', name: 'VIII-B', grade: 8, jenjang: 'SMP' as Jenjang, homeroom: 'Pak Agus', students: 32 },
  { id: '5', name: 'IX-A', grade: 9, jenjang: 'SMP' as Jenjang, homeroom: 'Ibu Dewi Sartika', students: 30 },
  { id: '6', name: 'IX-B', grade: 9, jenjang: 'SMP' as Jenjang, homeroom: 'Pak Joko', students: 31 },
  { id: '7', name: 'I-A', grade: 1, jenjang: 'SD' as Jenjang, homeroom: 'Ibu Maya', students: 28 },
  { id: '8', name: 'X-TKJ-1', grade: 10, jenjang: 'SMK' as Jenjang, homeroom: 'Pak Rudi', students: 36 },
  { id: '9', name: 'XI-TKJ-1', grade: 11, jenjang: 'SMK' as Jenjang, homeroom: 'Ibu Tika', students: 35 },
  { id: '10', name: 'XII-TKJ-1', grade: 12, jenjang: 'SMK' as Jenjang, homeroom: 'Pak Hendra', students: 34 },
];

// Subjects by Jenjang
export const subjects: Record<Jenjang, { id: string; name: string; code: string }[]> = {
  SD: [
    { id: '1', name: 'Pendidikan Agama', code: 'PAI' },
    { id: '2', name: 'PKn', code: 'PKN' },
    { id: '3', name: 'Bahasa Indonesia', code: 'BIND' },
    { id: '4', name: 'Matematika', code: 'MTK' },
    { id: '5', name: 'IPA', code: 'IPA' },
    { id: '6', name: 'IPS', code: 'IPS' },
    { id: '7', name: 'SBdP', code: 'SBDP' },
    { id: '8', name: 'PJOK', code: 'PJOK' },
  ],
  SMP: [
    { id: '1', name: 'Pendidikan Agama', code: 'PAI' },
    { id: '2', name: 'PKn', code: 'PKN' },
    { id: '3', name: 'Bahasa Indonesia', code: 'BIND' },
    { id: '4', name: 'Matematika', code: 'MTK' },
    { id: '5', name: 'IPA', code: 'IPA' },
    { id: '6', name: 'IPS', code: 'IPS' },
    { id: '7', name: 'Bahasa Inggris', code: 'BING' },
    { id: '8', name: 'Seni Budaya', code: 'SENBUD' },
    { id: '9', name: 'PJOK', code: 'PJOK' },
    { id: '10', name: 'Prakarya', code: 'PRKY' },
    { id: '11', name: 'Informatika', code: 'INFO' },
  ],
  SMK: [
    { id: '1', name: 'Pendidikan Agama', code: 'PAI' },
    { id: '2', name: 'PKn', code: 'PKN' },
    { id: '3', name: 'Bahasa Indonesia', code: 'BIND' },
    { id: '4', name: 'Matematika', code: 'MTK' },
    { id: '5', name: 'Bahasa Inggris', code: 'BING' },
    { id: '6', name: 'Sejarah Indonesia', code: 'SEJI' },
    { id: '7', name: 'Simulasi Digital', code: 'SIMDIG' },
    { id: '8', name: 'Fisika', code: 'FIS' },
    { id: '9', name: 'Kimia', code: 'KIM' },
    { id: '10', name: 'Komputer & Jaringan', code: 'KJ' },
    { id: '11', name: 'Pemrograman Dasar', code: 'PROGDAS' },
    { id: '12', name: 'Sistem Operasi', code: 'SO' },
  ],
};

// Students with grades
export const students = [
  { id: '1', name: 'Ahmad Fauzi', nisn: '0012345678', class: 'IX-A', gender: 'L', status: 'active' },
  { id: '2', name: 'Siti Nurhaliza', nisn: '0012345679', class: 'IX-A', gender: 'P', status: 'active' },
  { id: '3', name: 'Budi Santoso', nisn: '0012345680', class: 'IX-A', gender: 'L', status: 'active' },
  { id: '4', name: 'Putri Wulandari', nisn: '0012345681', class: 'IX-A', gender: 'P', status: 'active' },
  { id: '5', name: 'Andi Pratama', nisn: '0012345682', class: 'IX-A', gender: 'L', status: 'active' },
  { id: '6', name: 'Rina Marlina', nisn: '0012345683', class: 'IX-A', gender: 'P', status: 'active' },
  { id: '7', name: 'Dimas Arya', nisn: '0012345684', class: 'IX-A', gender: 'L', status: 'active' },
  { id: '8', name: 'Fitri Handayani', nisn: '0012345685', class: 'IX-A', gender: 'P', status: 'active' },
  { id: '9', name: 'Reza Mahendra', nisn: '0012345686', class: 'IX-B', gender: 'L', status: 'active' },
  { id: '10', name: 'Anisa Putri', nisn: '0012345687', class: 'IX-B', gender: 'P', status: 'active' },
];

// Grades
export const grades = [
  { studentId: '1', subjectId: '1', tugas: 85, ulangan: 88, uts: 82, uas: 86, final: 85 },
  { studentId: '1', subjectId: '2', tugas: 78, ulangan: 82, uts: 80, uas: 84, final: 81 },
  { studentId: '1', subjectId: '3', tugas: 90, ulangan: 88, uts: 92, uas: 89, final: 90 },
  { studentId: '1', subjectId: '4', tugas: 75, ulangan: 78, uts: 72, uas: 80, final: 76 },
  { studentId: '1', subjectId: '5', tugas: 88, ulangan: 85, uts: 87, uas: 90, final: 88 },
  { studentId: '1', subjectId: '6', tugas: 82, ulangan: 80, uts: 85, uas: 83, final: 82 },
  { studentId: '1', subjectId: '7', tugas: 92, ulangan: 90, uts: 88, uas: 94, final: 91 },
  { studentId: '1', subjectId: '8', tugas: 85, ulangan: 87, uts: 83, uas: 86, final: 85 },
];

// Schedule
export const schedule = [
  { day: 'Senin', time: '07:00-07:45', subject: 'Upacara', class: 'All', teacher: '-' },
  { day: 'Senin', time: '07:45-09:15', subject: 'Matematika', class: 'IX-A', teacher: 'Pak Agus' },
  { day: 'Senin', time: '09:30-11:00', subject: 'Bahasa Indonesia', class: 'IX-A', teacher: 'Ibu Sri' },
  { day: 'Senin', time: '11:00-12:30', subject: 'IPA', class: 'IX-A', teacher: 'Pak Bambang' },
  { day: 'Selasa', time: '07:00-08:30', subject: 'Bahasa Inggris', class: 'IX-A', teacher: 'Ibu Maya' },
  { day: 'Selasa', time: '08:45-10:15', subject: 'IPS', class: 'IX-A', teacher: 'Pak Dedi' },
  { day: 'Selasa', time: '10:30-12:00', subject: 'PKn', class: 'IX-A', teacher: 'Ibu Ratna' },
  { day: 'Rabu', time: '07:00-08:30', subject: 'Matematika', class: 'IX-A', teacher: 'Pak Agus' },
  { day: 'Rabu', time: '08:45-10:15', subject: 'Seni Budaya', class: 'IX-A', teacher: 'Ibu Tika' },
  { day: 'Rabu', time: '10:30-12:00', subject: 'Prakarya', class: 'IX-A', teacher: 'Pak Rudi' },
  { day: 'Kamis', time: '07:00-08:30', subject: 'IPA', class: 'IX-A', teacher: 'Pak Bambang' },
  { day: 'Kamis', time: '08:45-10:15', subject: 'Bahasa Indonesia', class: 'IX-A', teacher: 'Ibu Sri' },
  { day: 'Kamis', time: '10:30-12:00', subject: 'Informatika', class: 'IX-A', teacher: 'Pak Hendra' },
  { day: 'Jumat', time: '07:00-08:30', subject: 'Pendidikan Agama', class: 'IX-A', teacher: 'Pak Usman' },
  { day: 'Jumat', time: '08:45-10:15', subject: 'PJOK', class: 'IX-A', teacher: 'Pak Joko' },
];

// Attendance
export const attendance = [
  { date: '2024-01-02', status: 'hadir', note: '' },
  { date: '2024-01-03', status: 'hadir', note: '' },
  { date: '2024-01-04', status: 'hadir', note: '' },
  { date: '2024-01-05', status: 'sakit', note: 'Demam' },
  { date: '2024-01-08', status: 'hadir', note: '' },
  { date: '2024-01-09', status: 'hadir', note: '' },
  { date: '2024-01-10', status: 'izin', note: 'Acara keluarga' },
  { date: '2024-01-11', status: 'hadir', note: '' },
  { date: '2024-01-12', status: 'hadir', note: '' },
  { date: '2024-01-15', status: 'hadir', note: '' },
];

// Semesters
export const semesters = [
  { id: '1', name: 'Ganjil 2023/2024', year: '2023/2024', semester: 1, isActive: false, startDate: '2023-07-17', endDate: '2023-12-22' },
  { id: '2', name: 'Genap 2023/2024', year: '2023/2024', semester: 2, isActive: true, startDate: '2024-01-08', endDate: '2024-06-21' },
  { id: '3', name: 'Ganjil 2024/2025', year: '2024/2025', semester: 1, isActive: false, startDate: '2024-07-15', endDate: '2024-12-20' },
];

// Grade progression (for charts)
export const gradeProgression = [
  { semester: 'Sem 1 2022', average: 78 },
  { semester: 'Sem 2 2022', average: 80 },
  { semester: 'Sem 1 2023', average: 82 },
  { semester: 'Sem 2 2023', average: 81 },
  { semester: 'Sem 1 2024', average: 85 },
  { semester: 'Sem 2 2024', average: 87 },
];

// School KPIs
export const schoolKPIs = {
  totalStudents: 856,
  totalTeachers: 52,
  averageAttendance: 94.5,
  averageGrade: 82.3,
  graduationRate: 98.2,
  nationalExamAvg: 76.8,
};

// PKL Data (SMK)
export const pklData = [
  { id: '1', studentName: 'Ahmad Fauzi', company: 'PT. Telkom Indonesia', supervisor: 'Pak Joko', startDate: '2024-01-15', endDate: '2024-04-15', status: 'active', score: null },
  { id: '2', studentName: 'Siti Nurhaliza', company: 'CV. Mitra Solusi', supervisor: 'Ibu Ratna', startDate: '2024-01-15', endDate: '2024-04-15', status: 'active', score: null },
  { id: '3', studentName: 'Budi Santoso', company: 'PT. Bank Mandiri', supervisor: 'Pak Agus', startDate: '2023-07-01', endDate: '2023-10-01', status: 'completed', score: 88 },
];

// Extracurriculars (SMP)
export const extracurriculars = [
  { id: '1', name: 'Pramuka', coach: 'Pak Dedi', schedule: 'Sabtu 08:00-10:00', members: 45 },
  { id: '2', name: 'Basket', coach: 'Pak Joko', schedule: 'Rabu 15:00-17:00', members: 24 },
  { id: '3', name: 'Paduan Suara', coach: 'Ibu Tika', schedule: 'Kamis 15:00-17:00', members: 32 },
  { id: '4', name: 'English Club', coach: 'Ibu Maya', schedule: 'Selasa 15:00-17:00', members: 28 },
  { id: '5', name: 'Robotika', coach: 'Pak Hendra', schedule: 'Jumat 15:00-17:00', members: 18 },
];

// Student notes (for Wali Kelas)
export const studentNotes = [
  { id: '1', studentId: '1', studentName: 'Ahmad Fauzi', date: '2024-01-15', type: 'behavior', note: 'Aktif dalam diskusi kelas, menunjukkan kepemimpinan yang baik.', author: 'Ibu Dewi' },
  { id: '2', studentId: '2', studentName: 'Siti Nurhaliza', date: '2024-01-12', type: 'achievement', note: 'Juara 2 Lomba Karya Tulis Ilmiah tingkat kabupaten.', author: 'Ibu Dewi' },
  { id: '3', studentId: '3', studentName: 'Budi Santoso', date: '2024-01-10', type: 'concern', note: 'Perlu perhatian khusus pada mata pelajaran Matematika.', author: 'Ibu Dewi' },
];

// Documents
export const documents = [
  { id: '1', name: 'Rapor Semester Ganjil 2023/2024', type: 'rapor', date: '2023-12-22', size: '2.4 MB', status: 'available' },
  { id: '2', name: 'Sertifikat Lomba KTI', type: 'certificate', date: '2024-01-15', size: '1.2 MB', status: 'available' },
  { id: '3', name: 'Kartu Pelajar Digital', type: 'card', date: '2023-07-20', size: '0.5 MB', status: 'available' },
  { id: '4', name: 'Surat Keterangan Aktif', type: 'letter', date: '2024-01-08', size: '0.3 MB', status: 'available' },
];

// Teacher schedule
export const teacherSchedule = [
  { day: 'Senin', time: '07:45-09:15', subject: 'Matematika', class: 'IX-A' },
  { day: 'Senin', time: '09:30-11:00', subject: 'Matematika', class: 'IX-B' },
  { day: 'Selasa', time: '07:00-08:30', subject: 'Matematika', class: 'VIII-A' },
  { day: 'Selasa', time: '10:30-12:00', subject: 'Matematika', class: 'VIII-B' },
  { day: 'Rabu', time: '07:00-08:30', subject: 'Matematika', class: 'IX-A' },
  { day: 'Rabu', time: '08:45-10:15', subject: 'Matematika', class: 'VII-A' },
  { day: 'Kamis', time: '08:45-10:15', subject: 'Matematika', class: 'VII-B' },
  { day: 'Kamis', time: '10:30-12:00', subject: 'Matematika', class: 'IX-B' },
  { day: 'Jumat', time: '07:00-08:30', subject: 'Matematika', class: 'VIII-A' },
];

// Class summary for school principal
export const classSummary = [
  { class: 'VII-A', avgGrade: 81.5, attendance: 95.2, atRisk: 2, totalStudents: 32 },
  { class: 'VII-B', avgGrade: 79.8, attendance: 93.8, atRisk: 4, totalStudents: 30 },
  { class: 'VIII-A', avgGrade: 83.2, attendance: 96.1, atRisk: 1, totalStudents: 31 },
  { class: 'VIII-B', avgGrade: 80.4, attendance: 94.5, atRisk: 3, totalStudents: 32 },
  { class: 'IX-A', avgGrade: 85.6, attendance: 97.2, atRisk: 0, totalStudents: 30 },
  { class: 'IX-B', avgGrade: 82.1, attendance: 95.8, atRisk: 2, totalStudents: 31 },
];

// Rapor approval status
export const raporApproval = [
  { id: '1', class: 'VII-A', semester: 'Genap 2023/2024', status: 'pending', submittedBy: 'Ibu Ani', submittedAt: '2024-06-18' },
  { id: '2', class: 'VII-B', semester: 'Genap 2023/2024', status: 'approved', submittedBy: 'Pak Dedi', submittedAt: '2024-06-17', approvedAt: '2024-06-18' },
  { id: '3', class: 'VIII-A', semester: 'Genap 2023/2024', status: 'pending', submittedBy: 'Ibu Ratna', submittedAt: '2024-06-18' },
  { id: '4', class: 'VIII-B', semester: 'Genap 2023/2024', status: 'rejected', submittedBy: 'Pak Agus', submittedAt: '2024-06-16', rejectedAt: '2024-06-17', reason: 'Data nilai belum lengkap' },
  { id: '5', class: 'IX-A', semester: 'Genap 2023/2024', status: 'approved', submittedBy: 'Ibu Dewi', submittedAt: '2024-06-15', approvedAt: '2024-06-16' },
  { id: '6', class: 'IX-B', semester: 'Genap 2023/2024', status: 'pending', submittedBy: 'Pak Joko', submittedAt: '2024-06-18' },
];

// Monthly attendance summary
export const monthlyAttendance = [
  { month: 'Jan', hadir: 92, sakit: 4, izin: 3, alpha: 1 },
  { month: 'Feb', hadir: 94, sakit: 3, izin: 2, alpha: 1 },
  { month: 'Mar', hadir: 96, sakit: 2, izin: 1, alpha: 1 },
  { month: 'Apr', hadir: 93, sakit: 4, izin: 2, alpha: 1 },
  { month: 'May', hadir: 95, sakit: 2, izin: 2, alpha: 1 },
  { month: 'Jun', hadir: 94, sakit: 3, izin: 2, alpha: 1 },
];

// P5 Projects (SMP)
export const p5Projects = [
  { id: '1', name: 'Kearifan Lokal', theme: 'Bhinneka Tunggal Ika', status: 'completed', score: 88 },
  { id: '2', name: 'Lingkungan Hijau', theme: 'Gaya Hidup Berkelanjutan', status: 'ongoing', score: null },
  { id: '3', name: 'Wirausaha Muda', theme: 'Kewirausahaan', status: 'planned', score: null },
];

// UKK Data (SMK)
export const ukkData = [
  { id: '1', name: 'Instalasi Jaringan Komputer', date: '2024-04-15', duration: '8 jam', status: 'scheduled', score: null },
  { id: '2', name: 'Administrasi Server', date: '2024-04-16', duration: '6 jam', status: 'scheduled', score: null },
  { id: '3', name: 'Pemrograman Web', date: '2024-04-17', duration: '8 jam', status: 'scheduled', score: null },
];

// Growth notes (SD)
export const growthNotes = [
  { id: '1', date: '2024-01-15', height: 135, weight: 32, note: 'Pertumbuhan normal sesuai usia.' },
  { id: '2', date: '2023-07-20', height: 132, weight: 30, note: 'Pertumbuhan baik, perlu ditingkatkan asupan gizi.' },
  { id: '3', date: '2023-01-18', height: 128, weight: 28, note: 'Dalam rentang normal.' },
];

// Behavior notes (SD)
export const behaviorNotes = [
  { id: '1', aspect: 'Sikap Spiritual', grade: 'Baik', description: 'Rajin beribadah dan berdoa sebelum belajar.' },
  { id: '2', aspect: 'Sikap Sosial', grade: 'Sangat Baik', description: 'Suka menolong teman dan sopan kepada guru.' },
  { id: '3', aspect: 'Kedisiplinan', grade: 'Baik', description: 'Tepat waktu dan mengerjakan tugas dengan baik.' },
];
