"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingSection() {
  const [pageviews, setPageviews] = useState(100)
  const [price, setPrice] = useState(16)
  const [isYearly, setIsYearly] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Update price when pageviews or billing cycle changes
  useEffect(() => {
    const basePrice = calculatePrice(pageviews)
    setPrice(isYearly ? basePrice * 0.75 : basePrice)
  }, [pageviews, isYearly])

  // Calculate price based on pageviews
  const calculatePrice = (views: number) => {
    if (views <= 50) return 8
    if (views <= 100) return 16
    if (views <= 500) return 24
    if (views <= 1000) return 36
    return 48
  }

  // Format pageviews for display
  const formatPageviews = (views: number) => {
    if (views >= 1000) {
      return `${views / 1000}M`
    }
    return `${views}K`
  }

  // Handle slider change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setSliderValue(value)

    // Map slider value to pageviews
    if (value <= 20) setPageviews(10)
    else if (value <= 40) setPageviews(50)
    else if (value <= 60) setPageviews(100)
    else if (value <= 80) setPageviews(500)
    else setPageviews(1000)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors ${isDarkMode ? "dark bg-slate-900" : ""}`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/bg-pattern.svg"
          alt="Background pattern"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className={`rounded-full ${isDarkMode ? "bg-slate-800 text-white border-slate-700" : "bg-white text-slate-800"}`}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="max-w-3xl w-full mx-auto z-10">
        <div className="text-center mb-12 relative">
          {/* Pattern circles */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-10">
            <img
              src="pattern-circles.svg"
              alt="Pattern circles"
              className="w-36 h-36"
            />
          </div>

          <h1 className="text-[15px] md:text-4xl font-bold text-slate-800 dark:text-slate-800 mb-3 t-10S">
            Simple, traffic-based pricing
          </h1>
          <p className="text-slate-500 dark:text-slate-600">Sign-up for our 30-day trial. No credit card required.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-10">
            {/* Pageviews and price */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div className="uppercase text-sm font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-4 md:mb-0">
                {formatPageviews(pageviews)} PAGEVIEWS
              </div>
              <div className="flex items-baseline">
                <span className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
                  ${price.toFixed(2)}
                </span>
                <span className="text-slate-500 dark:text-slate-400 ml-2">/ month</span>
              </div>
            </div>

            {/* Custom Slider */}
            <div className="mb-10 relative">
              <div className="relative h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-cyan-300 rounded-full transition-all duration-200 ease-out active:shadow-cyan-400/50"
                style={{ width: `${sliderValue}%` }}
              ></div>
              </div>
              <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer z-10"
              />
              <div
              className="absolute top-0 w-10 h-10 bg-cyan-400 hover:bg-cyan-300
              rounded-full shadow-lg transform -translate-y-3.5 transition-all
              duration-200 ease-out cursor-grab active:cursor-grabbing
              active:scale-110 active:shadow-cyan-400/50 hover:shadow-xl
              flex items-center justify-center"
              style={{
                left: `calc(${sliderValue}% - 20px)`,
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
              }}
              >
              <img
                src="icon-slider.svg"
                alt="Slider handle"
                className="w-5 h-3 select-none pointer-events-none"
                draggable="false"
              />
              </div>
            </div>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <span className="text-sm text-slate-500 dark:text-slate-400">Monthly Billing</span>
              <div className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${isYearly ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' : 'bg-slate-200 dark:bg-slate-700'}`}>
              <div
                className={`${isYearly ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              ></div>
              <input type="checkbox" className="sr-only" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
              <span className="sr-only">Toggle yearly billing</span>
              <div
                className="absolute inset-0 cursor-pointer rounded-full"
                onClick={() => setIsYearly(!isYearly)}
              ></div>
              </div>
              <div className="flex items-center">
              <span className="text-sm text-slate-500 dark:text-slate-400">Yearly Billing</span>
              <span className="ml-2 text-xs font-medium bg-red-100 dark:bg-red-900 text-red-400 dark:text-red-300 px-2 py-0.5 rounded-full">
                25% discount
              </span>
              </div>
            </div>

            <hr className="my-8 border-slate-200 dark:border-slate-700" />

            {/* Features and CTA */}
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center mb-3">
                  <div className="mr-3">
                    <img
                      src="icon-check.svg"
                      alt="Check"
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Unlimited websites</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="mr-3">
                    <img
                      src="icon-check.svg"
                      alt="Check"
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">100% data ownership</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3">
                    <img
                      src="icon-check.svg"
                      alt="Check"
                      className="w-4 h-4"
                    />
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Email reports</span>
                </div>
              </div>

              <Button className="bg-slate-800 hover:bg-slate-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-8 py-3 rounded-full">
                Start my trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

