import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Upgrade Your Ride",
    description: "Premium car accessories that blend style and functionality.",
    image: "/car-parts-bg.jpg",
    align: "left",
  },
  {
    id: 2,
    title: "Drive in Style",
    description: "High-quality accessories to enhance your car experience.",
    image: "/slide2.jpg",
    align: "center",
  },
  {
    id: 3,
    title: "Luxury Meets Functionality",
    description: "Make every ride comfortable and stylish with our collection.",
    image: "/slide3.jpg",
    align: "center",
  },
];

export default function Banner() {
  return (
    <section className="h-screen relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="h-screen relative flex items-center justify-center">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div
                className={`relative z-10 text-white px-6 md:px-12 lg:px-24 w-full md:w-1/2 flex flex-col justify-center h-full ${
                  slide.align === "center"
                    ? "text-center mx-auto"
                    : "text-left"
                }`}
              >
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-xl mb-8 max-w-xl font-medium drop-shadow-sm">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div
                  className={`flex ${
                    slide.align === "center"
                      ? "justify-center space-x-6"
                      : "space-x-6"
                  }`}
                >
                  <Link
                    to="/products"
                    className="px-8 py-4 rounded-xl border-2 border-white text-white/90 font-semibold hover:bg-white hover:text-black transition text-lg"
                  >
                    Products
                  </Link>
                  <Link
                    to="/learnmore"
                    className="px-8 py-4 rounded-xl border-2 border-white text-white/90 font-semibold hover:bg-white hover:text-black transition text-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for arrows */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: black !important;
          fill: black !important;
          stroke: black !important;
        }
      `}</style>
    </section>
  );
}
