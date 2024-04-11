"use client";

import { AllFixtures, Standing } from "@/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FixturesByLeague from "./FixturesByLeague";
import { MdCancel } from "react-icons/md";
import { CiCircleMinus } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
type StandingsAndFixturesProps = {
  standingsData: Standing[];
  filteredFixtures: AllFixtures[];
};
const StandingsAndFixtures: React.FC<StandingsAndFixturesProps> = ({
  standingsData,
  filteredFixtures,
}) => {
  const menuItems = ["EPL", "La Liga", "BundesLiga", "Serie A", "Ligue 1"];
  const [activeTab, setActiveTab] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const tableItems = ["M", "W", "L", "D", "P", "GF", "GA", "GD"];

  const scrollToTab = (index: number) => {
    const container = menuRef.current;
    if (container) {
      const tab = container.children[index] as HTMLElement;
      tab?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    scrollToTab(index);
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey) {
        event.preventDefault();
      }
    };

    const container = menuRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col w-full max-w-7xl bg-gradient-to-br from-gray-800/75
                    to-gray-400/20 lg:flex-row"
    >
      <div className="flex justify-center items-center lg:w-3/5 md:p-10 py-5">
        <div
          className="flex flex-col justify-center items-center bg-gradient-to-b
                from-black/40 w-full text-neutral-100 rounded-3xl"
        >
          <div className="w-full flex flex-col justify-center items-center">
            <div className="p-2 font-bold">STANDING</div>
            <div className="flex justify-center w-full">
              {menuItems.map((a, i) => (
                <button
                  key={i}
                  className={`w-full p-4 md:text-base
                                        text-xs font-bold
                                        ${
                                          i === activeTab
                                            ? "text-neutral-100 border-x border-white"
                                            : "text-gray-700 bg-black/70"
                                        }`}
                  onClick={() => handleTabClick(i)}
                >
                  {a}
                </button>
              ))}
            </div>
            <div
              ref={menuRef}
              className="w-full flex overflow-x-hidden snap-x scrollbar-none
                                 scroll-smooth text-xs md:text-sm"
            >
              {standingsData.map((responseData, i) => (
                <div
                  key={responseData.league.id}
                  className="flex-shrink-0 w-full snap-center flex
                                        justify-center items-center"
                >
                  <div
                    className="flex flex-col justify-between p-2
                                        w-full"
                  >
                    <div className="flex w-full p-1">
                      <div className="w-1/12"></div>
                      <div className="w-3/12"></div>
                      <div className="w-6/12 flex justify-evenly">
                        {tableItems?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={`w-full text-center ${
                                item === "P" && "font-bold"
                              }`}
                            >
                              {item}
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-2/12 text-center">Last 5</div>
                    </div>
                    {responseData.league.standings[0].map((team, j) => (
                      <Link
                        href={`/team/${team.team.id}`}
                        key={j + team.team.name}
                        className={`flex w-full p-1 hover:bg-gray-400/50
                                                        ${
                                                          j % 2 === 0
                                                            ? "bg-black/40"
                                                            : ""
                                                        }`}
                      >
                        <div className="w-1/12 flex px-2 justify-center items-center">
                          {j + 1}
                        </div>
                        <div className="w-3/12 flex text-xs items-center">
                          {team.team.name}
                        </div>
                        <div className="w-6/12 flex justify-center items-center">
                          <div className="w-full text-center">
                            {team.all.played}
                          </div>
                          <div className="w-full text-center">
                            {team.all.win}
                          </div>
                          <div className="w-full text-center">
                            {team.all.draw}
                          </div>
                          <div className="w-full text-center">
                            {team.all.lose}
                          </div>
                          <div className="w-full text-center font-bold">
                            {team.points}
                          </div>
                          <div className="w-full text-center">
                            {team.all.goals.for}
                          </div>
                          <div className="w-full text-center">
                            {team.all.goals.against}
                          </div>
                          <div className="w-full text-center">
                            {team.goalsDiff}
                          </div>
                        </div>
                        <div className="w-2/12 flex justify-center items-center gap-1">
                          {team.form?.split("").map((char, i) => (
                            <div key={char + i}>
                              {char === "L" ? (
                                <MdCancel color="red" />
                              ) : char === "D" ? (
                                <CiCircleMinus color="gray" />
                              ) : (
                                <FaCircleCheck color="green" />
                              )}
                            </div>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center lg:w-2/5 pt-10 lg:pr-10 pb-10 lg:pl-0">
        <div
          className="flex flex-col justify-center items-center bg-gradient-to-b
                    from-black/40 w-full text-neutral-100 rounded-3xl h-full"
        >
          <div className="w-full flex flex-col justify-center items-center">
            <div className="p-2 font-bold">Upcoming Matches</div>
            <div className="flex flex-col w-full justify-center items-center pb-5 overflow-hidden">
              {menuItems.map((leagueName, i) => {
                return (
                  activeTab === i &&
                  filteredFixtures.map((league, j) => {
                    if (league.name === leagueName) {
                      return (
                        <FixturesByLeague
                          fixturesData={league.fixtures}
                          key={league.name + j}
                        />
                      );
                    }
                  })
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsAndFixtures;
