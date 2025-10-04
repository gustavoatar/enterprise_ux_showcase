import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeVideoGallery from './pages/home-video-gallery';
import FullScreenVideoPlayer from './pages/full-screen-video-player';
import CreateNewPage from './pages/create-new-page';
import EditPageContent from './pages/edit-page-content';
import FigmaPrototypeDisplay from './pages/figma-prototype-display';
import AdminLogin from './pages/admin-login';
import AdminDashboard from './pages/admin-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeVideoGallery />} />
        <Route path="/home-video-gallery" element={<HomeVideoGallery />} />
        <Route path="/full-screen-video-player" element={<FullScreenVideoPlayer />} />
        <Route path="/create-new-page" element={<CreateNewPage />} />
        <Route path="/edit-page-content" element={<EditPageContent />} />
        <Route path="/figma-prototype-display" element={<FigmaPrototypeDisplay />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;