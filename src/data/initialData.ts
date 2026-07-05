import { UserProfile, Song, Playlist, Artist, Album, UserSettings } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_cloud_99',
  name: 'Usuário Cloud',
  email: 'usuario@email.com',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAMZgXj8f96akVN5CiFaDHA5zhLzojah62MLCg2vYlQ3LWO5EpbsRamDYlOpSqgXLyd2M30O_Gxzhjkk1A3xn0XMeixQNOaHSbEyXgj5y7Vj7yHJ1JwqCPm4KpJWEn_0MRye8zkasaF9A3s8NZXMDY_FuhKweswkLv6OITABsOONMMi6o1j-gkxplMb1aJlH27JKJ35p_9fsCXHN_3xSAar2lb_kFalb6oKiDxcBvE-tw5GgGKl2-auJA',
  registeredAt: '12 de Maio de 2024',
  plan: 'Supabase Nuvem VIP (Ilimitado)',
  storageUsedGB: 12.4,
  storageTotalGB: 50.0,
};

export const INITIAL_SONGS: Song[] = [
  {
    id: 's_1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    durationFormatted: '3:20',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGdZwIS0dyYKpMw2YckjeHO7KMice_WBYrxdNM1YY8K2A6AEWj_uzSIPC1lTOLuTieBwGkc3HzZ3xNoC7Gz4Gzs1WruVIeetF59gOzwMDc6CivjqecJe7gzZbNhuIseGHLhGa-skoK0dv5XlbXumT5duKIeOGrok-IEf-rby1P8-sQAUfUXlWzNzTEt7ggaralRHLcawtQfAQy_v0GRRRRGqtXehkLqpGCyurvubHcDxJd9Ui65E64VQ',
    format: 'MP3',
    genre: 'Synthwave / Pop',
    isFavorite: true,
    isDownloaded: true,
    isUploaded: true,
    fileSizeBytes: 8178892,
    fileSizeFormatted: '7.8 MB',
    year: 2020,
    folderPath: '/storage/emulated/0/Music/Pop',
  },
  {
    id: 's_2',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    durationFormatted: '3:23',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHhIy-84nQFeSEXbBePHuxe6ORsCgOzB-ueZEimJFd9YjAs6GU-EMxB-QRkkTF1O1NwZLuBHHJvSsjhlFmILfLUdsdun8DVcJ4fKf-_0cBtbxJ7NOB09G0c_YiBPp5g2vyUDG1p8QIvi4R7HST3b4v_xGKD0vJbRbTEU_XYwW8-gV7oQENtoL4KpsWVPeF__FTj9EzjykbWtcLwKzklp64ZEaTOJGRvKnRyD16khnEXundqTfuPHwjg',
    format: 'FLAC',
    genre: 'Disco Pop',
    isFavorite: true,
    isDownloaded: true,
    isUploaded: true,
    fileSizeBytes: 24117248,
    fileSizeFormatted: '23.0 MB',
    year: 2020,
    folderPath: '/storage/emulated/0/Music/HiRes',
  },
  {
    id: 's_3',
    title: 'Sunflower',
    artist: 'Post Malone & Swae Lee',
    album: 'Spider-Man: Into the Spider-Verse',
    duration: 158,
    durationFormatted: '2:38',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA2VhJp4XsKM1FPhwyKaS6bjHTzE3hpk7z3-zHaCE6D9HrN6Me_zI9rvExTlHjB1aghAFlDrW1BcKrL6u8qPWVRGOgVWuRgDD5LkW03ust25OvvtyTOVJQc-tv8ltYMo64uF4LlRKmO3EH7E7Ny_5p-I2wboKkIeCwBZJYEOz3bjoojyOuFgniaL6SHueq8fHQfE6DQwpVIRcgjkqBSJEfdIDRGfQSTgeKj7OhfJ-xHAW3ffHWlFxltoA',
    format: 'MP3',
    genre: 'Hip-Hop / Pop',
    isFavorite: true,
    isDownloaded: true,
    isUploaded: true,
    fileSizeBytes: 6291456,
    fileSizeFormatted: '6.0 MB',
    year: 2018,
    folderPath: '/storage/emulated/0/Music/OST',
  },
  {
    id: 's_4',
    title: 'Peaches',
    artist: 'Justin Bieber ft. Daniel Caesar',
    album: 'Justice',
    duration: 198,
    durationFormatted: '3:18',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHWE63rl6IGE28lpQiG89fyWvwZgnWKvEXpqX2G4tpeVwCUaxgwaIIVFX15UEql_zRrjfroiBWv0NKtsKaGwk7h0Pvmj36hDEM2Q7DgL4tYSkYEje13MP7txLj54jYE38PdGJYtQXtaFVBdNYgMzhuW_jZM0t_Vnro8Y7QKreewYiCTiBy2djLyWKIeYU-9moWrOAlghHQycAXFX4Ucy_vy9GGeebcyynsqSE0c8i7OkPyL1X9fsAw6Q',
    format: 'WAV',
    genre: 'R&B / Soul',
    isFavorite: false,
    isDownloaded: false,
    isUploaded: true,
    fileSizeBytes: 33554432,
    fileSizeFormatted: '32.0 MB',
    year: 2021,
    folderPath: '/storage/emulated/0/Downloads',
  },
  {
    id: 's_5',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    durationFormatted: '3:58',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQYKBUP3dCGfuQ7TvmUTn5L9ujDJE-aEzvXRImOxXKNEY3CvG6_nHmXqjkPjC1QX-XGOLklsOUOA497LY3_bVfaLPhvbUsVbIwVYaaKGAWP-xTsS9OWwijv7Kulab0iD3StdWOudqU9wFyhy1_SOpogdZn6mtwISyhgDDdJRfwHHgkP9voBRmvMHetihZ9ZX9-c9xSWC38KYPNRRPMaDPqfcJ5EYXCgg819Zu6o-7LxPOoH5xARL4SLg',
    format: 'MP3',
    genre: 'Indie Pop',
    isFavorite: true,
    isDownloaded: true,
    isUploaded: true,
    fileSizeBytes: 9542041,
    fileSizeFormatted: '9.1 MB',
    year: 2020,
    folderPath: '/storage/emulated/0/Music/Indie',
  },
  {
    id: 's_6',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'F*CK LOVE 3',
    duration: 141,
    durationFormatted: '2:21',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAA1mf9Q6MpqhDv6VVRhJyHlaGUENdwjlOwOi935zE01UDejfA_-Tvu-2x0ntgAZTPy7BlS1I8JvtIG6gjLgXMnUjRuvrdWCE9se-pbCV5mWm7pOh2wa2VtFhN1OHRPSXv6QHqqNYl2kZc05gjOTTo7IgfUdWH76AJLz5gqrx659uMRNawAM7a9GQwHjrG-OekmjlLuIPurjZP3OHvKneiL5n5sSGpS5jnqjDNYpdgsElpy60Y2K-uOFA',
    format: 'MP3',
    genre: 'Pop Rock',
    isFavorite: false,
    isDownloaded: false,
    isUploaded: true,
    fileSizeBytes: 5767168,
    fileSizeFormatted: '5.5 MB',
    year: 2021,
    folderPath: '/storage/emulated/0/Music/Hits',
  },
  {
    id: 's_7',
    title: 'Save Your Tears',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 215,
    durationFormatted: '3:35',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyDdCYP-UNLpfS9KfOckkNFIfq-enQd6j32cwhE39QTGO67k4oB5Qr8pr_tR6GE5fAFmjb3mxz5PFe110Qt5Ol7mUrjFfC2NDO6Fj42FhWnXAiw1LHeCMwPXYd-0TSLc5ZUCxn4jCAlGnDzkI8hx3YLt0iM-mvB2zC_seh1D9E8okGQWRaphlsG_1AkNGW36MB3-dwFo0bsCqi--mjYov07l_CWIr5ZxB1y5rNTqN-kT5jbrGEUf8wTA',
    format: 'AAC',
    genre: 'Synthpop',
    isFavorite: true,
    isDownloaded: true,
    isUploaded: true,
    fileSizeBytes: 8388608,
    fileSizeFormatted: '8.0 MB',
    year: 2020,
    folderPath: '/storage/emulated/0/Music/Pop',
  },
  {
    id: 's_8',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    duration: 167,
    durationFormatted: '2:47',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHhIy-84nQFeSEXbBePHuxe6ORsCgOzB-ueZEimJFd9YjAs6GU-EMxB-QRkkTF1O1NwZLuBHHJvSsjhlFmILfLUdsdun8DVcJ4fKf-_0cBtbxJ7NOB09G0c_YiBPp5g2vyUDG1p8QIvi4R7HST3b4v_xGKD0vJbRbTEU_XYwW8-gV7oQENtoL4KpsWVPeF__FTj9EzjykbWtcLwKzklp64ZEaTOJGRvKnRyD16khnEXundqTfuPHwjg',
    format: 'OGG',
    genre: 'Indie Pop',
    isFavorite: false,
    isDownloaded: true,
    isUploaded: true,
    fileSizeBytes: 6815744,
    fileSizeFormatted: '6.5 MB',
    year: 2022,
    folderPath: '/storage/emulated/0/Music/Indie',
  },
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl_1',
    name: 'Favoritas do Mês',
    description: 'Sua seleção especial em alta qualidade sincronizada na nuvem.',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGdZwIS0dyYKpMw2YckjeHO7KMice_WBYrxdNM1YY8K2A6AEWj_uzSIPC1lTOLuTieBwGkc3HzZ3xNoC7Gz4Gzs1WruVIeetF59gOzwMDc6CivjqecJe7gzZbNhuIseGHLhGa-skoK0dv5XlbXumT5duKIeOGrok-IEf-rby1P8-sQAUfUXlWzNzTEt7ggaralRHLcawtQfAQy_v0GRRRRGqtXehkLqpGCyurvubHcDxJd9Ui65E64VQ',
    isPrivate: false,
    songIds: ['s_1', 's_2', 's_3', 's_5', 's_7'],
    updatedAt: 'Hoje, 10:45',
  },
  {
    id: 'pl_2',
    name: 'Nuvem Retro Synth',
    description: 'BASS vibrante, batidas anos 80 e atmosfera violeta.',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyDdCYP-UNLpfS9KfOckkNFIfq-enQd6j32cwhE39QTGO67k4oB5Qr8pr_tR6GE5fAFmjb3mxz5PFe110Qt5Ol7mUrjFfC2NDO6Fj42FhWnXAiw1LHeCMwPXYd-0TSLc5ZUCxn4jCAlGnDzkI8hx3YLt0iM-mvB2zC_seh1D9E8okGQWRaphlsG_1AkNGW36MB3-dwFo0bsCqi--mjYov07l_CWIr5ZxB1y5rNTqN-kT5jbrGEUf8wTA',
    isPrivate: false,
    songIds: ['s_1', 's_5', 's_7'],
    updatedAt: 'Ontem',
  },
  {
    id: 'pl_3',
    name: 'Workout & Fitness',
    description: 'Energia total para treinos intensos sem perder o ritmo.',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAA1mf9Q6MpqhDv6VVRhJyHlaGUENdwjlOwOi935zE01UDejfA_-Tvu-2x0ntgAZTPy7BlS1I8JvtIG6gjLgXMnUjRuvrdWCE9se-pbCV5mWm7pOh2wa2VtFhN1OHRPSXv6QHqqNYl2kZc05gjOTTo7IgfUdWH76AJLz5gqrx659uMRNawAM7a9GQwHjrG-OekmjlLuIPurjZP3OHvKneiL5n5sSGpS5jnqjDNYpdgsElpy60Y2K-uOFA',
    isPrivate: true,
    songIds: ['s_2', 's_3', 's_6'],
    updatedAt: '3 dias atrás',
  },
  {
    id: 'pl_4',
    name: 'Chill & Relax Studio',
    description: 'Vibes calmas e relaxantes para estudos e foco no trabalho.',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHWE63rl6IGE28lpQiG89fyWvwZgnWKvEXpqX2G4tpeVwCUaxgwaIIVFX15UEql_zRrjfroiBWv0NKtsKaGwk7h0Pvmj36hDEM2Q7DgL4tYSkYEje13MP7txLj54jYE38PdGJYtQXtaFVBdNYgMzhuW_jZM0t_Vnro8Y7QKreewYiCTiBy2djLyWKIeYU-9moWrOAlghHQycAXFX4Ucy_vy9GGeebcyynsqSE0c8i7OkPyL1X9fsAw6Q',
    isPrivate: false,
    songIds: ['s_4', 's_5', 's_8'],
    updatedAt: '1 semana atrás',
  },
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'art_1',
    name: 'The Weeknd',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyDdCYP-UNLpfS9KfOckkNFIfq-enQd6j32cwhE39QTGO67k4oB5Qr8pr_tR6GE5fAFmjb3mxz5PFe110Qt5Ol7mUrjFfC2NDO6Fj42FhWnXAiw1LHeCMwPXYd-0TSLc5ZUCxn4jCAlGnDzkI8hx3YLt0iM-mvB2zC_seh1D9E8okGQWRaphlsG_1AkNGW36MB3-dwFo0bsCqi--mjYov07l_CWIr5ZxB1y5rNTqN-kT5jbrGEUf8wTA',
    songCount: 18,
    albumCount: 4,
  },
  {
    id: 'art_2',
    name: 'Dua Lipa',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHhIy-84nQFeSEXbBePHuxe6ORsCgOzB-ueZEimJFd9YjAs6GU-EMxB-QRkkTF1O1NwZLuBHHJvSsjhlFmILfLUdsdun8DVcJ4fKf-_0cBtbxJ7NOB09G0c_YiBPp5g2vyUDG1p8QIvi4R7HST3b4v_xGKD0vJbRbTEU_XYwW8-gV7oQENtoL4KpsWVPeF__FTj9EzjykbWtcLwKzklp64ZEaTOJGRvKnRyD16khnEXundqTfuPHwjg',
    songCount: 14,
    albumCount: 3,
  },
  {
    id: 'art_3',
    name: 'Justin Bieber',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHWE63rl6IGE28lpQiG89fyWvwZgnWKvEXpqX2G4tpeVwCUaxgwaIIVFX15UEql_zRrjfroiBWv0NKtsKaGwk7h0Pvmj36hDEM2Q7DgL4tYSkYEje13MP7txLj54jYE38PdGJYtQXtaFVBdNYgMzhuW_jZM0t_Vnro8Y7QKreewYiCTiBy2djLyWKIeYU-9moWrOAlghHQycAXFX4Ucy_vy9GGeebcyynsqSE0c8i7OkPyL1X9fsAw6Q',
    songCount: 22,
    albumCount: 5,
  },
  {
    id: 'art_4',
    name: 'Glass Animals',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQYKBUP3dCGfuQ7TvmUTn5L9ujDJE-aEzvXRImOxXKNEY3CvG6_nHmXqjkPjC1QX-XGOLklsOUOA497LY3_bVfaLPhvbUsVbIwVYaaKGAWP-xTsS9OWwijv7Kulab0iD3StdWOudqU9wFyhy1_SOpogdZn6mtwISyhgDDdJRfwHHgkP9voBRmvMHetihZ9ZX9-c9xSWC38KYPNRRPMaDPqfcJ5EYXCgg819Zu6o-7LxPOoH5xARL4SLg',
    songCount: 10,
    albumCount: 2,
  },
];

