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

const Banner = ({ bannerGallery }: { bannerGallery: string[] }) => {
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
        {bannerGallery?.map((image, i) => (
          <SwiperSlide key={i}>
            <Image
              alt=""
              className="w-full h-[320px] lg:h-[500px] object-cover object-center"
              height={1200}
              src={image}
              width={1200}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
