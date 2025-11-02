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
    const activeIndex = isMobile ? 1 : 2; // Card tengah yang aktif
    
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
      <section
        className="flex flex-col items-center min-h-full mx-auto md:px-4 justify-center"
      >
      <span
        className="
          inline-block
          bg-transparent
          border-[1px] border-[#C4C4C4]/50
          rounded-full
          px-4 py-2
          text-xl text-gray-300
          font-medium
          w-fit
        "
      >
        Your Blueprint for Success
      </span>
      

          <div className="relative w-[95%] sm:w-[80%] md:w-full max-w-4xl mx-auto pt-8">
        <div className="overflow-hidden">
          <ul 
            ref={trackRef}
            className="flex"
          >
            {extendedCards.map((card, index) => (
              <li 
                key={index} 
                className={`flex-none ${isMobile ? 'w-full' : 'w-1/3'} px-1 sm:px-2 md:px-4 transition-all duration-400 opacity-50 scale-90`}
              >
                  <div className="p-3 sm:p-4 md:p-6 bg-[#030814] backdrop-blur border border-gray-600/30 rounded-2xl flex flex-col items-center justify-center min-h-[220px] h-[220px] sm:min-h-[240px] sm:h-[240px] md:min-h-[260px] md:h-[260px] w-full text-center">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-white">{card.title}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">{card.description}</p>
                  </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Previous Button*/}
        <button 
          onClick={movePrev}
          disabled={isAnimating}
          className="
            absolute -left-7 sm:-left-10 md:-left-16 top-1/2 transform -translate-y-1/2 z-10
            bg-gradient-to-br from-[#020F31] to-[#072F97] 
            text-white rounded-full 
            w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
            shadow-lg                                
            disabled:opacity-50 
            transition-all duration-300
          "
        >
          {/* Ikon panah SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        <button 
          onClick={moveNext}
          disabled={isAnimating}
          className="
            absolute -right-7 sm:-right-10 md:-right-16 top-1/2 transform -translate-y-1/2 z-10
            bg-gradient-to-br from-[#020F31] to-[#072F97]    /* Gradient Biru */
            text-white rounded-full 
            w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
            shadow-lg                                        /* Opsional: menambah kedalaman */
            disabled:opacity-50  /* Disabled: tanpa efek naik */
            transition-all duration-300
          "
        >
          {/* Ikon panah SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Carousel;