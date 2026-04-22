// Layout and Routing will be configured here
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Splash } from './pages/Splash';
import { Onboarding } from './pages/Onboarding';
import { Welcome } from './pages/Welcome';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { TextDiagnosis } from './pages/TextDiagnosis';
import { ImageDiagnosis } from './pages/ImageDiagnosis';
import { Calculators } from './pages/Calculators';
import { History } from './pages/History';
import { Training } from './pages/Training';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding & Auth Flow */}
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Application */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="text-diagnosis" element={<TextDiagnosis />} />
          <Route path="image-diagnosis" element={<ImageDiagnosis />} />
          <Route path="calculators" element={<Calculators />} />
          <Route path="history" element={<History />} />
          <Route path="training" element={<Training />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
