import Link from "next/link";

const Button = ({ 
  text, 
  href = "#",
  className = "", 
  icon: Icon 
}) => {
  return (
    <Link href={href} className={`${className}`}>
      {text}
      {Icon && <Icon className="w-4 h-4 transition-transform duration-500 hover:translate-x-3" />}
    </Link>
  );
};

export default Button;

