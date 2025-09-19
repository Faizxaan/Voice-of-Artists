import React from "react";
import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  const baseClasses =
    "font-display transition-all duration-300 transform border-2 border-black";

  const variantClasses = {
    primary: "cta-button",
    outline: "cta-button-outline",
  };

  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-lg px-8 py-4",
    lg: "text-xl px-12 py-6",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

interface TapeOverlayProps {
  children: React.ReactNode;
  vertical?: boolean;
  className?: string;
}

export const TapeOverlay: React.FC<TapeOverlayProps> = ({
  children,
  vertical = false,
  className = "",
}) => {
  return (
    <div
      className={`tape-overlay ${vertical ? "tape-vertical" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

interface PosterFrameProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export const PosterFrame: React.FC<PosterFrameProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`poster-frame ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
};

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  withTape?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  className = "",
  withTape = false,
}) => {
  const content = (
    <h2 className={`section-heading ${className}`}>{children}</h2>
  );

  if (withTape) {
    return <TapeOverlay>{content}</TapeOverlay>;
  }

  return content;
};

interface QuoteCardProps {
  quote: string;
  author: string;
  discipline: string;
  onClick?: () => void;
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  discipline,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`quote-card ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      <blockquote className="body-text mb-4 italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer>
        <cite className="font-display text-lg font-semibold block">
          {author}
        </cite>
        <span className="body-text text-sm text-gray-600">{discipline}</span>
      </footer>
    </div>
  );
};
