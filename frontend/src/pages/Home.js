import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { getEvents, getHappenings, getAllSections } from '../services/api';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AccreditationsSection from '../components/AccreditationsSection';
import ProgramsSection from '../components/ProgramsSection';
import SportsGallery from '../components/SportsGallery';
import WhySection from '../components/WhySection';
import HappeningsSection from '../components/HappeningsSection';
import EventsSection from '../components/EventsSection';

const LifeAtUniversity = lazy(() => import('../components/LifeAtUniversity'));
const TechnicalSection = lazy(() => import('../components/TechnicalSection'));
const EventGlimpses = lazy(() => import('../components/EventGlimpses'));
const PlacementSection = lazy(() => import('../components/PlacementSection'));
const Footer = lazy(() => import('../components/Footer'));

function DeferredSection({ children, minHeight = 300 }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={`deferred-section ${isVisible ? 'visible' : ''}`}>
      {isVisible ? children : <div style={{ minHeight }} aria-hidden="true" />}
    </div>
  );
}

function Home() {
  const [events, setEvents] = useState([]);
  const [happenings, setHappenings] = useState([]);
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const forceRefresh = localStorage.getItem('forceRefresh');
    if (forceRefresh === 'true') {
      localStorage.removeItem('forceRefresh');
      sessionStorage.clear();
    }

    const fetchData = async () => {
      try {
        const [eventsData, happeningsData, sectionsData] = await Promise.all([
          getEvents(),
          getHappenings(),
          getAllSections()
        ]);
        // Use API data if available, otherwise components will use their own defaults
        setEvents(Array.isArray(eventsData) && eventsData.length > 0 ? eventsData : []);
        setHappenings(Array.isArray(happeningsData) && happeningsData.length > 0 ? happeningsData : []);
        const byName = {};
        if (Array.isArray(sectionsData)) {
          sectionsData.forEach((s) => {
            if (s && s.section_name && s.content != null) byName[s.section_name] = s.content;
          });
        }
        setSections(byName);
      } catch (error) {
        console.error('Error fetching data:', error);
        // On error, pass empty arrays and let components use their hardcoded defaults
        setEvents([]);
        setHappenings([]);
        setSections({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handleStorageChange = (e) => {
      if (e.key === 'contentUpdated') setRefreshKey((prev) => prev + 1);
    };
    const handleFocus = () => {
      const lastUpdate = localStorage.getItem('lastContentUpdate');
      const lastCheck = sessionStorage.getItem('lastContentCheck');
      if (lastUpdate && lastUpdate !== lastCheck) {
        setRefreshKey((prev) => prev + 1);
        sessionStorage.setItem('lastContentCheck', lastUpdate);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshKey]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <HeroSection refreshTrigger={refreshKey} initialContent={sections.hero} />
      <AboutSection refreshTrigger={refreshKey} initialContent={sections.about} />
      <AccreditationsSection />
      <SportsGallery />
      <ProgramsSection />
      <WhySection refreshTrigger={refreshKey} initialContent={sections.why} />
      <HappeningsSection happenings={happenings} />
      <EventsSection events={events} />
      <DeferredSection minHeight={500}>
        <Suspense fallback={<div style={{ minHeight: 500 }} aria-hidden="true" />}>
          <LifeAtUniversity />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={450}>
        <Suspense fallback={<div style={{ minHeight: 450 }} aria-hidden="true" />}>
          <TechnicalSection refreshTrigger={refreshKey} initialContent={sections.technical} />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={380}>
        <Suspense fallback={<div style={{ minHeight: 380 }} aria-hidden="true" />}>
          <EventGlimpses />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={320}>
        <Suspense fallback={<div style={{ minHeight: 320 }} aria-hidden="true" />}>
          <PlacementSection />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight={220}>
        <Suspense fallback={<div style={{ minHeight: 220 }} aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </DeferredSection>
    </div>
  );
}

export default Home;
