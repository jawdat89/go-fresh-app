// src/components/LikeIncremental.tsx
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "@/app/hooks/useDispatch"; // Ensure this is the correctly typed custom hook.
import {
  incrementLike,
  incrementLikesAsync,
  selectIsIncremented,
  selectLikesCount,
} from "@/app/redux/features/menuItems/menuItemsSlice";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface LikeIncrementalProps {
  itemId: string;
}

export default function LikeIncremental({ itemId }: LikeIncrementalProps) {
  const dispatch = useDispatch();

  const likes = useSelector(
    (state: RootState) => selectLikesCount(state)[itemId] || 0
  );
  const isIncremented = useSelector(
    (state: RootState) => selectIsIncremented(state)[itemId] || false
  );

  const likesValue = useMemo(() => {
    if (likes === 0) {
      return " ";
    } else if (likes > 999) {
      return `${(likes / 1000).toFixed(1)}K`;
    } else {
      return likes;
    }
  }, [likes]);

  const handleLike = () => {
    if (!isIncremented) {
      // local state update
      dispatch(incrementLike(itemId));
      // async increment to update the server
      dispatch(incrementLikesAsync(itemId));
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isIncremented}
      style={{ border: "none", background: "none" }}
      className="flex items-center gap-2"
    >
      {isIncremented ? (
        <GoHeartFill size={24} fill="var(--primary-darker)" />
      ) : (
        <GoHeart size={24} fill="var(--primary-darker)" />
      )}
      <span className="text-lg">{likesValue}</span>
    </button>
  );
}
