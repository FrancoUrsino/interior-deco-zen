import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

const ItemDetailHeader = ({ category }) => {
  return (
    <div className="flex flex-col gap-2 mt-20 mb-8">
      <Link
        href={`/${category}`}
        className="inline-flex text-2xl items-center gap-2 text-gray-600 hover:text-gray-400"
      >
        <IoIosArrowRoundBack className="w-6 h-6" />
        <span>Volver a {category}</span>
      </Link>
    </div>
  );
};

export default ItemDetailHeader;

