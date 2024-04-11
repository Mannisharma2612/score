import getFixturesByTeamId from "@/app/utils/getFixturesByTeamID";
import getTeamInfoByTeamId from "@/app/utils/getTeamInfoByID";
import type { Fixture, Team } from "@/types";
import Image from "next/image";
import Fixtures from "./components/TeamFixtures";
import { CiCircleMinus } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Team({ params }: PageProps) {
  let teamInfo: Team | undefined = await getTeamInfoByTeamId(
    parseInt(params.id)
  );
  let fixturesByTeamId: Fixture[] = await getFixturesByTeamId(
    parseInt(params.id)
  );

  if (!teamInfo) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          Team Info Not Available
        </div>
      </div>
    );
  }

  return (
    <div className="flex  justify-center items-center text-neutral-100 py-5">
      <div
        style={{ height: "100vh" }}
        className="flex flex-col max-w-7xl p-5 w-full md:flex-row"
      >
        <div
          className="flex flex-col md:w-1/3 justify-center items-center
                bg-gradient-to-r from-black/60 to-gray-800/80 h-[500px]"
        >
          <Image
            src={teamInfo.team.logo}
            alt="TeamLogo"
            width={150}
            height={150}
            className="p-3"
          />
          <div className="text-2xl">{teamInfo.team.name}</div>
          <div className="flex justify-center items-center w-full">
            <div className="w-1/3 text-center text-2xl">#{teamInfo.rank}</div>
            <div className="w-1/3 text-center">{teamInfo.group}</div>
            <div className="w-1/3 flex flex-col justify-center items-center">
              <div className="text-center">Form</div>
              <div className="w-2/12 flex justify-center items-center gap-1">
                {teamInfo.form?.split("").map((char, i) => (
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
            </div>
          </div>
          <div className="flex flex-col w-full p-2 mt-10">
            <div className="flex w-full justify-center items-center text-xl">
              <div className="w-full text-center font-bold">P</div>
              <div className="w-full text-center">M</div>
              <div className="w-full text-center">W</div>
              <div className="w-full text-center">D</div>
              <div className="w-full text-center">L</div>
              <div className="w-full text-center">GF</div>
              <div className="w-full text-center">GA</div>
              <div className="w-full text-center">GD</div>
            </div>
            <div className="flex w-full justify-center items-center text-xl">
              <div className="w-full text-center font-bold">
                {teamInfo.points}
              </div>
              <div className="w-full text-center">{teamInfo.all.played}</div>
              <div className="w-full text-center">{teamInfo.all.win}</div>
              <div className="w-full text-center">{teamInfo.all.draw}</div>
              <div className="w-full text-center">{teamInfo.all.lose}</div>
              <div className="w-full text-center">{teamInfo.all.goals.for}</div>
              <div className="w-full text-center">
                {teamInfo.all.goals.against}
              </div>
              <div className="w-full text-center">{teamInfo.goalsDiff}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-2/3 justify-center items-center">
          <Fixtures
            fixturesByTeamId={fixturesByTeamId}
            teamId={parseInt(params.id)}
          />
        </div>
      </div>
    </div>
  );
}
