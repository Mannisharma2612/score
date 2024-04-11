"use client";
import { Team } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SearchInput: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const router = useRouter();

  const teamListRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [currentIndex, setSelectedIndex] = useState(-1);
  const [showFilterBox, setShowFilterBox] = useState(false);

  const filteredTeams = useMemo(() => {
    return (teams || [])?.filter((team) => {
      return team?.team?.name?.toLowerCase()?.includes(input?.toLowerCase());
    });
  }, [input, teams]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSelectedIndex(-1);
    setShowFilterBox(true);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        let length = 0;
        if (filteredTeams.length > 10) {
          length = 10;
        } else {
          length = filteredTeams.length;
        }
        setSelectedIndex((prevIndex) =>
          prevIndex < length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === "Enter") {
        if (currentIndex !== -1) {
          const teamId = filteredTeams[currentIndex].team.id;
          router.push(`/team/${teamId}`);
          setInput("");
        }
      }
    },
    [currentIndex, filteredTeams, router]
  );

  const handleTeamItemClick = useCallback(() => {
    setInput("");
  }, []);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      teamListRef.current &&
      !teamListRef.current.contains(event.target as Node)
    ) {
      setShowFilterBox(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center w-full max-w-lg relative">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a team"
        className="bg-gray-100 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {input && filteredTeams.length > 0 && showFilterBox ? (
        <div
          ref={teamListRef}
          className="absolute top-full w-full bg-black/80
                  z-20 flex flex-col"
        >
          {filteredTeams.slice(0, 10).map((standing, i) => (
            <Link
              href={`/team/${standing.team.id}`}
              key={standing.team.id}
              className={`block w-full px-4 py-2 border rounded-md border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white" ${
                i === currentIndex ? "bg-neutral-100/40" : ""
              }`}
              onClick={() => handleTeamItemClick()}
            >
              {standing.team.name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
