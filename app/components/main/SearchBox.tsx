import Link from "next/link";
import React from "react";
import { BiFootball } from "react-icons/bi";
import getTeams from "../../utils/getTeams";
import { useRouter } from "next/router";
import SearchInput from "../sub/SearchInput";

const SearchBox: React.FC = async () => {
  const teams = await getTeams();

  return (
    <div className="flex items-center justify-center w-full p-3 bg-gray-600">
      <div className="flex items-center justify-center w-1/6 text-neutral-100">
        <Link href="/" className="flex items-center justify-center">
          <BiFootball color="white" size={30} />
        </Link>
      </div>
      <div className="flex w-4/6 items-center justify-center">
        <SearchInput teams={teams} />
      </div>
    </div>
  );
};

export default SearchBox;
