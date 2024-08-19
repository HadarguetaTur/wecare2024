/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function TherapistCard({ therapist }) {
    console.log(therapist);
  return (
    <div className="group relative border border-teal-500 hover:border-2 overflow-hidden rounded-lg transition-all">
      <div className="flex justify-center items-center overflow-hidden">
        <img
          src={therapist.photo}
          alt="therapist profile"
          className="h-[200px] w-full rounded-full object-cover group-hover:h-[180px] transition-all duration-300 z-20"
        />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">
          {therapist.username}
        </p>
        <span className="italic text-sm">{therapist.category}</span>
        <p className="text-sm line-clamp-3">{therapist.description}</p>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>Email:</span>
          <a
            href={`mailto:${therapist.email}`}
            className="text-teal-500 hover:underline"
          >
            {therapist.email}
          </a>
        </div>

        <Link
          to={`/therapist/${therapist._id}`}
          className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md mt-2"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
