'use client';

import { useState } from 'react';

interface BlogPostImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  className?: string;
}

export default function BlogPostImage({ src, alt, fallbackSrc, className }: BlogPostImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
