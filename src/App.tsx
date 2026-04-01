import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrategyProvider } from './context/StrategyContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Timeline from './pages/Timeline';
import Setup from './pages/Setup';
import Create from './pages/Create';
import Loading from './pages/Loading';
import CampaignDetails from './pages/CampaignDetails';

export default function App() {
  return (
    <StrategyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetails />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/create" element={<Create />} />
            <Route path="/loading" element={<Loading />} />
          </Routes>
        </Layout>
      </Router>
    </StrategyProvider>
  );
}
