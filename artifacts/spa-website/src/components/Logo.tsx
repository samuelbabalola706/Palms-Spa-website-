type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 40, className }: LogoProps) {
  return (
    <img
      src="/images/logo-icon.webp"
      alt="Harmony Palms Wellness Spa"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, display: "block", borderRadius: "50%" }}
    />
  );
}
