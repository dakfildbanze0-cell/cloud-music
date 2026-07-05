import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import { MobileFrame } from './components/MobileFrame';
import { OptionMenuModal } from './components/OptionMenuModal';
import { CreatePlaylistModal } from './components/CreatePlaylistModal';
import { PermissionModal } from './components/PermissionModal';
import { CategoryModal } from './components/CategoryModal';
import { ToastNotification } from './components/ToastNotification';

import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ImportScreen } from './screens/ImportScreen';
import { UploadScreen } from './screens/UploadScreen';
import { PlayerScreen } from './screens/PlayerScreen';
import { SearchScreen } from './screens/SearchScreen';
import { PlaylistsScreen } from './screens/PlaylistsScreen';
import { PlaylistDetailScreen } from './screens/PlaylistDetailScreen';
import { DownloadsScreen } from './screens/DownloadsScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ArtistsScreen } from './screens/ArtistsScreen';
import { ArtistDetailScreen } from './screens/ArtistDetailScreen';
import { AlbumsScreen } from './screens/AlbumsScreen';
import { AlbumDetailScreen } from './screens/AlbumDetailScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SyncScreen } from './screens/SyncScreen';

const MainRouter: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'home':
        return <HomeScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'import':
        return <ImportScreen />;
      case 'upload':
        return <UploadScreen />;
      case 'player':
        return <PlayerScreen />;
      case 'search':
        return <SearchScreen />;
      case 'playlists':
        return <PlaylistsScreen />;
      case 'playlist-detail':
        return <PlaylistDetailScreen />;
      case 'downloads':
        return <DownloadsScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'artists':
        return <ArtistsScreen />;
      case 'artist-detail':
        return <ArtistDetailScreen />;
      case 'albums':
        return <AlbumsScreen />;
      case 'album-detail':
        return <AlbumDetailScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'sync':
        return <SyncScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileFrame>
      {renderScreen()}
      <OptionMenuModal />
      <CreatePlaylistModal />
      <PermissionModal />
      <CategoryModal />
      <ToastNotification />
    </MobileFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AudioProvider>
        <MainRouter />
      </AudioProvider>
    </AppProvider>
  );
}
