import Forms from "./components/forms";
import InfoBox from "./components/info-box";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[url(/astro-bg.png)] bg-cover bg-center">
      <div className="w-full h-full flex-1 grid place-items-center p-6 z-20">
        <div className="max-w-[400px] w-full bg-white rounded-3xl p-6 grid grid-cols-1 grid-rows-[1fr_auto] gap-12 md:max-w-[800px] md:grid-cols-2 md:grid-rows-1">
          <Forms />

          <InfoBox />
        </div>
      </div>
    </main>
  );
}
