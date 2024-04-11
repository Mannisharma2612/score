import getFixtureByID from "@/app/utils/getFixturesByID";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import LocalTime from "@/app/components/sub/LocalTime";
type MatchProps = {
  params: {
    id: string;
  };
};
const Match = async ({ params }: MatchProps) => {
  const fixture = await getFixtureByID(parseInt(params.id));
  if (!fixture) {
    return (
      <div className="flex w-full justify-center items-center py-5">
        <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
          No Fixture Info Available
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-center items-center py-10 md:p-10 text-neutral-100">
      <div className="flex w-full max-w-7xl items-center justify-center perspective pb-10 md:pb-20">
        <div className="w-1/3 flex justify-center rounded-full animate-logo-pop-left logo-shadow">
          <Link href={`../team/${fixture?.teams?.home?.id}`}>
            <Image
              src={fixture?.teams?.home?.logo}
              alt="HomeLogoMatch"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="w-1/3 flex justify-center items-center flex-col h-56">
          <div className="h-1/5 flex justify-center items-center text-sm md:text-xl text-center">
            <LocalTime fixture={fixture} />
          </div>
          <div className="h-3/5 flex justify-center items-center md:text-5xl text-2xl">
            <div className="flex flex-col justify-center items-center">
              {fixture?.score?.fulltime?.home}
              {fixture?.score?.penalty?.home !== null ? (
                <div className="flex flex-col justify-center items-center text-sm">
                  <div>(et. ) {fixture?.score?.extratime?.home}</div>
                  <div>(pen. ) {fixture?.score?.penalty?.home}</div>
                </div>
              ) : fixture?.score?.extratime?.home !== null ? (
                <div className="text-sm">
                  (et. ) {fixture?.score?.extratime?.home}
                </div>
              ) : null}
            </div>
            <div>-</div>
            <div className="flex flex-col justify-center items-center">
              {fixture?.score?.fulltime?.away}
              {fixture?.score?.penalty?.away !== null ? (
                <div className="flex flex-col justify-center items-center text-sm">
                  <div>(et. ) {fixture?.score?.extratime?.away}</div>
                  <div>(pen. ) {fixture?.score?.penalty?.away}</div>
                </div>
              ) : fixture?.score?.extratime?.away !== null ? (
                <div className="text-sm">
                  (et. ) {fixture?.score?.extratime?.away}
                </div>
              ) : null}
            </div>
          </div>
          <div className="h-1/5 flex justify-center items-center"></div>
        </div>
        <div className="w-1/3 flex justify-center rounded-full animate-logo-pop-right logo-shadow">
          <Link href={`../team/${fixture?.teams?.away?.id}`}>
            <Image
              src={fixture?.teams?.away?.logo}
              alt="AwayLogoMatch"
              width={200}
              height={200}
            />
          </Link>
        </div>
      </div>
      <div
        className="flex flex-col w-full justify-center items-center py-5 md:p-10
            bg-gradient-to-b from-gray-800/40 to-gray-800/10"
      >
        <div className="flex flex-col justify-center items-center py-2">
          <div>{fixture?.league?.name}</div>
          <div>{fixture?.league?.round}</div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-col w-1/2 justify-center items-center p-1">
            <div className="text-xl md:text-2xl text-center">
              {fixture?.teams?.home?.name}
            </div>
          </div>
          <div className="flex flex-col w-1/2 justify-center items-center p-1">
            <div className="text-xl md:text-2xl text-center">
              {fixture?.teams?.away?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;
