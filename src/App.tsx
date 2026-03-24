import { useState, useEffect } from 'react';
import { 
  Menu, X, Moon, Sun, Instagram, Facebook, Twitter, Phone, Mail, MapPin, Clock, 
  ChevronRight, Star, ArrowRight, Utensils, Info, Image as ImageIcon, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBusinessDetails } from './services/businessService';

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <Utensils className="w-4 h-4" /> },
    { name: 'About', href: '#about', icon: <Info className="w-4 h-4" /> },
    { name: 'Menu', href: '#menu', icon: <Utensils className="w-4 h-4" /> },
    { name: 'Gallery', href: '#gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Reviews', href: '#reviews', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Contact', href: '#contact', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
              <div className="w-10 h-10 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center">
                <span className="text-white dark:text-zinc-900 font-display">J</span>
              </div>
              JACKS
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="#contact"
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Order Now
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-900 dark:text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-4 text-base font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-all"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-full text-sm font-bold"
                >
                  Order Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ tagline }: { tagline: string }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop"
          alt="Premium Burger"
          className="w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-zinc-900/50 backdrop-blur-md rounded-full border border-white/20">
            Now Open in Hidd
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
            JACKS <span className="text-zinc-400 italic">BAHRAIN</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#menu"
              className="w-full sm:w-auto bg-white text-zinc-900 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors group"
            >
              Explore Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto bg-transparent border border-white/30 text-white backdrop-blur-sm px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Find Us
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const About = ({ aboutText }: { aboutText: string }) => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
              Crafting Excellence <br />
              <span className="text-zinc-400">Since Day One</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {aboutText}
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-2xl font-bold mb-2">100%</h4>
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-bold">Fresh Beef</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2">Daily</h4>
                <p className="text-sm text-zinc-500 uppercase tracking-wider font-bold">Baked Buns</p>
              </div>
            </div>
            <a href="#menu" className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold group">
              Learn more about our process
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
                alt="Restaurant Interior"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-zinc-900 dark:bg-white p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-white dark:text-zinc-900 font-bold text-xl">"Best burgers in Hidd, hands down."</p>
              <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-2">- Local Foodie</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = ({ menu }: { menu: any[] }) => {
  return (
    <section id="menu" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Menu</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto">Carefully curated selections for the ultimate fast food experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {menu.map((cat, idx) => (
            <motion.div
              key={cat.category || cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white dark:bg-zinc-950 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800"
            >
              <h3 className="text-2xl font-bold mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800">{cat.category || cat.title}</h3>
              <div className="space-y-8">
                {cat.items.map((item: any) => (
                  <div key={item.name} className="flex justify-between gap-4 group cursor-pointer">
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-zinc-500 transition-colors">{item.name}</h4>
                      <p className="text-sm text-zinc-500 mt-1">{item.desc || item.description}</p>
                    </div>
                    <span className="font-bold text-zinc-900 dark:text-white whitespace-nowrap">{item.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1780&auto=format&fit=crop",
  ];

  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Gallery</h2>
            <p className="text-zinc-500 mt-4">A glimpse into our kitchen and atmosphere.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <img
                src={img}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-sm uppercase tracking-widest">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = ({ reviews }: { reviews: any[] }) => {
  return (
    <section id="reviews" className="py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">What Our Guests Say</h2>
          <div className="flex justify-center gap-1 text-yellow-500 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
          </div>
          <p className="text-zinc-400">Average rating based on recent reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-zinc-800/50 p-8 rounded-3xl border border-white/5"
            >
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(Math.max(0, Math.min(5, Math.floor(Number(review.rating) || 5))))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 italic">"{review.text}"</p>
              <div className="flex justify-between items-center">
                <span className="font-bold">{review.name || review.author}</span>
                <span className="text-xs text-zinc-500">{review.date || review.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ contact, mapsLinks }: { contact: any, mapsLinks: any[] }) => {
  return (
    <section id="contact" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Get in Touch</h2>
            <p className="text-zinc-500 mb-12">Have a question or want to place a large order? Reach out to us.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Location</h4>
                  <p className="text-zinc-500">{contact.address}</p>
                  {mapsLinks.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {mapsLinks.map((link, i) => (
                        <a key={i} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline block">
                          {link.title || "View on Google Maps"}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone & WhatsApp</h4>
                  <p className="text-zinc-500">{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Opening Hours</h4>
                  {typeof contact.hours === 'string' ? (
                    <p className="text-zinc-500">{contact.hours}</p>
                  ) : (
                    <div className="text-zinc-500 text-sm space-y-1">
                      {Object.entries(contact.hours).map(([day, time]) => (
                        <div key={day} className="flex justify-between gap-4">
                          <span className="font-medium">{day}:</span>
                          <span>{String(time)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="h-[500px] rounded-3xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14318.544716441655!2d50.6453285!3d26.223547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49a8d000000001%3A0x0!2zSGlkZA!5e0!3m2!1sen!2sbh!4v1711280000000!5m2!1sen!2sbh"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-2xl font-bold tracking-tighter mb-6">JACKS</div>
        <p className="text-zinc-500 text-sm mb-8">© 2026 Jacks Premium Fast Food. All rights reserved.</p>
        <div className="flex justify-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Careers</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [businessData, setBusinessData] = useState({
    tagline: "Experience the art of fast food. Handcrafted burgers, artisanal sides, and a vibe that's purely premium.",
    about: "At Jacks, we believe that fast food doesn't have to mean compromise. We've reimagined the classic burger joint experience for the modern palate, combining speed with high-quality, locally sourced ingredients.",
    menu: [
      { 
        category: "Signature Burgers", 
        items: [
          { name: "The Jack Classic", price: "3.5 BHD", desc: "Angus beef, cheddar, secret sauce, pickles." },
          { name: "Truffle Deluxe", price: "4.2 BHD", desc: "Beef patty, truffle mayo, caramelized onions." },
          { name: "Spicy Hidd", price: "3.8 BHD", desc: "Crispy chicken, jalapeños, spicy aioli." }
        ] 
      },
      { 
        category: "Artisanal Sides", 
        items: [
          { name: "Truffle Fries", price: "2.0 BHD", desc: "Hand-cut fries, truffle oil, parmesan." },
          { name: "Jack Wings", price: "2.5 BHD", desc: "6 pieces, choice of Buffalo or BBQ." },
          { name: "Onion Petals", price: "1.8 BHD", desc: "Crispy fried onion petals with ranch." }
        ] 
      }
    ],
    reviews: [
      { name: "Ahmed Al-Hidd", rating: 5, text: "Best burger place in Hidd. The truffle fries are out of this world!", date: "2 days ago" },
      { name: "Sarah J.", rating: 5, text: "Love the atmosphere and the service. The Spicy Hidd chicken is my favorite.", date: "1 week ago" },
      { name: "Mohammed K.", rating: 4, text: "Premium quality fast food. A bit pricey but definitely worth it.", date: "2 weeks ago" }
    ],
    contact: {
      phone: "+973 1700 0000",
      address: "Road 123, Block 456, Hidd, Bahrain",
      hours: "Daily: 12:00 PM - 02:00 AM"
    },
    mapsLinks: [] as any[]
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching business details...");
        const data = await getBusinessDetails();
        console.log("Fetched data:", data);
        if (data) {
          setBusinessData({
            tagline: data.tagline || businessData.tagline,
            about: data.about || businessData.about,
            menu: data.menu || businessData.menu,
            reviews: data.reviews || businessData.reviews,
            contact: data.contact || businessData.contact,
            mapsLinks: data.mapsLinks || []
          });
        }
      } catch (err) {
        console.error("Failed to fetch business details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-zinc-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-white rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <Hero tagline={businessData.tagline} />
      <About aboutText={businessData.about} />
      <MenuSection menu={businessData.menu} />
      <Gallery />
      <Reviews reviews={businessData.reviews} />
      <Contact contact={businessData.contact} mapsLinks={businessData.mapsLinks} />
      <Footer />
    </div>
  );
}
