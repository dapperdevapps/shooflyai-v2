const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = () => window.innerWidth <= 768;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  React.useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const links = ['Home', 'About', 'Services', 'Resources', 'Case Studies', 'Contact'];

  return (
    <React.Fragment>
      <nav style={{
        ...navStyles.bar,
        background: (scrolled || mobileOpen) ? 'rgba(8,18,24,0.92)' : 'transparent',
        backdropFilter: (scrolled || mobileOpen) ? 'blur(24px) saturate(160%)' : 'none',
        WebkitBackdropFilter: (scrolled || mobileOpen) ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: (scrolled || mobileOpen) ? '1px solid rgba(64,224,208,0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,0.3)' : 'none',
      }}>
        <div style={navStyles.inner}>
          <a href="#" style={navStyles.logo}>
            <img src="assets/shoofly-logo-full.png" alt="ShooflyAI" style={navStyles.logoImg}/>
          </a>

          {/* Desktop links */}
          <div style={navStyles.links}>
            {links.map(link => (
              <NavLink key={link} label={link} active={link === 'Home'} />
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            style={navStyles.cta}
            className="nav-cta-desktop"
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(64,224,208,0.5), inset 0 0 20px rgba(64,224,208,0.1)';
              e.currentTarget.style.background = 'rgba(64,224,208,0.12)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 0 rgba(64,224,208,0)';
              e.currentTarget.style.background = 'rgba(64,224,208,0.04)';
            }}
          >Free AI Audit</button>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle navigation"
            style={navStyles.hamburger}
          >
            <span style={{
              ...navStyles.hamLine,
              transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}></span>
            <span style={{
              ...navStyles.hamLine,
              opacity: mobileOpen ? 0 : 1,
              transform: mobileOpen ? 'translateX(-10px)' : 'none',
            }}></span>
            <span style={{
              ...navStyles.hamLine,
              transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}></span>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div style={navStyles.mobileMenu}>
            {links.map(link => (
              <a
                key={link}
                href="#"
                style={navStyles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >{link}</a>
            ))}
            <button style={navStyles.mobileCta}>Free AI Audit</button>
          </div>
        )}
      </nav>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </React.Fragment>
  );
};

const NavLink = ({ label, active }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href="#"
      style={{
        ...navStyles.link,
        color: hovered || active ? '#7FFFE3' : '#cfdde0',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <span style={{
        ...navStyles.linkUnderline,
        transform: (hovered || active) ? 'scaleX(1)' : 'scaleX(0)',
      }}></span>
    </a>
  );
};

const navStyles = {
  bar: {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    transition: 'all 0.3s ease',
    padding: '0 64px',
  },
  inner: {
    maxWidth: 1280, margin: '0 auto',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 76,
  },
  logo: { display: 'flex', alignItems: 'center', textDecoration: 'none', zIndex: 1001, position: 'relative' },
  logoImg: { height: 36, width: 'auto', display: 'block', filter: 'drop-shadow(0 0 12px rgba(64,224,208,0.25))' },
  links: { display: 'flex', gap: 36 },
  link: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: 14, fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    position: 'relative',
    paddingBottom: 4,
  },
  linkUnderline: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 1,
    background: 'linear-gradient(90deg, #40E0D0, #80FFCC)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
    boxShadow: '0 0 8px rgba(64,224,208,0.6)',
  },
  cta: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: 14, fontWeight: 600,
    padding: '11px 26px',
    borderRadius: '9999px',
    border: '1px solid rgba(64,224,208,0.4)',
    background: 'rgba(64,224,208,0.04)',
    color: '#7FFFE3',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 5,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    zIndex: 1001,
    position: 'relative',
  },
  hamLine: {
    display: 'block',
    width: 24, height: 2,
    background: '#7FFFE3',
    borderRadius: 2,
    transition: 'all 0.3s ease',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 20px 24px',
    gap: 4,
    borderTop: '1px solid rgba(64,224,208,0.1)',
  },
  mobileLink: {
    fontFamily: "'Manrope', sans-serif",
    fontSize: 16, fontWeight: 500,
    color: '#cfdde0',
    textDecoration: 'none',
    padding: '12px 8px',
    borderBottom: '1px solid rgba(127,255,212,0.06)',
    transition: 'color 0.2s ease',
  },
  mobileCta: {
    marginTop: 12,
    fontFamily: "'Manrope', sans-serif",
    fontSize: 15, fontWeight: 600,
    padding: '14px 26px',
    borderRadius: '9999px',
    border: '1px solid rgba(64,224,208,0.4)',
    background: 'rgba(64,224,208,0.08)',
    color: '#7FFFE3',
    cursor: 'pointer',
    width: '100%',
  },
};

window.Navbar = Navbar;
