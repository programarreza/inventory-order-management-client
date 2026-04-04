"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import banner1 from "@/assets/images/banner-1.jpg";
import banner2 from "@/assets/images/banner-2.webp";

const Banner = () => {
  return (
    <div className="">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        className="mySwiper"
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        spaceBetween={30}
      >
          <SwiperSlide key={"banner-1"}>
            <Image
              alt=""
              className="w-full h-[320px] lg:h-[500px] object-cover object-center"
              height={1200}
              src={banner1}
              width={1200}
            />
          </SwiperSlide>
          <SwiperSlide key={"banner-2"}>
            <Image
              alt=""
              className="w-full h-[320px] lg:h-[500px] object-cover object-center"
              height={1200}
              src={banner2}
              width={1200}
            />
          </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
