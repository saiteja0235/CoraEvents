import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  Pause,
  Play,
  Plus,
  X,
} from 'lucide-react';
import weddingHero from './assets/cora-wedding-hero.png';
import luxuryReception from './assets/cora-luxury-reception.png';
import serviceSprite from './assets/cora-service-scenes.png';
import coraLogo from './assets/cora-events-logo-transparent.png';
import { ContactExperience } from './components/ContactExperience';
import { getWhatsAppUrl } from './lib/whatsapp';
import './hero-slider.css';
import './navigation.css';
import './modal.css';
import './footer.css';
import './metrics.css';
import './values.css';
import './about-video.css';
import './scroll-motion.css';
import './promise-metrics.css';
import './service-reveal.css';
import './site-ambient.css';

const scenes = [
  { image: weddingHero, name: 'A golden beginning', place: 'Hyderabad / 2026' },
  { image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85', name: 'A room full of yes', place: 'Goa / 2025' },
  { image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85', name: 'Flowers after dark', place: 'Jaipur / 2025' },
  { image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=85', name: 'The after party', place: 'Mumbai / 2024' },
];

const services = [
  'Wedding Planning',
  'Destination Weddings',
  'Corporate Events',
  'Product Launches',
  'Award Nights',
  'Annual Day Celebrations',
  'Engagements',
  'Sangeet & Reception',
  'Half Saree Functions',
  'Birthday & Private Events',
  'Stage & Venue Decoration',
  'Sound, Lighting & LED Walls',
  'Photography & Cinematography',
];

const metricTargets = [500, 250, 10, 25] as const;

const spritePosition = (index: number) => `${(index % 4) * 33.333}% ${Math.floor(index / 4) * 33.333}%`;

function InstagramBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

function WhatsAppBrandIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="currentColor" d="M27.4 4.6A15.7 15.7 0 0 0 16.1 0C7.4 0 .3 7.1.3 15.8c0 2.8.7 5.4 2.1 7.8L0 32l8.6-2.3a15.7 15.7 0 0 0 7.5 1.9h.1c8.7 0 15.8-7.1 15.8-15.8 0-4.2-1.6-8.2-4.6-11.2ZM16.1 29a13.1 13.1 0 0 1-6.7-1.8l-.5-.3-5.1 1.3 1.4-5-.3-.5a13.1 13.1 0 1 1 11.2 6.3Zm7.2-9.8c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.7-.2-.9.2-.3.4-1.1 1.3-1.3 1.6-.2.3-.5.3-.9.1-1.8-.9-3-1.7-4.2-3.8-.3-.5.3-.5.8-1.7.1-.3 0-.5-.1-.7l-1.2-2.8c-.3-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.7s1.6 4.3 1.8 4.6c.2.3 3.1 4.8 7.6 6.7 1.1.5 1.9.7 2.6.9 1.1.3 2.1.3 2.9.2.9-.1 2.4-1 2.8-2s.4-1.9.3-2.1c-.1-.2-.4-.3-.8-.5Z" />
    </svg>
  );
}

function PhoneBrandIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M7 3.5 4.8 5.7c-.5.5-.7 1.2-.5 1.9 1.4 5.2 5.5 9.3 10.7 10.7.7.2 1.4 0 1.9-.5l2.2-2.2-3.3-3.3-1.7 1c-1.9-1-3.4-2.5-4.4-4.4l1-1.7L7 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenu, setServicesMenu] = useState(false);
  const [booking, setBooking] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroDirection, setHeroDirection] = useState<'next' | 'previous'>('next');
  const [heroTouchStart, setHeroTouchStart] = useState<number | null>(null);
  const [scene, setScene] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [metricValues, setMetricValues] = useState<number[]>(() => metricTargets.map(() => 0));
  const [eventFilmPlaying, setEventFilmPlaying] = useState(true);
  const metricBarReference = useRef<HTMLDivElement>(null);
  const eventFilmRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setScene((value) => (value + 1) % scenes.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroDirection('next');
      setHeroSlide((value) => (value + 1) % services.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const floatingCards = Array.from(document.querySelectorAll<HTMLElement>(
      '.metricBar > div, .serviceGrid > button, .galleryRail > button, .promiseItems > span, .contactExperience__detail, .experienceFooter__actions a',
    ));
    const floatListeners: Array<[HTMLElement, (event: TransitionEvent) => void]> = [];

    floatingCards.forEach((element, index) => {
      element.classList.add('scrollFloat');
      element.style.setProperty('--scroll-delay', `${(index % 4) * 90}ms`);

      const finishFloat = (event: TransitionEvent) => {
        if (event.propertyName === 'opacity') {
          element.classList.remove('scrollFloat');
          element.removeEventListener('transitionend', finishFloat);
        }
      };

      element.addEventListener('transitionend', finishFloat);
      floatListeners.push([element, finishFloat]);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('isVisible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: .16 },
    );

    document.querySelectorAll('.reveal, .scrollFloat').forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      floatListeners.forEach(([element, finishFloat]) => element.removeEventListener('transitionend', finishFloat));
    };
  }, []);

  useEffect(() => {
    const valueDeck = document.querySelector<HTMLElement>('.valueDeck');

    if (!valueDeck) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => valueDeck.classList.toggle('isValuesVisible', entry.isIntersecting),
      { threshold: 0.32 },
    );

    observer.observe(valueDeck);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const promiseItems = document.querySelector<HTMLElement>('.promiseItems');

    if (!promiseItems) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => promiseItems.classList.toggle('isPromiseVisible', entry.isIntersecting),
      { threshold: 0.32 },
    );

    observer.observe(promiseItems);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const serviceCards = Array.from(document.querySelectorAll<HTMLElement>('.serviceGrid > button'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('isServiceVisible', entry.isIntersecting);
        });
      },
      { threshold: 0.3 },
    );

    serviceCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const metricBar = metricBarReference.current;

    if (!metricBar) {
      return;
    }

    let animationFrame = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resetMetrics = () => {
      window.cancelAnimationFrame(animationFrame);
      setMetricValues(metricTargets.map(() => 0));
    };

    const animateMetrics = () => {
      window.cancelAnimationFrame(animationFrame);

      if (prefersReducedMotion) {
        setMetricValues([...metricTargets]);
        return;
      }

      const startTime = performance.now();
      const duration = 1350;

      const updateMetrics = (timestamp: number) => {
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4);

        setMetricValues(metricTargets.map((target) => Math.round(target * easedProgress)));

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(updateMetrics);
        }
      };

      animationFrame = window.requestAnimationFrame(updateMetrics);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateMetrics();
          return;
        }

        resetMetrics();
      },
      { threshold: 0.55 },
    );

    observer.observe(metricBar);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  const closeNavigation = () => {
    setMenuOpen(false);
    setServicesMenu(false);
  };

  const openBooking = (service = '') => {
    setSelectedService(service);
    closeNavigation();
    setBooking(true);
  };

  const openServiceBooking = (event: MouseEvent<HTMLAnchorElement>, service: string) => {
    event.preventDefault();
    openBooking(service);
  };

  const submitPrivateConsultation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const getValue = (name: string) => String(formData.get(name) ?? '').trim();
    const details = getValue('details');
    const enquiry = [
      '✨ *CORA EVENTS*',
      '*Private Consultation*',
      '',
      '━━━━━━━━━━━━━━━━━━',
      '',
      '🎉 *Event Type*',
      getValue('service'),
      '',
      '━━━━━━━━━━━━━━━━━━',
      '',
      '👤 *Client Details*',
      '',
      `*Name:* ${getValue('name')}`,
      `*Phone:* ${getValue('phone')}`,
      '',
      '━━━━━━━━━━━━━━━━━━',
      '',
      '💬 *Event Details*',
      '',
      `“${details || 'I would love to discuss the details.'}”`,
      '',
      '━━━━━━━━━━━━━━━━━━',
      '',
      'Please contact me with the next steps and availability.',
      '',
      '*Enquiry submitted through the CORA Events website.*',
    ].join('\n');

    window.open(getWhatsAppUrl(enquiry), '_blank', 'noopener,noreferrer');
    setBooking(false);
  };

  const toggleEventFilm = () => {
    const eventFilm = eventFilmRef.current;

    if (!eventFilm) {
      return;
    }

    if (eventFilm.paused) {
      void eventFilm.play().then(() => setEventFilmPlaying(true)).catch(() => setEventFilmPlaying(false));
      return;
    }

    eventFilm.pause();
    setEventFilmPlaying(false);
  };

  const move = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left - rect.width / 2) / 20,
      y: (event.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const changeHeroSlide = (direction: 'next' | 'previous') => {
    setHeroDirection(direction);
    setHeroSlide((value) => (value + (direction === 'next' ? 1 : services.length - 1)) % services.length);
  };

  const handleHeroTouchEnd = (endPoint: number | undefined) => {
    if (heroTouchStart !== null && endPoint !== undefined) {
      const distance = endPoint - heroTouchStart;
      if (Math.abs(distance) > 45) {
        changeHeroSlide(distance < 0 ? 'next' : 'previous');
      }
    }

    setHeroTouchStart(null);
  };

  return (
    <>
      <div className="siteAmbient" aria-hidden="true" />
      <header className="experienceNav">
        <a href="#top" className="experienceLogo">
          <img src={coraLogo} alt="Cora Events" />
        </a>
        <nav className={menuOpen ? 'experienceLinks open' : 'experienceLinks'}>
          <a href="#top" onClick={closeNavigation}>Home</a>
          <a href="#world" onClick={closeNavigation}>About us</a>
          <div
            className="servicesNavItem"
            onMouseEnter={() => setServicesMenu(true)}
            onMouseLeave={() => setServicesMenu(false)}
          >
            <button type="button" onClick={() => setServicesMenu(!servicesMenu)}>
              Services <span>+</span>
            </button>
            {servicesMenu && (
              <div className="servicesMega">
                <div>
                  <b>Weddings</b>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Wedding Planning')}>Wedding Planning</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Destination Weddings')}>Destination Weddings</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Engagements')}>Engagements</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Sangeet & Reception')}>Sangeet & Reception</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Half Saree Functions')}>Half Saree Functions</a>
                </div>
                <div>
                  <b>Corporate</b>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Corporate Events')}>Corporate Events</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Product Launches')}>Product Launches</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Award Nights')}>Award Nights</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Annual Day Celebrations')}>Annual Day Celebrations</a>
                </div>
                <div>
                  <b>Celebrations</b>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Birthday & Private Events')}>Birthday & Private Events</a>
                  <b className="productionTitle">Production</b>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Stage & Venue Decoration')}>Stage & Venue Decoration</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Sound, Lighting & LED Walls')}>Sound, Lighting & LED Walls</a>
                  <a href="#enquiry" onClick={(event) => openServiceBooking(event, 'Photography & Cinematography')}>Photography & Cinematography</a>
                </div>
              </div>
            )}
          </div>
          <a href="#stories" onClick={closeNavigation}>Gallery</a>
          <a href="#stories" onClick={closeNavigation}>Our work</a>
          <a href="#contact" onClick={closeNavigation}>Let&apos;s connect</a>
        </nav>
        <button className="navBook" type="button" onClick={() => openBooking()}>
          Enquire now <ArrowUpRight size={16} />
        </button>
        <button className="navMenu" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section
          className="openingScene"
          onMouseMove={move}
          onTouchStart={(event) => setHeroTouchStart(event.touches[0]?.clientX ?? null)}
          onTouchEnd={(event) => handleHeroTouchEnd(event.changedTouches[0]?.clientX)}
        >
          <div className={`heroServiceSlides ${heroDirection}`}>
            {services.map((service, index) => (
              <div
                key={service}
                className={heroSlide === index ? 'heroServiceSlide active' : 'heroServiceSlide'}
                style={{
                  backgroundImage: `url(${serviceSprite})`,
                  backgroundPosition: spritePosition(index),
                  transform: heroSlide === index ? `scale(1.07) translate(${pointer.x}px, ${pointer.y}px)` : undefined,
                }}
              />
            ))}
          </div>
          <div className="openingVignette" />
          <div className="heroWord">
            <span>We don&apos;t just plan</span>
            <strong>WE CREATE</strong>
            <i>Extraordinary</i>
            <b>EXPERIENCES</b>
            <p>From intimate gatherings to grand celebrations,<br />we turn your dreams into unforgettable realities.</p>
          </div>
          <div className="heroBottomStack">
            <div className="metricBar" ref={metricBarReference}>
              <div><b>✦</b><strong>{metricValues[0]}+</strong><span>Events completed</span></div>
              <div><b>♟</b><strong>{metricValues[1]}+</strong><span>Happy clients</span></div>
              <div><b>♜</b><strong>{metricValues[2]}+</strong><span>Years of experience</span></div>
              <div><b>●</b><strong>{metricValues[3]}+</strong><span>Cities served</span></div>
            </div>
          </div>
          <div className="openingMeta">
            <span>Scroll to explore</span>
            <span><ArrowDown size={14} /></span>
          </div>
        </section>

        <section className="worldScene" id="world">
          <div className="aboutHeroScene reveal">
            <div className="aboutHeroCopy">
              <p className="goldLabel">Our story</p>
              <h2>Crafting Moments.<br />Creating <i>Memories.</i></h2>
              <p>At Cora Events, we believe every celebration has a story waiting to be beautifully told. We turn your dreams into extraordinary experiences that stay with you forever.</p>
              <button type="button" onClick={() => setBooking(true)}>Our journey <ArrowUpRight size={16} /></button>
            </div>
            <div className="aboutHeroImage">
              <img src={luxuryReception} alt="Chandelier-lit wedding table" />
            </div>
          </div>

          <div className="aboutLower reveal">
            <div className="aboutVideo">
              <video
                ref={eventFilmRef}
                className="aboutVideo__media"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={scenes[2].image}
                onPlay={() => setEventFilmPlaying(true)}
                onPause={() => setEventFilmPlaying(false)}
              >
                <source src="https://cdn.coverr.co/videos/coverr-white-orchid-7913/1080p.mp4" type="video/mp4" />
              </video>
              <span className="aboutVideo__label">Event film</span>
              <button
                className="aboutVideo__control"
                type="button"
                aria-label={eventFilmPlaying ? 'Pause event showreel' : 'Play event showreel'}
                aria-pressed={eventFilmPlaying}
                onClick={toggleEventFilm}
              >
                {eventFilmPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
            </div>
            <div className="aboutPromise">
              <p className="goldLabel">Our story</p>
              <h2>Passion, Creativity<br />and <i>Perfection.</i></h2>
              <p>Founded with a passion for creating unforgettable celebrations, Cora Events brings warmth, precision, and imagination to every detail.</p>
              <p>From intimate gatherings to grand celebrations, we take care of every moment with creativity, care, and heart.</p>
              <div className="promiseItems">
                <span><b>✦</b>Client First<small>Your happiness is our priority.</small></span>
                <span><b>☼</b>Creative Minds<small>Unique ideas for every celebration.</small></span>
                <span><b>✪</b>Flawless Execution<small>Perfect planning, seamlessly delivered.</small></span>
              </div>
            </div>
          </div>

          <div className="valueDeck reveal">
            <p className="goldLabel">Our values</p>
            <div>
              <span className="valueDeck__card"><strong>Concept</strong><small>Every exceptional celebration starts with a clear, original vision.</small></span>
              <span className="valueDeck__card"><strong>Organise</strong><small>Every moving part is planned with calm, precise coordination.</small></span>
              <span className="valueDeck__card"><strong>Responsible</strong><small>We care for each detail, promise, and guest experience.</small></span>
              <span className="valueDeck__card"><strong>Accountable</strong><small>We own the journey from first brief to final applause.</small></span>
            </div>
          </div>
        </section>

        <section className="serviceScene" id="services">
          <div className="serviceSceneHead">
            <p>Our services</p>
            <h2>One Vision. Endless Possibilities.</h2>
          </div>
          <div className="serviceGrid">
            {services.map((service, index) => (
              <button
                key={service}
                type="button"
                style={{ '--index': index } as CSSProperties}
                onClick={() => openBooking(service)}
              >
                <span
                  className="serviceVisual"
                  aria-label={service}
                  style={{ backgroundImage: `url(${serviceSprite})`, backgroundPosition: spritePosition(index) }}
                />
                <strong>{service}</strong>
                <Plus size={15} />
              </button>
            ))}
          </div>
        </section>

        <section className="storyScene" id="stories">
          <div className="galleryIntro">
            <p>Selected celebrations</p>
            <span>Swipe through our work album</span>
          </div>
          <div className="storyImage">
            <img key={scenes[scene].image} src={scenes[scene].image} alt={scenes[scene].name} />
            <div className="storyLabel">
              <span>{scenes[scene].place}</span>
              <strong>{scenes[scene].name}</strong>
            </div>
          </div>
          <div className="storyControls">
            <button type="button" aria-label="Previous gallery image" onClick={() => setScene((scene + scenes.length - 1) % scenes.length)}>
              <ChevronLeft />
            </button>
            <p>Every frame starts with<br /><i>an emotion.</i></p>
            <button type="button" aria-label="Next gallery image" onClick={() => setScene((scene + 1) % scenes.length)}>
              <ChevronRight />
            </button>
          </div>
          <div className="galleryRail">
            {scenes.map((item, index) => (
              <button key={item.name} type="button" onClick={() => setScene(index)} className={scene === index ? 'active' : ''}>
                <img src={item.image} alt={item.name} />
              </button>
            ))}
          </div>
        </section>

        <ContactExperience />
      </main>

      <footer className="experienceFooter experienceFooter--social">
        <a href="#top" className="experienceLogo"><img src={coraLogo} alt="Cora Events" /></a>
        <div className="experienceFooter__actions">
          <a className="footerAction footerAction--instagram" href="https://www.instagram.com/cora_events_/" target="_blank" rel="noreferrer" aria-label="Follow Cora Events on Instagram">
            <InstagramBrandIcon />
          </a>
          <a className="footerAction footerAction--whatsapp" href={getWhatsAppUrl()} target="_blank" rel="noreferrer" aria-label="Chat with Cora Events on WhatsApp">
            <WhatsAppBrandIcon />
          </a>
          <a className="footerAction footerAction--phone" href="tel:+918309031419" aria-label="Call Cora Events">
            <PhoneBrandIcon />
          </a>
        </div>
      </footer>

      {booking && (
        <div className="experienceModal">
          <div className="modalPanel">
            <button className="modalX" type="button" aria-label="Close enquiry form" onClick={() => setBooking(false)}><X /></button>
            <img className="modalBrandLogo" src={coraLogo} alt="Cora Events" />
            <div className="modalIntro">
              <p>Private consultation</p>
              <h2>Where your<br /><i>story begins.</i></h2>
              <span>From the first thought to the final toast, we are here to make it seamless.</span>
            </div>
            <form onSubmit={submitPrivateConsultation}>
              <input name="name" required autoComplete="name" placeholder="Your name" />
              <input name="phone" required type="tel" autoComplete="tel" placeholder="Phone number" />
              <select name="service" required value={selectedService} onChange={(event) => setSelectedService(event.target.value)}>
                <option value="" disabled>What are we celebrating?</option>
                {services.map((service) => <option key={service}>{service}</option>)}
              </select>
              <textarea name="details" placeholder="Date, location, guests, and your vision..." />
              <button type="submit">Begin your enquiry <ArrowUpRight /></button>
            </form>
            <a href={getWhatsAppUrl('Hello Cora Events, I have a query.')} target="_blank" rel="noreferrer">
              Prefer WhatsApp? Start a conversation
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
