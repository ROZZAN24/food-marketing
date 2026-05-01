import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    partySize: '2',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [hoveredDish, setHoveredDish] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCareersModal, setShowCareersModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check if stats section is visible
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setStatsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
    alert('Thank you for your reservation! We\'ll contact you soon.');
    setFormData({ 
      name: '', 
      date: '', 
      partySize: '2',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setShowReservationModal(false);
  };

  const handleBookTable = () => {
    setShowReservationModal(true);
  };

  const handleExploreMenu = () => {
    setShowMenuModal(true);
  };

  const handleWatchFilm = () => {
    setShowVideoModal(true);
  };

  const handleAddToOrder = (dish) => {
    setOrderItems([...orderItems, dish]);
    alert(`${dish.name} added to your order!`);
  };

  const handlePrivacyPolicy = () => {
    setShowPrivacyModal(true);
  };

  const handleTerms = () => {
    setShowTermsModal(true);
  };

  const handleCareers = () => {
    setShowCareersModal(true);
  };

  const dishes = [
    {
      id: 1,
      name: "Truffle Risotto",
      description: "Creamy Arborio rice with black truffle, parmesan, and white wine reduction",
      price: "$48",
      image: "/truffle-risotto.jpg",
      ingredients: ["Black Truffle", "Parmesan", "Arborio Rice", "White Wine"]
    },
    {
      id: 2,
      name: "Wagyu Beef Tenderloin",
      description: "Grade A5 wagyu with roasted vegetables, red wine jus, and herb butter",
      price: "$125",
      image: "/wagyu-beef-tenderloin.jpg",
      ingredients: ["Wagyu Beef", "Red Wine Jus", "Herb Butter", "Seasonal Vegetables"]
    },
    {
      id: 3,
      name: "Dark Chocolate Sphere",
      description: "Handcrafted chocolate sphere with molten center, berry compote, gold leaf",
      price: "$28",
      image: "/dark-chocolate-sphere.jpg",
      ingredients: ["Dark Chocolate", "Berry Compote", "Gold Leaf", "Vanilla Bean"]
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "An unforgettable dining experience. Every dish tells a story, every bite is perfection.",
      author: "Alexander Chen",
      city: "New York",
      rating: 5
    },
    {
      id: 2,
      quote: "SAVORA redefines fine dining. The attention to detail and flavor combinations are extraordinary.",
      author: "Sophia Martinez",
      city: "Los Angeles",
      rating: 5
    },
    {
      id: 3,
      quote: "The most memorable evening of my life. The chef's creativity knows no bounds.",
      author: "James Wellington",
      city: "Chicago",
      rating: 5
    }
  ];

  const AnimatedCounter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!statsVisible) return;
      
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 20);
      
      return () => clearInterval(timer);
    }, [target, statsVisible]);
    
    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="savora-landing">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">SAVORA</div>
          <div className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#story">Story</a>
            <a href="#reservations">Reservations</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="nav-cta" onClick={handleBookTable}>Book a Table</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-mesh"></div>
          <div className="floating-badges">
            <span className="badge badge-1">🍝</span>
            <span className="badge badge-2">🥩</span>
            <span className="badge badge-3">🍷</span>
            <span className="badge badge-4">🫐</span>
          </div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Where Every Bite Tells a Story</h1>
          <p className="hero-subtitle">
            Experience artisanal cuisine crafted with passion, served with soul. 
            Each dish is a journey through flavor, texture, and memory.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={handleExploreMenu}>Explore Menu</button>
            <button className="btn-ghost" onClick={handleWatchFilm}>Watch Film</button>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section id="menu" className="featured-dishes">
        <div className="container">
          <h2 className="section-title">Signature Creations</h2>
          <div className="dishes-grid">
            {dishes.map((dish, index) => (
              <div 
                key={dish.id} 
                className={`dish-card ${hoveredDish === dish.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredDish(dish.id)}
                onMouseLeave={() => setHoveredDish(null)}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="dish-image">
                  <img src={dish.image} alt={dish.name} />
                  {hoveredDish === dish.id && (
                    <div className="dish-ingredients">
                      {dish.ingredients.map((ing, i) => (
                        <span key={i} className="ingredient-tag">{ing}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="dish-content">
                  <h3 className="dish-name">{dish.name}</h3>
                  <p className="dish-description">{dish.description}</p>
                  <div className="dish-footer">
                    <span className="dish-price">{dish.price}</span>
                    <button className="btn-add" onClick={() => handleAddToOrder(dish)}>Add to Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Strip */}
      <section id="story" ref={statsRef} className="brand-story">
        <div className="container">
          <div className="story-content">
            <div className="story-stats">
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={12} suffix=" Years" />
                </div>
                <div className="stat-label">of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={200} suffix="+ Dishes" />
                </div>
                <div className="stat-label">Created</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter target={50} suffix="K+ Guests" />
                </div>
                <div className="stat-label">Served</div>
              </div>
            </div>
            <div className="story-text">
              <p>
                From humble beginnings to culinary excellence, SAVORA has been 
                redefining the dining experience for over a decade. Our commitment 
                to quality, innovation, and passion has made us a destination for 
                food enthusiasts seeking something extraordinary.
              </p>
              <blockquote>
                "We don't just serve food; we craft memories that linger on the palate and in the heart."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Voices of Our Guests</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <div className="author-name">{testimonial.author}</div>
                  <div className="author-city">{testimonial.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section id="reservations" className="reservation-cta">
        <div className="container">
          <h2 className="cta-title">Reserve Your Evening</h2>
          <form className="reservation-form" onSubmit={handleFormSubmit}>
            <div className="form-columns">
              <div className="form-column">
                <label className="form-label">Personal Information</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="form-input"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-column">
                <label className="form-label">Reservation Details</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                  className="form-input"
                />
                <select name="partySize" value={formData.partySize} onChange={handleFormChange} className="form-select">
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests</option>
                </select>
                <textarea
                  name="specialRequests"
                  placeholder="Special Requests (Optional)"
                  value={formData.specialRequests}
                  onChange={handleFormChange}
                  className="form-textarea"
                  rows="3"
                />
              </div>
              <div className="form-column">
                <label className="form-label">Confirm Reservation</label>
                <button type="submit" className="btn-submit">Reserve Now</button>
                <p className="form-note">We'll confirm your reservation within 24 hours</p>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">SAVORA</div>
              <p className="footer-tagline">Crafted with passion. Served with soul.</p>
            </div>
            <div className="footer-links">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); handlePrivacyPolicy(); }}>Privacy Policy</a>
              <a href="#terms" onClick={(e) => { e.preventDefault(); handleTerms(); }}>Terms of Service</a>
              <a href="#careers" onClick={(e) => { e.preventDefault(); handleCareers(); }}>Careers</a>
            </div>
            <div className="footer-social">
              <a href="#instagram" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </a>
              <a href="#twitter" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#tiktok" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.26 6.26 0 00-1.06-.09 6.26 6.26 0 00-6.26 6.26 6.26 6.26 0 0011.17 3.87l.03-.03V12.82h1.19A4.83 4.83 0 0020.21 7.47v-.78z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showReservationModal && (
        <div className="modal-overlay" onClick={() => setShowReservationModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reserve Your Table</h3>
              <button className="modal-close" onClick={() => setShowReservationModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Experience culinary excellence at SAVORA. Fill in your details below to reserve your table.</p>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-form-grid">
                  <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} required />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} required />
                  <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleFormChange} required />
                  <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
                  <select name="partySize" value={formData.partySize} onChange={handleFormChange}>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
                <textarea name="specialRequests" placeholder="Special requests (optional)" value={formData.specialRequests} onChange={handleFormChange} />
                <button type="submit" className="btn-submit">Confirm Reservation</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showMenuModal && (
        <div className="modal-overlay" onClick={() => setShowMenuModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Our Complete Menu</h3>
              <button className="modal-close" onClick={() => setShowMenuModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="menu-categories">
                <div className="menu-category">
                  <h4>Appetizers</h4>
                  <ul>
                    <li>Oyster Rockefeller - $18</li>
                    <li>Burrata with Prosciutto - $22</li>
                    <li>Truffle Arancini - $16</li>
                  </ul>
                </div>
                <div className="menu-category">
                  <h4>Main Courses</h4>
                  <ul>
                    <li>Truffle Risotto - $48</li>
                    <li>Wagyu Beef Tenderloin - $125</li>
                    <li>Lobster Thermidor - $85</li>
                    <li>Duck Confit - $68</li>
                  </ul>
                </div>
                <div className="menu-category">
                  <h4>Desserts</h4>
                  <ul>
                    <li>Dark Chocolate Sphere - $28</li>
                    <li>Crème Brûlée - $18</li>
                    <li>Tiramisu - $22</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showVideoModal && (
        <div className="modal-overlay video-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-header">
              <h3>SAVORA - Culinary Excellence</h3>
              <button className="modal-close" onClick={() => setShowVideoModal(false)}>×</button>
            </div>
            <div className="video-container">
              <video 
                controls 
                autoPlay 
                className="savora-video"
                poster="/truffle-risotto.jpg"
              >
                <source src="/savora-film.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="video-description">
              <p>Experience the art of fine dining at SAVORA, where every dish tells a story of passion, innovation, and culinary excellence.</p>
              <div className="video-stats">
                <span>🕒 3:45</span>
                <span>👁️ 12.5K views</span>
                <span>⭐ 4.9 rating</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPrivacyModal && (
        <div className="modal-overlay" onClick={() => setShowPrivacyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Privacy Policy</h3>
              <button className="modal-close" onClick={() => setShowPrivacyModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <h4>Information We Collect</h4>
              <p>We collect personal information you provide when making reservations, including name, contact details, and preferences.</p>
              
              <h4>How We Use Your Information</h4>
              <p>Your information is used solely for reservation management and improving your dining experience.</p>
              
              <h4>Data Protection</h4>
              <p>We implement industry-standard security measures to protect your personal information.</p>
              
              <h4>Contact Us</h4>
              <p>For privacy concerns, contact us at privacy@savora.com</p>
            </div>
          </div>
        </div>
      )}

      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Terms of Service</h3>
              <button className="modal-close" onClick={() => setShowTermsModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <h4>Reservation Policy</h4>
              <p>Reservations require a credit card hold. Cancellations must be made 24 hours in advance.</p>
              
              <h4>Payment Terms</h4>
              <p>All payments are processed securely. Major credit cards accepted.</p>
              
              <h4>Service Standards</h4>
              <p>We strive to provide exceptional service. Any concerns will be addressed promptly.</p>
              
              <h4>Legal Compliance</h4>
              <p>All operations comply with local health and safety regulations.</p>
            </div>
          </div>
        </div>
      )}

      {showCareersModal && (
        <div className="modal-overlay" onClick={() => setShowCareersModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Careers at SAVORA</h3>
              <button className="modal-close" onClick={() => setShowCareersModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <h4>Current Openings</h4>
              <ul>
                <li><strong>Executive Chef</strong> - 5+ years experience in fine dining</li>
                <li><strong>Sous Chef</strong> - 3+ years experience</li>
                <li><strong>Pastry Chef</strong> - Specialized dessert experience</li>
                <li><strong>Sommelier</strong> - Wine certification required</li>
                <li><strong>Server</strong> - Fine dining experience preferred</li>
                <li><strong>Host</strong> - Excellent communication skills</li>
              </ul>
              
              <h4>Why Join SAVORA?</h4>
              <p>• Competitive salary and benefits<br/>
              • Professional development opportunities<br/>
              • Creative culinary environment<br/>
              • Work with world-class ingredients</p>
              
              <h4>How to Apply</h4>
              <p>Email your resume to careers@savora.com with the position in the subject line.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
