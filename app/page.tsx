import StandingsAndFixtures from "./components/main/StandingsAndFixtures";
import getFixturesForLeagues from "./utils/getFixturesForLeagues";
import { getStandings } from "./utils/getStandings";

export default async function Home() {
  const standingsData = await getStandings();
  const fixtures = await getFixturesForLeagues();
  return (
    <div className="flex flex-col md:p-10 items-center justify-center w-full">
      <StandingsAndFixtures
        standingsData={standingsData}
        filteredFixtures={fixtures}
      />
    </div>
  );
}
