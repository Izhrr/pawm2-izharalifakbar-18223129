import React, { useState, useEffect, useRef } from 'react';

const Carousel = () => {
  const cardData = [
    { title: 'MySQL', description: 'Most popular open-source relational database, known for its reliability and ease of use. Its a foundational component of the LAMP stack.' },
    { title: 'Oracle Database', description: 'Oracle Database is a powerful, commercial multi-model database management system designed for large-scale enterprise needs.' },
    { title: 'PostgreSQL', description: 'Often called Postgres, this is a powerful, open-source object-relational database system celebrated for its strong standards compliance and extensibility.' },
    { title: 'Microsoft SQL Server', description: 'Microsoft SQL Server is a comprehensive relational database management system from Microsoft, widely used in enterprise environments.' }
  ];

  const trackRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile breakpoint
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize carousel
  useEffect(() => {
    if (trackRef.current) {
      const cardWidth = isMobile ? 100 : 100 / 3;
      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(-${cardWidth}%)`;
      updateHighlight();
    }
  }, [isMobile]);

  const updateHighlight = () => {
    if (!trackRef.current) return;
    
    const slides = trackRef.current.children;
    const activeIndex = isMobile ? 1 : 2;
    
    Array.from(slides).forEach((slide, index) => {
      if (index === activeIndex) {
        slide.classList.add('is-active');
        slide.classList.remove('opacity-50', 'scale-90');
        slide.classList.add('opacity-100', 'scale-100');
      } else {
        slide.classList.remove('is-active');
        slide.classList.add('opacity-50', 'scale-90');
        slide.classList.remove('opacity-100', 'scale-100');
      }
    });
  };

  const moveNext = () => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);

    const cardWidth = isMobile ? 100 : 100 / 3;
    
    trackRef.current.style.transition = 'transform 0.4s ease-in-out';
    trackRef.current.style.transform = `translateX(-${cardWidth * 2}%)`;

    const handleTransitionEnd = () => {
      const firstCard = trackRef.current.children[0];
      trackRef.current.appendChild(firstCard);

      trackRef.current.style.transition = 'none';
      trackRef.current.style.transform = `translateX(-${cardWidth}%)`;
      updateHighlight();
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
      
      trackRef.current.removeEventListener('transitionend', handleTransitionEnd);
    };

    trackRef.current.addEventListener('transitionend', handleTransitionEnd);
  };

  const movePrev = () => {
    if (isAnimating || !trackRef.current) return;
    setIsAnimating(true);

    const cardWidth = isMobile ? 100 : 100 / 3;
    const lastCard = trackRef.current.children[trackRef.current.children.length - 1];
    trackRef.current.insertBefore(lastCard, trackRef.current.children[0]);

    trackRef.current.style.transition = 'none';
    trackRef.current.style.transform = `translateX(-${cardWidth * 2}%)`;
    
    trackRef.current.offsetHeight;

    trackRef.current.style.transition = 'transform 0.4s ease-in-out';
    trackRef.current.style.transform = `translateX(-${cardWidth}%)`;

    const handleTransitionEnd = () => {
      updateHighlight();
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
      
      trackRef.current.removeEventListener('transitionend', handleTransitionEnd);
    };

    trackRef.current.addEventListener('transitionend', handleTransitionEnd);
  };

  const extendedCards = [...cardData, ...cardData];

  return (
    <section className="flex flex-col w-full max-w-7xl mx-auto px-4 md:px-16 justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Practice with Industry-Standard SQL</h1>
      

      <div className="relative w-[50%] md:w-full max-w-4xl mx-auto pt-8">
        <div className="overflow-hidden">
          <ul 
            ref={trackRef}
            className="flex"
          >
            {extendedCards.map((card, index) => (
              <li 
                key={index} 
                className={`flex-none ${isMobile ? 'w-full' : 'w-1/3'} px-2 md:px-4 transition-all duration-400 opacity-50 scale-90`}
              >
                <div className="p-6 bg-gray-800/50 backdrop-blur border border-gray-600/30 rounded-2xl flex flex-col items-center min-h-[200px]">
                  <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                  <p className="text-gray-300 text-sm text-center">{card.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          onClick={movePrev}
          disabled={isAnimating}
          className="absolute left-0 md:-left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 border border-gray-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          &#8249;
        </button>
        <button 
          onClick={moveNext}
          disabled={isAnimating}
          className="absolute right-0 md:-right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/80 border border-gray-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default Carousel;