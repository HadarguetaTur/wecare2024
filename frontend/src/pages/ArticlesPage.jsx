import  { useState } from "react";
import ArticleCard from "../components/Article/ArticleCard";
import CategorySelector from "../components/General/CategorySelector";
import { selectPostsByCategory, setSelectedPostCategory } from "../store/reducers/postSlice";
import { useDispatch, useSelector } from "react-redux";

function ArticlesPage() {
  const dispatch = useDispatch();
  const filteredPosts = useSelector(selectPostsByCategory);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    dispatch(setSelectedPostCategory(category));
  };

  return (
    <div className="p-4 lg:p-8">
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <>
              <ArticleCard key={post._id} post={post} />
            </>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}

export default ArticlesPage;
