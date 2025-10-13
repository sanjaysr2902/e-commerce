import React, { memo, useMemo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    title: "ELEVATE YOUR DRIVE",
    subtitle: "Premium Automotive Excellence",
    description:
      "Discover bespoke car accessories crafted for the discerning driver. Performance meets sophistication.",
    image: "/car-parts-bg.jpg",
    align: "left",
    badge: "EXCLUSIVE COLLECTION",
    gradient: "from-black/80 via-[#8B0000]/20 to-black/90",
  },
  {
    id: 2,
    title: "PERFORMANCE REDEFINED",
    subtitle: "Engineering Masterpiece",
    description:
      "High-performance accessories engineered for ultimate driving experience and luxury comfort.",
    image: "/slide2.jpg",
    align: "center",
    badge: "LIMITED EDITION",
    gradient: "from-black/80 via-[#1a1a1a]/30 to-black/90",
  },
  {
    id: 3,
    title: "BESPOKE LUXURY",
    subtitle: "Tailored Excellence",
    description:
      "Custom-crafted accessories that transform your vehicle into a statement of personal style.",
    image: "/slide3.jpg",
    align: "right",
    badge: "PREMIUM SELECTION",
    gradient: "from-black/80 via-[#2a0a0a]/25 to-black/90",
  },
];

const SlideContent = memo(({ slide, isActive }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="h-screen relative flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-20">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-400 text-xs tracking-widest">
                LOADING EXCELLENCE
              </p>
            </div>
          </div>
        )}
        <img
          src={slide.image}
          alt={slide.title}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1500 ease-out ${
            isActive ? "scale-100 opacity-100" : "scale-110 opacity-80"
          }`}
        />
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-opacity duration-1500 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -skew-x-12 transition-opacity duration-2000 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative z-10 text-white px-6 md:px-16 lg:px-24 xl:px-32 w-full max-w-7xl flex flex-col justify-center h-full ${
          slide.align === "center"
            ? "text-center items-center"
            : slide.align === "right"
            ? "text-right items-end"
            : "text-left items-start"
        }`}
      >
        <div
          className={`mb-6 transform transition-all duration-1000 delay-300 ${
            isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="inline-block px-3 py-1.5 bg-[#8B0000] text-white text-xs tracking-widest font-medium uppercase border border-[#A00000]">
            {slide.badge}
          </span>
        </div>

        <div className="overflow-hidden mb-3">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight transform transition-all duration-1000 delay-500 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              {slide.title}
            </span>
          </h1>
        </div>

        <div className="overflow-hidden mb-4">
          <p
            className={`text-lg md:text-xl lg:text-2xl font-light text-gray-300 tracking-wide transform transition-all duration-1000 delay-700 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {slide.subtitle}
          </p>
        </div>

        <div className="overflow-hidden mb-8 max-w-xl">
          <p
            className={`text-base md:text-lg text-gray-400 leading-relaxed tracking-normal transform transition-all duration-1000 delay-900 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {slide.description}
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-1100 ${
            isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } ${
            slide.align === "center"
              ? "justify-center"
              : slide.align === "right"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <Link
            to="/products"
            className="group relative px-10 py-4 bg-transparent border border-white/80 text-white font-medium tracking-widest text-sm uppercase overflow-hidden transition-all duration-600 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              EXPLORE COLLECTION
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000] to-[#A00000] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          <Link
            to="/premium"
            className="group relative px-10 py-4 bg-[#8B0000] border border-[#8B0000] text-white font-medium tracking-widest text-sm uppercase overflow-hidden transition-all duration-600 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              PREMIUM RANGE
              <svg
                className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
});

const Show = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSlideChange = useCallback((swiper) => setActiveIndex(swiper.realIndex), []);
  const swiperConfig = useMemo(
    () => ({
      spaceBetween: 0,
      centeredSlides: true,
      loop: true,
      speed: 1400,
      autoplay: { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { clickable: true, dynamicBullets: true },
      navigation: { nextEl: ".swiper-button-next-custom", prevEl: ".swiper-button-prev-custom" },
      modules: [Autoplay, Pagination, Navigation],
      onSlideChange: handleSlideChange,
      className: "h-full w-full",
    }),
    [handleSlideChange]
  );

  return (
    <>
      {/* Hero Slider */}
      <section className="h-screen relative overflow-hidden bg-black">
        <Swiper {...swiperConfig}>
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <SlideContent slide={slide} isActive={activeIndex === index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🚘 Showcase Section */}
      <section className="bg-black text-white py-20 px-8 md:px-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 tracking-widest text-[#8B0000]">
          SHOWCASE GALLERY
        </h2>
        <p className="text-center text-gray-400 mb-14 max-w-3xl mx-auto">
          Experience automotive artistry inspired by the world’s most luxurious designs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <img
            src="https://www.mansory.com/sites/default/files/styles/car_teaser/public/2023-08/mansory-rolls-royce-phantom-linea-nera-doro-01.jpg"
            alt="Phantom Linea Nera D’Oro"
            className="w-full h-80 object-cover rounded-2xl transform hover:scale-105 transition-all duration-700 hover:shadow-[0_0_30px_#8B0000]/50"
          />
          <img
            src="https://i.pinimg.com/736x/62/0e/5f/620e5f33e26ec9726509e3f857bb0d77.jpg"
            alt="Luxury Interior"
            className="w-full h-80 object-cover rounded-2xl transform hover:scale-105 transition-all duration-700 hover:shadow-[0_0_30px_#8B0000]/50"
          />
          <img
            src="https://www.mansory.com/sites/default/files/styles/car_gallery/public/2023-08/mansory-rolls-royce-phantom-linea-nera-doro-02.jpg"
            alt="Premium Craftsmanship"
            className="w-full h-80 object-cover rounded-2xl transform hover:scale-105 transition-all duration-700 hover:shadow-[0_0_30px_#8B0000]/50"
          />
        </div>
      </section>
    </>
  );
});

export default Show;
