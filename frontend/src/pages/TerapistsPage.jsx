import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategorySelector from "../components/General/CategorySelector";
import { selectUserByCategory, setSelectedUserCategory } from "../store/reducers/userSlice";
import TherapistCard from "../components/Terapist/TerpistCard";

function TerapistsPage() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const filteredTerapists = useSelector(state => selectUserByCategory(state, selectedCategory));

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    dispatch(setSelectedUserCategory(category));
  };

  return (
    <div className="p-4 lg:p-8">
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTerapists.length > 0 ? (
          filteredTerapists.map((therapist) => (
            <TherapistCard key={therapist.username} therapist={therapist} />
          ))
        ) : (
          <p>No therapists available</p>
        )}
      </div>
    </div>
  );
}

export default TerapistsPage;
