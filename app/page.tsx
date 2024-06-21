import LocationAggregatorMap from "@/components/Map";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="text-center px-14">
        <h1 className="text-5xl mb-2">Geo-Tech</h1>
        <p className="text-2xl">Website Berbasis Bank Data dengan Metode Pendekatan untuk Variabel Konsistensi Tanah di Kec. Gubeng Surabaya </p>
      </div>
      <div>
      <div className="relative min-h-[80vh] max-w-[95vw] mx-auto my-10 rounded-3xl overflow-hidden">
        <LocationAggregatorMap />
      </div>
      </div>
    </main>
  );
}
