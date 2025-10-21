import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Images } from '../../environment';

const Blog: React.FC = () => {
  const settings: SliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const carouselItems: { id: number; image: string; title: string; alt: string }[] = [
    { id: 1, image: Images.CaruselImage1, title: "What's in Store for NFT", alt: 'NFT Blog Image 1' },
    { id: 2, image: Images.CaruselImage2, title: "What's in Store for NFT", alt: 'NFT Blog Image 2' },
    { id: 3, image: Images.CaruselImage1, title: "What's in Store for NFT", alt: 'NFT Blog Image 3' },
    { id: 4, image: Images.CaruselImage2, title: "What's in Store for NFT", alt: 'NFT Blog Image 4' },
  ];

  return (
    <div className="max-w-screen-lg lg:m-auto mx-5">
      <div className="flex flex-col text-center mt-4 mb-14">
        <span className="text-darkGray font-Montserrat text-5xl font-bold leading-normal">
          Latest Trading Insights on I0rd
        </span>
        <span className="text-darkGray font-Montserrat text-lg mt-6">
          Discover real-time market analysis, AI strategies, and community discussions on 0G blockchain trading. <br />
          Designed for transparent, accessible crypto empowerment
        </span>
      </div>
      <Slider {...settings}>
        {carouselItems.map((item) => (
          <div key={item.id} className="relative md:pl-3 pl-0">
            <Image src={item.image} alt={item.alt} width={400} height={300} />
            <div className="absolute bottom-0 left-0 bg-white">
              <div className="lg:px-14 lg:py-5 px-3 py-2">
                <span className="md:text-2xl text-sm text-darkGray font-Montserrat font-bold">
                  {item.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

interface SliderSettings {
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  responsive: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
      infinite?: boolean;
      initialSlide?: number;
    };
  }>;
}

export default Blog;