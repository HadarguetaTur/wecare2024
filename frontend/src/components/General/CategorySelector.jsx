/* eslint-disable react/prop-types */

import categories from "../../utils/staticData";

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
    return (
      <div className=" no-scrollbar px-4 w-full mx-auto max-w-7xl flex overflow-x-auto space-x-4 py-4">
        {categories.map((category) => (
          <div
            key={category.value}
            onClick={() => onSelectCategory(category.value)}
            className={`flex flex-col items-center justify-center gap-2  p-3 rounded-full border-b-2 hover:text-neutral-800 transition cursor-pointer ${
              selectedCategory === category.value
                ? " border-b-neutral-800 text-neutral-800"
                : "border-transparent text-neutral-500"
            }`}
          >
            <i className={`fa ${category.icon} text-xl`} />
            <span className="text-center">{category.label}</span>
          </div>
        ))}
      </div>
    );
  };

export default CategorySelector;
