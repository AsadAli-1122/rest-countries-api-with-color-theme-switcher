"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import data from "@/data/data.json";
import Link from "next/link";

const itemsPerPage = 8;

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique regions
  const regions = useMemo(() => {
    const uniqueRegions = Array.from(new Set(data.map((c) => c.region)));
    return ["All", ...uniqueRegions];
  }, []);

  // Filter data based on search and selected region
  const filteredData = useMemo(() => {
    return data
      .filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((country) =>
        selectedRegion === "All" ? true : country.region === selectedRegion
      );
  }, [search, selectedRegion]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  useEffect(()=>{
    setCurrentPage(1);
  },[search, selectedRegion])

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 px-4 lg:px-0 py-6 sm:grid-cols-2">
        {/* Search Input */}
        <label className="bg-gray-200 dark:bg-gray-900 px-4 py-2 rounded-sm flex space-x-2 cursor-text duration-200 ease-in-out w-full sm:max-w-64 sm:mr-auto">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 0 1 5.293 13.707l4.5 4.5a1 1 0 0 1-1.414 1.414l-4.5-4.5A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 4.243 10.243A6 6 0 0 0 10 4z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search for a country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-gray-700 dark:placeholder:text-gray-400 dark:text-gray-400 focus:outline-none"
          />
        </label>

        {/* Region Filter */}
        <div className="relative ml-auto w-full sm:max-w-64">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 rounded-sm py-2 px-4 flex justify-between items-center focus:outline-none cursor-pointer"
          >
            {selectedRegion}
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md max-h-40 overflow-y-auto">
              {regions.map((region) => (
                <li
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition duration-200"
                >
                  {region}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Countries List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 lg:px-0 w-full max-w-5xl mx-auto">
        {paginatedData.map((country) => (
          <div
            key={country.name}
            className="bg-white rounded-lg shadow-sm dark:bg-gray-700/50"
          >
            <Link href={`/country/${encodeURIComponent(country.name)}`}>
              <img
                className="rounded-t-lg aspect-video object-center object-cover"
                src={country.flag}
                alt={`${country.name} flag`}
              />
            </Link>
            <div className="p-5">
              <Link href={`/country/${encodeURIComponent(country.name)}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {country.name}
                </h5>
              </Link>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Population:</span>{" "}
                <span className="font-light">{country.population}</span>
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Region:</span>{" "}
                <span className="font-light">{country.region}</span>
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Capital:</span>{" "}
                <span className="font-light">{country.capital}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 my-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded cursor-pointer ${
            currentPage === 1
              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-950 text-white"
          }`}
        >
          Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded cursor-pointer ${
            currentPage === totalPages
              ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
              : "bg-gray-500 hover:bg-gray-950 text-white"
          }`}
        >
          Next
        </button>
      </div>

      <div className="attribution mt-8">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <Link href="https://codebyasad.vercel.app/">Asad Ali</Link>.
      </div>
    </>
  );
}
