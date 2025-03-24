import Forms from "./components/forms";
import InfoBox from "./components/info-box";
import Starfield from "./components/starfield";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col bg-black">
      <div className="relative w-full flex-1 flex flex-col">
        <Starfield />

        <div className="w-full h-full flex-1 grid place-items-center p-6 z-20">
          <div className="max-w-[400px] w-full bg-white rounded-3xl p-6 grid grid-cols-1 grid-rows-[1fr_160px] gap-12 md:max-w-[800px] md:grid-cols-2 md:grid-rows-1">
            <Forms />

            <InfoBox />
          </div>
        </div>
      </div>
    </main>
  );
}
