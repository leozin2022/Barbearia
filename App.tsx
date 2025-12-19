
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Scissors, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Navigation,
  Menu,
  X,
  ShieldCheck,
  User
} from 'lucide-react';
import { BARBER_CONFIG } from './config';
import { Counter } from './components/Counter';

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h3 className="text-gold font-semibold tracking-widest uppercase mb-2 text-sm md:text-base">{subtitle}</h3>
    <h2 className="text-4xl md:text-6xl font-bold font-serif">{title}</h2>
    <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"></div>
  </motion.div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  
  const [services] = useState(() => {
    try {
      const saved = localStorage.getItem('barber_services_custom');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed[0].imagem = BARBER_CONFIG.servicos[0].imagem;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Erro ao carregar dados locais", e);
    }
    return BARBER_CONFIG.servicos;
  });

  const heroTexts = [
    { main: "Estilo é a sua", highlight: "Identidade." },
    { main: "A Arte de Barbear com", highlight: "Precisão." },
    { main: "Tradição e Modernidade", highlight: "em um só Lugar." },
    { main: "Sua melhor versão", highlight: "começa agora." }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroTexts.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(heroTimer);
    };
  }, []);

  const waLink = `https://wa.me/${BARBER_CONFIG.whatsapp}?text=Olá! Gostaria de agendar um horário.`;

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark overflow-x-hidden selection:bg-gold selection:text-dark">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-gold/30 py-4 shadow-2xl' : 'bg-black/40 backdrop-blur-sm border-b border-white/5 py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-gold to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] border border-white/10">
                <ShieldCheck className="text-dark w-6 h-6 md:w-8 md:h-8" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-dark/10 rounded-full"
                ></motion.div>
              </div>
            </div>
            <span className="text-lg md:text-2xl font-serif font-black tracking-tighter uppercase whitespace-nowrap">
              {BARBER_CONFIG.nome.split(' ')[0]} <span className="text-gold">{BARBER_CONFIG.nome.split(' ')[1]}</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {['sobre', 'servicos', 'depoimentos', 'localizacao'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                onClick={(e) => handleNavLinkClick(e, item)} 
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] hover:text-gold transition-colors font-bold whitespace-nowrap text-white/80"
              >
                {item.replace('servicos', 'SERVIÇOS').replace('sobre', 'A BARBEARIA').replace('depoimentos', 'FEEDBACKS').replace('localizacao', 'MAPA')}
              </a>
            ))}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-gold text-dark px-6 py-2.5 rounded-full font-black hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-gold/10 text-[10px] lg:text-xs whitespace-nowrap">
              AGENDAR ONLINE
            </a>
          </div>

          <button className="md:hidden text-gold p-2 glass rounded-lg" aria-label="Abrir Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8 md:hidden"
          >
            <button className="absolute top-8 right-8 text-gold p-2" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
            <div className="flex flex-col gap-8 text-center w-full">
              {['home', 'sobre', 'servicos', 'depoimentos', 'localizacao'].map((item) => (
                <a 
                  key={item}
                  href={`#${item}`} 
                  className="text-3xl font-serif font-bold hover:text-gold transition-colors"
                  onClick={(e) => handleNavLinkClick(e, item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('sobre', 'A Barbearia')}
                </a>
              ))}
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-gold text-dark p-6 rounded-2xl font-bold text-xl mt-4 shadow-xl shadow-gold/20">Agendar via WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/30 z-10"></div>
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Interior da Barbearia"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-[2px] w-12 bg-gold"></div>
              <span className="text-gold font-bold tracking-[0.4em] uppercase text-xs md:text-sm">Osasco - SP</span>
            </motion.div>
            
            <div className="relative min-h-[140px] md:min-h-[240px]">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={heroIndex}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="absolute inset-0"
                >
                  <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black leading-[0.95] mb-6">
                    {heroTexts[heroIndex].main} <br />
                    <span className="text-gold italic drop-shadow-2xl">{heroTexts[heroIndex].highlight}</span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-light mt-8 md:mt-16"
            >
              Transformamos seu visual com as técnicas mais modernas do mercado. Luxo e tradição para o homem moderno.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap gap-6"
            >
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-gold text-dark px-10 py-5 rounded-full font-black text-lg hover:bg-white transition-all flex items-center gap-3 group shadow-2xl shadow-gold/30">
                AGENDAR AGORA <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#servicos" onClick={(e) => handleNavLinkClick(e, 'servicos')} className="glass hover:bg-white/10 px-10 py-5 rounded-full font-bold text-lg transition-all border border-white/20">
                NOSSOS SERVIÇOS
              </a>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
          >
            <div className="w-1 h-2 bg-gold rounded-full"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-black relative z-10 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="text-center group">
              <div className="mb-4 flex justify-center"><Scissors className="text-gold/40 group-hover:text-gold transition-colors" size={32}/></div>
              <Counter end={BARBER_CONFIG.estatisticas.cortes} />
              <p className="text-gray-500 uppercase tracking-widest mt-4 font-bold text-sm">Cortes de Mestre</p>
            </div>
            <div className="text-center group border-y md:border-y-0 md:border-x border-white/10 py-12 md:py-0">
              <div className="mb-4 flex justify-center"><Users className="text-gold/40 group-hover:text-gold transition-colors" size={32}/></div>
              <Counter end={BARBER_CONFIG.estatisticas.clientes} />
              <p className="text-gray-500 uppercase tracking-widest mt-4 font-bold text-sm">Clientes Satisfeitos</p>
            </div>
            <div className="text-center group">
              <div className="mb-4 flex justify-center"><Star className="text-gold/40 group-hover:text-gold transition-colors" size={32}/></div>
              <Counter end={BARBER_CONFIG.estatisticas.anos} suffix=" Anos" />
              <p className="text-gray-500 uppercase tracking-widest mt-4 font-bold text-sm">Legado de Estilo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-32 relative scroll-mt-24">
        <div className="container mx-auto px-6">
          <SectionTitle title="Nossos Serviços" subtitle="Excelência em Detalhes" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((servico: any, idx: number) => (
              <motion.div 
                key={servico.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group glass p-4 rounded-[2.5rem] flex flex-col h-full border border-white/5 hover:border-gold/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)]"
              >
                <div className="relative aspect-video overflow-hidden rounded-[2rem] mb-8">
                  <img src={servico.imagem} alt={servico.nome} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                  <div className="absolute bottom-6 right-6 bg-gold text-dark font-black px-6 py-2 rounded-full text-xl shadow-xl">{servico.preco}</div>
                </div>
                <div className="px-6 pb-6 flex flex-col flex-grow">
                  <h4 className="text-2xl font-serif font-bold mb-4 group-hover:text-gold transition-colors">{servico.nome}</h4>
                  <p className="text-gray-400 mb-8 leading-relaxed italic">"{servico.descricao}"</p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-auto w-full py-4 rounded-2xl border border-gold/30 text-gold font-bold text-center hover:bg-gold hover:text-dark transition-all uppercase tracking-widest text-xs">
                    Reservar Horário
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-32 relative overflow-hidden scroll-mt-24">
        <div className="container mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2 relative">
             <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative z-10 p-3 glass rounded-[3rem] border border-gold/20"
              >
                <img src="https://images.unsplash.com/photo-1593702288056-7927b442d0fa?auto=format&fit=crop&q=80&w=1200" className="rounded-[2.5rem] w-full" alt="Nosso Mestre Barbeiro" />
             </motion.div>
             <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gold/10 rounded-full blur-[100px] -z-10"></div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-gold font-bold tracking-[0.4em] uppercase mb-6">A Barbearia</h3>
            <h2 className="text-5xl md:text-7xl font-serif font-black mb-10 leading-tight">Tradição que <br/><span className="text-gold">se renova.</span></h2>
            <p className="text-gray-300 text-lg mb-12 leading-relaxed font-light">
              Localizada no coração de Osasco, a Elegance Barber Shop é mais que uma barbearia, é um espaço de networking, relaxamento e resgate da autoestima masculina. Nossos mestres utilizam as ferramentas mais precisas para garantir um acabamento cirúrgico em cada serviço.
            </p>
            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold"><Clock size={32}/></div>
                <div>
                  <h5 className="font-bold text-xl mb-1">Pontualidade Absoluta</h5>
                  <p className="text-gray-400 text-sm">Respeitamos seu tempo com agendamento rigoroso.</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold"><ShieldCheck size={32}/></div>
                <div>
                  <h5 className="font-bold text-xl mb-1">Biossegurança</h5>
                  <p className="text-gray-400 text-sm">Materiais 100% esterilizados para sua total segurança.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="localizacao" className="py-32 bg-black scroll-mt-24">
        <div className="container mx-auto px-6">
          <SectionTitle title="Onde Estamos" subtitle="Fácil Acesso" />
          <div className="grid md:grid-cols-2 gap-10 glass p-4 md:p-8 rounded-[3rem] border border-white/5 items-center">
            <div className="h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.05836262451!2d-46.7915352238466!3d-23.530366660608554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf016503b8e4e7%3A0x6d859e2181515286!2sRua%20Jos%C3%A9%20Anacleto%20da%20Silva%2C%20110%20-%20Osasco%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1709400000000!5m2!1spt-BR!2sbr" 
                width="100%" height="100%" style={{ border: 0 }} loading="lazy" 
                title="Localização no Google Maps"
              ></iframe>
            </div>
            <div className="p-4 md:p-10 space-y-10">
              <div>
                <h4 className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-6 flex items-center gap-3"><MapPin size={18}/> Nosso Endereço</h4>
                <p className="text-3xl md:text-4xl font-serif font-bold leading-tight">{BARBER_CONFIG.endereco}</p>
              </div>
              <div className="border-l-4 border-gold/40 pl-8 space-y-4">
                <p className="text-gold font-bold text-sm tracking-widest uppercase">Horários</p>
                <div className="grid grid-cols-2 gap-8 text-white/80">
                  <div><p className="font-bold">Seg - Sex</p><p>09h às 20h</p></div>
                  <div><p className="font-bold">Sábados</p><p>08h às 18h</p></div>
                </div>
              </div>
              <a href={BARBER_CONFIG.mapLink} target="_blank" rel="noopener noreferrer" className="bg-gold text-dark w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:bg-white transition-all shadow-2xl shadow-gold/20">
                <Navigation size={24}/> ABRIR NO GPS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-black border-t-2 border-gold/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center"><Scissors className="text-dark"/></div>
               <span className="text-3xl font-serif font-black tracking-tighter italic uppercase">{BARBER_CONFIG.nome}</span>
            </div>
            <div className="flex gap-10 text-gray-500 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
              <a href="#sobre" onClick={(e) => handleNavLinkClick(e, 'sobre')} className="hover:text-gold transition-colors">Barbearia</a>
              <a href="#servicos" onClick={(e) => handleNavLinkClick(e, 'servicos')} className="hover:text-gold transition-colors">Serviços</a>
              <a href="#localizacao" onClick={(e) => handleNavLinkClick(e, 'localizacao')} className="hover:text-gold transition-colors">Contato</a>
            </div>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-all"><Instagram/></a>
              <a href="#" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/50 transition-all"><MessageCircle/></a>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
             <p>© {new Date().getFullYear()} {BARBER_CONFIG.nome}. Todos os direitos reservados.</p>
             <p>PROJETADO POR <span className="text-white">WEBPRO ELITE</span></p>
          </div>
        </div>
      </footer>

      {/* Floating Button */}
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] w-20 h-20 bg-[#25D366] text-white rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all group overflow-hidden border-2 border-white/20"
      >
        <MessageCircle size={36} fill="currentColor" />
        <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white animate-pulse">VIP</span>
      </a>
    </div>
  );
};

export default App;
