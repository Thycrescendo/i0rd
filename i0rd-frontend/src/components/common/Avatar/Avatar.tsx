import React, { MouseEvent } from 'react';

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
      <img
        style={{ width: `${size}px`, height: `${size}px` }}
        src={src}
        className="rounded-full object-cover"
        alt={alt}
        onClick={onClick}
        width={size}
        height={size}
      />
    </div>
  );
};