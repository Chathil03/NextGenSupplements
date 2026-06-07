"use client";

import { useState } from "react";

const categories = [
  { label: "Muscle Growth", active: true },
  { label: "Post-Workout", active: false },
  { label: "Pre-Workout", active: false },
  { label: "Daily Health", active: false },
];

const goals = ["Endurance", "Strength"];

export default function ShopSidebar() {
  const [activeCategory, setActiveCategory] = useState("Muscle Growth");
  const [checkedGoals, setCheckedGoals] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setCheckedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="sticky top-32">
        {/* Categories */}
        <div className="mb-8">
          <h3 className="font-label-bold text-label-bold uppercase tracking-widest mb-6 text-on-surface">
            Categories
          </h3>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.label}>
                {activeCategory === cat.label ? (
                  <button
                    onClick={() => setActiveCategory(cat.label)}
                    className="flex items-center gap-2 font-label-bold text-label-bold text-primary"
                  >
                    <span className="w-1 h-4 bg-primary" />
                    {cat.label}
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveCategory(cat.label)}
                    className="flex items-center gap-2 font-body-md text-body-md text-secondary hover:text-on-surface transition-colors"
                  >
                    {cat.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h3 className="font-label-bold text-label-bold uppercase tracking-widest mb-6 text-on-surface">
            Filter By
          </h3>
          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <span className="font-label-sm text-label-sm uppercase text-secondary mb-3 block">
                Price Range
              </span>
              <input
                type="range"
                min={20}
                max={150}
                className="w-full h-1 bg-surface-container-highest appearance-none accent-primary rounded-full cursor-pointer"
              />
              <div className="flex justify-between mt-2 font-label-sm text-label-sm text-secondary">
                <span>$20</span>
                <span>$150</span>
              </div>
            </div>

            {/* Goal Checkboxes */}
            <div className="border-t border-outline-variant pt-6">
              <span className="font-label-sm text-label-sm uppercase text-secondary mb-3 block">
                Goal
              </span>
              <div className="space-y-2">
                {goals.map((goal) => (
                  <label
                    key={goal}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checkedGoals.includes(goal)}
                      onChange={() => toggleGoal(goal)}
                      className="w-4 h-4 rounded-sm border-outline text-primary focus:ring-primary"
                    />
                    <span className="font-body-md text-body-md group-hover:text-primary">
                      {goal}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
