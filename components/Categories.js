import Link from 'next/link';
import Image from 'next/image';

const Categories = ({ categories }) => {
  return (
    <section className="py-2 sm:py-2 md:py-2 lg:py-2 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.categoryname.toLowerCase().replace(/\s+/g, '-')}`}
              className="group block text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Category Image */}
              <div className="relative mb-3 sm:mb-4 md:mb-6">
                <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-50">
                  <Image
                    src={category.categorythumbnail}
                    alt={category.categoryname}
                    fill
                    className="object-contain p-2 sm:p-4 md:p-6 group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
              </div>

              {/* Category Name */}
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors duration-300">
                {category.categoryname}
              </h3>

              {/* Decorative Line */}
              <div className="w-8 sm:w-12 md:w-16 h-0.5 bg-gray-300 group-hover:bg-amber-500 mx-auto mt-2 sm:mt-3 md:mt-4 transition-colors duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 