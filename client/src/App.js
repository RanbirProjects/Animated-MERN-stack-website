import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './App.css';

const images = {
  home: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  about: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  services: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  blog: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
  contact: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  ranbir: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80',
};

function AnimatedPage({ children, animation }) {
  return (
    <motion.div
      className="fade-in-page"
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  );
}

function FloatingIcon({ children, delay = 0 }) {
  return (
    <motion.div
      className="floating-icon"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}+</span>;
}

function InteractiveCard({ title, description, icon, color }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="interactive-card"
      style={{ '--card-color': color }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="card-icon"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <h3>{title}</h3>
      <p>{description}</p>
      <motion.div
        className="card-glow"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
      />
    </motion.div>
  );
}

function TestimonialCard({ name, role, content, avatar }) {
  return (
    <motion.div
      className="testimonial-card"
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="testimonial-content">
        <p>"{content}"</p>
      </div>
      <div className="testimonial-author">
        <img src={avatar} alt={name} className="testimonial-avatar" />
        <div>
          <h4>{name}</h4>
          <span>{role}</span>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedNav() {
  const location = useLocation();
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];
  return (
    <motion.nav
      className="animated-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
    >
      <div className="nav-logo">
        <motion.img src={images.ranbir} alt="Ranbir Logo" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} />
        <span className="nav-title">Trangotech</span>
      </div>
      <div className="nav-links">
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} className={location.pathname === link.to ? 'active' : ''}>
            <motion.span
              whileHover={{ scale: 1.1, color: '#ff6b6b' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {link.label}
            </motion.span>
            {location.pathname === link.to && (
              <motion.div className="nav-underline" layoutId="nav-underline" />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  return (
    <AnimatedPage animation={{ initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 }, transition: { duration: 0.8, type: 'spring' } }}>
      <div className="hero-section">
        <FloatingIcon delay={0}>🌟</FloatingIcon>
        <FloatingIcon delay={1}>🚀</FloatingIcon>
        <FloatingIcon delay={2}>💎</FloatingIcon>
        <motion.div style={{ y }}>
          <img src={images.home} alt="Home" className="tab-photo hero-image" />
        </motion.div>
        <motion.h1 
          className="gradient-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Trangotech (TrangCorp) Clone
        </motion.h1>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
        >
          Trang Corporation (TrangCorp) was established in July 2004 by Mr. Ho Van Trung (Trang Ho) and co-founders, located in Hiep Phuoc Industrial Park, Ho Chi Minh City. TrangCorp's manufacturing plant specializes in producing frozen food from seafood, serving export markets in Europe, America, and Australia.
        </motion.p>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="stats-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="stat-item">
          <h3><AnimatedCounter end={20} /></h3>
          <p>Years Experience</p>
        </div>
        <div className="stat-item">
          <h3><AnimatedCounter end={500} /></h3>
          <p>Products Delivered</p>
        </div>
        <div className="stat-item">
          <h3><AnimatedCounter end={50} /></h3>
          <p>Countries Served</p>
        </div>
        <div className="stat-item">
          <h3><AnimatedCounter end={1000} /></h3>
          <p>Happy Clients</p>
        </div>
      </motion.div>
      
      <motion.div 
        className="home-section founder-section"
        initial={{ opacity: 0, x: -60 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="section-header">
          <span className="section-icon">👨‍💼</span>
          <h2>Founder</h2>
        </div>
        <p>Mr. Trang Ho, founder of TrangCorp, has experience managing restaurants in Australia and recognized the potential of the international market for frozen food products. Before founding TrangCorp, he was the General Director of Trang's Food in Australia since 1985.</p>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="home-section team-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-header">
          <span className="section-icon">👥</span>
          <h2>Our Team</h2>
        </div>
        <div className="team-grid">
          <motion.div 
            className="team-member"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={images.ranbir} alt="Ranbir Singh" className="team-avatar" />
            <h3>Ranbir Singh</h3>
            <p>Lead Developer & Project Manager</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/ranbirsingh14/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="home-section products-section"
        initial={{ opacity: 0, x: 60 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="section-header">
          <span className="section-icon">🍞</span>
          <h2>Product Highlights</h2>
        </div>
        <ul className="product-list">
          <motion.li 
            whileHover={{ x: 10, color: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <strong>Farmer's White Wheat Bread</strong> - Wheat grains, eggs, yeast, essential flour, wheat flour, brown wheat flour
          </motion.li>
          <motion.li 
            whileHover={{ x: 10, color: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <strong>Sandwich Bread</strong> - Wheat flour, sugar, salt, yeast, milk powder, butter, eggs
          </motion.li>
          <motion.li 
            whileHover={{ x: 10, color: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <strong>Three-Flavor Tart</strong> - Butter, sugar, chicken eggs, wheat flour, almonds, cinnamon, milk, yeast, spices
          </motion.li>
          <motion.li 
            whileHover={{ x: 10, color: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <strong>Beef Sponge Cake</strong> - Wheat grains, eggs, yeast, essential flour, wheat flour, brown wheat flour
          </motion.li>
          <motion.li 
            whileHover={{ x: 10, color: "#3b82f6" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <strong>Pork Floss Sponge Cake</strong> - Pork floss, eggs, wheat flour, sugar, milk powder, butter, baking powder, salt
          </motion.li>
        </ul>
      </motion.div>

      {/* Interactive Features Section */}
      <motion.div 
        className="features-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <h2>Our Features</h2>
        </div>
        <div className="features-grid">
          <InteractiveCard
            title="Quality Assurance"
            description="Rigorous quality control processes ensuring the highest standards in every product."
            icon="🔍"
            color="#ff6b6b"
          />
          <InteractiveCard
            title="Global Export"
            description="Serving markets across Europe, America, and Australia with reliable delivery."
            icon="🌍"
            color="#4ecdc4"
          />
          <InteractiveCard
            title="Innovation"
            description="Continuous research and development to create new and improved products."
            icon="💡"
            color="#45b7d1"
          />
          <InteractiveCard
            title="Customer Focus"
            description="Dedicated to meeting customer needs with personalized solutions and support."
            icon="🤝"
            color="#96ceb4"
          />
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="testimonials-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-header">
          <span className="section-icon">💬</span>
          <h2>What Our Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          <TestimonialCard
            name="Sarah Johnson"
            role="Procurement Manager"
            content="TrangCorp has been our trusted partner for over 5 years. Their quality and reliability are unmatched."
            avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          />
          <TestimonialCard
            name="Michael Chen"
            role="Restaurant Owner"
            content="The consistency and taste of their products have helped us maintain our high standards."
            avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          />
          <TestimonialCard
            name="Emma Davis"
            role="Food Distributor"
            content="Excellent service and product quality. They always deliver on time and exceed expectations."
            avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="home-section contact-section"
        initial={{ opacity: 0, y: 60 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="section-header">
          <span className="section-icon">📞</span>
          <h2>Contact</h2>
        </div>
        <div className="contact-info">
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="contact-item"
          >
            <span className="contact-icon">📍</span>
            <strong>Address:</strong> Lot A 14b, Hiep Phuoc Industrial Park, Long Thoi Commune, Nha Be District. Ho Chi Minh City, Vietnam.
          </motion.p>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="contact-item"
          >
            <span className="contact-icon">📱</span>
            <strong>Tel:</strong> 028-3780-0900 | 028-3780-0888
          </motion.p>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="contact-item"
          >
            <span className="contact-icon">✉️</span>
            <strong>Email:</strong> info@trangcorporation.vn
          </motion.p>
        </div>
      </motion.div>
    </AnimatedPage>
  );
}

function About() {
  return (
    <AnimatedPage animation={{ initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0 }, transition: { duration: 0.8 } }}>
      <div className="hero-section">
        <FloatingIcon delay={0}>📖</FloatingIcon>
        <img src={images.about} alt="About" className="tab-photo hero-image" />
        <motion.h1 className="gradient-text" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>About Trangotech</motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Trangotech (TrangCorp) is a leading innovator in the frozen food industry, exporting to over 50 countries. Our mission is to deliver quality, safety, and taste in every product.
        </motion.p>
      </div>
      <motion.div className="home-section founder-section" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <div className="section-header"><span className="section-icon">🌍</span><h2>Our Vision</h2></div>
        <p>To be the most trusted and innovative food company, bringing the taste of Vietnam to the world.</p>
      </motion.div>
      <motion.div className="home-section products-section" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
        <div className="section-header"><span className="section-icon">🏆</span><h2>Achievements</h2></div>
        <ul className="product-list">
          <li>ISO 22000:2018 Certified</li>
          <li>Top 10 Exporter in Vietnam</li>
          <li>Over 1000+ satisfied clients worldwide</li>
        </ul>
      </motion.div>
      <motion.div className="home-section contact-section" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <div className="section-header"><span className="section-icon">🤝</span><h2>Our Partners</h2></div>
        <p>We collaborate with leading distributors, supermarkets, and restaurants globally.</p>
      </motion.div>
    </AnimatedPage>
  );
}

function Services() {
  return (
    <AnimatedPage animation={{ initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.8 } }}>
      <div className="hero-section">
        <FloatingIcon delay={0}>🛠️</FloatingIcon>
        <img src={images.services} alt="Services" className="tab-photo hero-image" />
        <motion.h1 className="gradient-text" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>Our Services</motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          We offer a wide range of services from product development, private labeling, to global logistics and supply chain management.
        </motion.p>
      </div>
      <motion.div className="home-section products-section" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
        <div className="section-header"><span className="section-icon">🔬</span><h2>Product Development</h2></div>
        <ul className="product-list">
          <li>Custom recipe creation</li>
          <li>Packaging design and innovation</li>
          <li>Quality assurance and food safety consulting</li>
        </ul>
      </motion.div>
      <motion.div className="home-section founder-section" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <div className="section-header"><span className="section-icon">🚚</span><h2>Logistics & Export</h2></div>
        <ul className="product-list">
          <li>Global shipping and documentation</li>
          <li>Cold chain management</li>
          <li>Customs clearance support</li>
        </ul>
      </motion.div>
      <motion.div className="home-section contact-section" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <div className="section-header"><span className="section-icon">💼</span><h2>Consulting</h2></div>
        <p>We provide expert consulting for food startups, exporters, and importers to help you succeed in the global market.</p>
      </motion.div>
    </AnimatedPage>
  );
}

function Blog() {
  return (
    <AnimatedPage animation={{ initial: { opacity: 0, rotate: -10 }, animate: { opacity: 1, rotate: 0 }, exit: { opacity: 0 }, transition: { duration: 0.8 } }}>
      <div className="hero-section">
        <FloatingIcon delay={0}>📰</FloatingIcon>
        <img src={images.blog} alt="Blog" className="tab-photo hero-image" />
        <motion.h1 className="gradient-text" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>Blog & News</motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Stay updated with the latest news, product launches, and industry insights from Trangotech.
        </motion.p>
      </div>
      <motion.div className="home-section products-section" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
        <div className="section-header"><span className="section-icon">📝</span><h2>Latest Articles</h2></div>
        <ul className="product-list">
          <li>How to ensure food safety in global supply chains</li>
          <li>Innovations in frozen food packaging</li>
          <li>Meet our team: Interview with Ranbir Singh</li>
        </ul>
      </motion.div>
    </AnimatedPage>
  );
}

function Contact() {
  return (
    <AnimatedPage animation={{ initial: { opacity: 0, scale: 1.2 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 }, transition: { duration: 0.8 } }}>
      <div className="hero-section">
        <FloatingIcon delay={0}>📬</FloatingIcon>
        <img src={images.contact} alt="Contact" className="tab-photo hero-image" />
        <motion.h1 className="gradient-text" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>Contact Us</motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Reach out to Trangotech for business inquiries, support, or partnership opportunities. We are here to help you grow.
        </motion.p>
      </div>
      <motion.div className="home-section contact-section" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <div className="section-header"><span className="section-icon">📞</span><h2>Contact Details</h2></div>
        <ul className="product-list">
          <li><strong>Address:</strong> Lot A 14b, Hiep Phuoc Industrial Park, Long Thoi Commune, Nha Be District. Ho Chi Minh City, Vietnam.</li>
          <li><strong>Tel:</strong> 028-3780-0900 | 028-3780-0888</li>
          <li><strong>Email:</strong> info@trangcorporation.vn</li>
        </ul>
      </motion.div>
      <motion.div className="home-section founder-section" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <div className="section-header"><span className="section-icon">🕒</span><h2>Business Hours</h2></div>
        <ul className="product-list">
          <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
          <li>Saturday: 8:00 AM - 12:00 PM</li>
          <li>Sunday: Closed</li>
        </ul>
      </motion.div>
      <motion.div className="home-section products-section" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
        <div className="section-header"><span className="section-icon">💬</span><h2>Get in Touch</h2></div>
        <p>For a quick response, connect with us on <a href="https://www.linkedin.com/in/ranbirsingh14/" target="_blank" rel="noopener noreferrer">LinkedIn</a> or use our contact form.</p>
      </motion.div>
    </AnimatedPage>
  );
}

function App() {
  return (
    <Router>
      <AnimatedNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
