import React, { MouseEvent } from 'react';
import Image from 'next/image';

interface AvatarProps {
  className?: string;
  alt?: string;
  src: string;
  onClick?: (event: MouseEvent<HTMLImageElement>) => void;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  className = '',
  alt = 'avatar',
  src,
  onClick = () => {},
  size = 42,
}) => {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full object-cover"
        onClick={onClick}
      />
    </div>
  );
};