export const INITIAL_ALBUMS: Album[] = [
  {
    id: 'alb_1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGdZwIS0dyYKpMw2YckjeHO7KMice_WBYrxdNM1YY8K2A6AEWj_uzSIPC1lTOLuTieBwGkc3HzZ3xNoC7Gz4Gzs1WruVIeetF59gOzwMDc6CivjqecJe7gzZbNhuIseGHLhGa-skoK0dv5XlbXumT5duKIeOGrok-IEf-rby1P8-sQAUfUXlWzNzTEt7ggaralRHLcawtQfAQy_v0GRRRRGqtXehkLqpGCyurvubHcDxJd9Ui65E64VQ',
    year: 2020,
    songCount: 14,
  },
  {
    id: 'alb_2',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYHhIy-84nQFeSEXbBePHuxe6ORsCgOzB-ueZEimJFd9YjAs6GU-EMxB-QRkkTF1O1NwZLuBHHJvSsjhlFmILfLUdsdun8DVcJ4fKf-_0cBtbxJ7NOB09G0c_YiBPp5g2vyUDG1p8QIvi4R7HST3b4v_xGKD0vJbRbTEU_XYwW8-gV7oQENtoL4KpsWVPeF__FTj9EzjykbWtcLwKzklp64ZEaTOJGRvKnRyD16khnEXundqTfuPHwjg',
    year: 2020,
    songCount: 11,
  },
  {
    id: 'alb_3',
    title: 'Justice',
    artist: 'Justin Bieber',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHWE63rl6IGE28lpQiG89fyWvwZgnWKvEXpqX2G4tpeVwCUaxgwaIIVFX15UEql_zRrjfroiBWv0NKtsKaGwk7h0Pvmj36hDEM2Q7DgL4tYSkYEje13MP7txLj54jYE38PdGJYtQXtaFVBdNYgMzhuW_jZM0t_Vnro8Y7QKreewYiCTiBy2djLyWKIeYU-9moWrOAlghHQycAXFX4Ucy_vy9GGeebcyynsqSE0c8i7OkPyL1X9fsAw6Q',
    year: 2021,
    songCount: 16,
  },
  {
    id: 'alb_4',
    title: 'Dreamland',
    artist: 'Glass Animals',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQYKBUP3dCGfuQ7TvmUTn5L9ujDJE-aEzvXRImOxXKNEY3CvG6_nHmXqjkPjC1QX-XGOLklsOUOA497LY3_bVfaLPhvbUsVbIwVYaaKGAWP-xTsS9OWwijv7Kulab0iD3StdWOudqU9wFyhy1_SOpogdZn6mtwISyhgDDdJRfwHHgkP9voBRmvMHetihZ9ZX9-c9xSWC38KYPNRRPMaDPqfcJ5EYXCgg819Zu6o-7LxPOoH5xARL4SLg',
    year: 2020,
    songCount: 12,
  },
];

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'escuro',
  language: 'Português (Brasil)',
  audioQuality: 'Extrema (320kbps)',
  autoDownload: true,
  autoBackup: true,
  wifiOnlySync: true,
  cacheSizeMB: 1240,
};
