import React from 'react';
import { LucideIcon } from 'lucide-react';

type CardProps = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  icon?: any;
};

export const MyCard: React.FC<CardProps> = ({ image, imageAlt, title, description, icon: Icon }) => (
  <div className="flex flex-col relative overflow-hidden bg-primary hover:bg-white rounded-[5px_25px_5px_50px] transition-all duration-300 hover:scale-[1.01] hover:shadow-lg focus:outline-0 group" tabIndex={0}>
    <div className="flex h-64 relative">
      <img 
        src={image} 
        alt={imageAlt} 
        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-100 brightness-75"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:bg-opacity-25">
        <h2 className="font-serif font-bold text-2xl md:text-3xl text-white absolute inset-0 flex items-center justify-center text-center px-4 transition-all duration-300 group-hover:scale-110">
          {title}
        </h2>
      </div>
      {Icon && (
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-primary group-hover:bg-white rounded-full p-2 transition-colors duration-300">
          <Icon className="h-12 w-12 text-white group-hover:text-primary transition-colors duration-300" />
        </div>
      )}
    </div>
    <div className="p-6 pt-10 text-white group-hover:text-primary transition-colors duration-300">
      <p className="font-sans leading-relaxed">{description}</p>
    </div>
  </div>
);