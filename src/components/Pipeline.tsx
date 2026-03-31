import { useState, useMemo } from "react";
import { models, type Confidence } from "../data/models";

const confidenceColors: Record<Confidence, string> = {
  confirmed: "bg-green-500/20 text-green-300 border-green-500/30",
  leaked: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  rumor: "bg-red-500/20 text-red-300 border-red-500/30",
};

const confidenceLabels: Record<Confidence, string> = {
  confirmed: "Confirmed",
  leaked: "Leaked",
  rumor: "Rumor",
};

type SortKey = "releaseSortKey" | "name" | "org" | "confidence" | "lastUpdated";
type SortDir = "asc" | "desc";

const confidenceOrder: Record<Confidence, number> = {
  confirmed: 0,
  leaked: 1,
  rumor: 2,
};

export default function Pipeline() {
  const [sortKey, setSortKey] = useState<SortKey>("releaseSortKey");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [search, setSearch] = useState("");
  const [confidenceFilter, setConfidenceFilter] = useState<string>("all");
  const [orgFilter, setOrgFilter] = useState<string>("all");

  const organizations = useMemo(
    () => Array.from(new Set(models.map((m) => m.org))).sort(),
    []
  );

  const sorted = useMemo(() => {
    const q = search.toLowerCase();
    let filtered = models.filter((m) => {
      const matchesText =
        m.name.toLowerCase().includes(q) ||
        m.org.toLowerCase().includes(q) ||
        (m.notes?.toLowerCase().includes(q) ?? false);
      const matchesConfidence =
        confidenceFilter === "all" || m.confidence === confidenceFilter;
      const matchesOrg = orgFilter === "all" || m.org === orgFilter;
      return matchesText && matchesConfidence && matchesOrg;
    });

    return filtered.sort((a, b) => {
      let av: string | number;
      let bv: string | number;

      if (sortKey === "confidence") {
        av = confidenceOrder[a.confidence];
        bv = confidenceOrder[b.confidence];
      } else {
        av = a[sortKey];
        bv = b[sortKey];
      }

      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc"
        ? (av as number) - (bv as number)
        : (bv as number) - (av as number);
    });
  }, [sortKey, sortDir, search, confidenceFilter, orgFilter]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "releaseSortKey" || key === "lastUpdated" ? "asc" : "asc");
    }
  }

  function arrow(key: SortKey) {
    if (sortKey !== key) return null;
    return <span className="ml-1">{sortDir === "asc" ? "\u2191" : "\u2193"}</span>;
  }

  const thClass =
    "px-3 py-3 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-gray-200 transition-colors whitespace-nowrap text-left text-gray-400";

  return (
    <div>
      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
          <span className="text-gray-500">Tracked:</span>{" "}
          <span className="text-white font-semibold">{models.length}</span>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
          <span className="text-gray-500">Confirmed:</span>{" "}
          <span className="text-green-400 font-semibold">
            {models.filter((m) => m.confidence === "confirmed").length}
          </span>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
          <span className="text-gray-500">Leaked:</span>{" "}
          <span className="text-amber-400 font-semibold">
            {models.filter((m) => m.confidence === "leaked").length}
          </span>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
          <span className="text-gray-500">Rumor:</span>{" "}
          <span className="text-red-400 font-semibold">
            {models.filter((m) => m.confidence === "rumor").length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search models, orgs, or notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 text-gray-100 placeholder-gray-500"
        />
        <select
          value={confidenceFilter}
          onChange={(e) => setConfidenceFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
        >
          <option value="all">All Confidence</option>
          <option value="confirmed">Confirmed</option>
          <option value="leaked">Leaked</option>
          <option value="rumor">Rumor</option>
        </select>
        <select
          value={orgFilter}
          onChange={(e) => setOrgFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
        >
          <option value="all">All Organizations</option>
          {organizations.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-800">
              <th className={thClass} onClick={() => handleSort("name")}>
                Model{arrow("name")}
              </th>
              <th className={thClass} onClick={() => handleSort("org")}>
                Org{arrow("org")}
              </th>
              <th className={thClass} onClick={() => handleSort("releaseSortKey")}>
                Release Window{arrow("releaseSortKey")}
              </th>
              <th className={thClass} onClick={() => handleSort("confidence")}>
                Confidence{arrow("confidence")}
              </th>
              <th className={thClass + " cursor-default hover:text-gray-400"} style={{ cursor: "default" }}>
                Source
              </th>
              <th className={thClass} onClick={() => handleSort("lastUpdated")}>
                Last Updated{arrow("lastUpdated")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((model, i) => (
              <tr
                key={model.name}
                className={`border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors ${
                  i % 2 === 0 ? "bg-gray-950" : "bg-gray-900/30"
                }`}
                title={model.notes}
              >
                <td className="px-3 py-3 font-medium text-white whitespace-nowrap">
                  {model.name}
                </td>
                <td className="px-3 py-3 text-gray-300">{model.org}</td>
                <td className="px-3 py-3 text-gray-300 font-mono text-xs">
                  {model.releaseWindow}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full border ${confidenceColors[model.confidence]}`}
                  >
                    {confidenceLabels[model.confidence]}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <a
                    href={model.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline text-xs"
                  >
                    {model.sourceLabel}
                  </a>
                </td>
                <td className="px-3 py-3 text-gray-400 font-mono text-xs">
                  {model.lastUpdated}
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No models match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-gray-600">
        {sorted.length} model{sorted.length !== 1 ? "s" : ""} shown &middot;
        Click column headers to sort &middot; Hover rows for notes &middot;
        Data sourced from public announcements, leaks, and community intel
      </p>
    </div>
  );
}
