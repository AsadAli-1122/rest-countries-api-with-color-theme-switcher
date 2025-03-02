import { redirect } from "next/navigation";
import data from "@/data/data.json";
// import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
  
interface Country {
  flag: string;
  name: string;
  nativeName: string;
  topLevelDomain: string[];
  population: number;
  region: string;
  capital?: string;
  subregion: string;
  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1?: string;
    iso639_2: string;
    name: string;
    nativeName?: string;
  }[];
  borders?: string[];
}

export default async function CountryDetails({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    
    const slug = (await params).slug

  const country: Country | undefined = data.find(
    (c) => c.name === decodeURIComponent(slug)
  );

  if (!country) return redirect("/");

  interface PropertyProps {
    label: string;
    value: string | number | undefined;
    col?: "1" | "2";
  }

  const Property: React.FC<PropertyProps> = ({ label, value, col = "1" }) => {
    if (!value) return null;
    return (
      <p className={`text-gray-400 dark:text-gray-300 sm:col-span-${col}`}>
        <span className="font-semibold">{label}</span>{" "}
        <span className="font-light">{value}</span>
      </p>
    );
  };

  return (
    <>
      {/* <Header /> */}
      <div className="max-w-5xl mx-auto px-4 lg:px-0 py-6">
        <Link
          href="/"
          className="dark:bg-gray-600 dark:hover:bg-gray-900 cursor-pointer duration-200 ease-in-out w-fit flex items-center gap-2 py-2 px-6 rounded-md dark:text-gray-300 shadow-sm shadow-gray-950/20 bg-gray-200 hover:bg-gray-300"
        >
          Back
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 py-6 gap-8">
          <Image
            width={500}
            height={500}
            src={country.flag}
            alt={`${country.name} flag`}
            className="w-full h-auto object-cover rounded-lg shadow-sm shadow-gray-950/20"
          />
          <div className="grid  sm:grid-cols-2 h-min my-auto py-6 gap-2">
            <h1 className="text-4xl font-semibold sm:col-span-2">
              {country.name}
            </h1>
            <Property label="Native Name:" value={country.nativeName} />
            <Property
              label="Top Level Domain:"
              value={country.topLevelDomain?.join(", ")}
            />
            <Property label="Population:" value={country.population} />
            <Property
              label="Currencies:"
              value={country.currencies
                ?.map((currency) => `${currency.name} (${currency.symbol})`)
                .join(", ")}
            />
            <Property label="Region:" value={country.region} />
            <Property
              label="Languages:"
              value={country.languages?.map((lang) => lang.name).join(", ")}
            />
            <Property label="Sub Region:" value={country.subregion} col="2" />
            <Property label="Capital:" value={country.capital} />

            {country.borders && 
            <div className={`text-gray-400 dark:text-gray-300 sm:col-span-2 flex flex-col sm:flex-row space-x-4 `}>
              <p className="font-semibold text-nowrap py-2">Border Countries</p>{" "}
              <div className="flex flex-wrap gap-2">
              {country.borders?.map((name) => (
                <span key={name} className="flex items-center gap-2 py-2 px-6 rounded-md bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-gray-700 w-fit shadow-sm shadow-gray-950/20">
                  {name}
                </span>
              ))}
              </div>
            </div>
            }
          </div>
        </div>
      </div>
      {/* <div className="attribution mt-8">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <Link href="https://codebyasad.vercel.app/">Asad Ali</Link>.
      </div> */}
    </>
  );
}