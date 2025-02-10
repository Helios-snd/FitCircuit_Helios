"use client"
import Link from "next/link";
import { Dumbbell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function PageHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2 pl-3">
          <Dumbbell className="xh-6 w-6 text-[#4CAF50]" />
          <span className="font-bold">FitCircuit</span>
        </Link>
        <nav className="flex items-center space-x-6 ml-6">
          <Link href="/workout-plans" className="text-sm font-medium transition-colors hover:text-[#4CAF50]">
            Workout Plans
          </Link>

          {/* Diet Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-sm font-medium transition-colors hover:text-[#4CAF50]"
            >
              Diet <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white/80 backdrop-blur-md shadow-md rounded-lg border border-gray-200">
                <Link
                  href="/meal-plans/customize"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200/50"
                >
                  Meal Plans
                </Link>
                <Link
                  href="/food-analysis"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200/50"
                >
                  Food Analysis
                </Link>
                <Link
                  href="/nutrition"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200/50"
                >
                  Nutrition
                </Link>
              </div>
            )}
          </div>
        </nav>
        <div className="ml-auto flex items-center space-x-4 ">  
          <Button className="bg-[#4CAF50] hover:bg-[#45a049]" variant="ghost" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button className="bg-[#4CAF50] hover:bg-[#45a049] hidden sm:block" asChild>
            <Link href="/auth/login?tab=register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
