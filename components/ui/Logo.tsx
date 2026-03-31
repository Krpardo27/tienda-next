import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-40 h-40",
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        <Image
          src="/logo.svg"
          alt="Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}
