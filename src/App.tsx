import Pipeline from "./components/Pipeline";

function App() {
  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Upcoming Open Source AI Models
        </h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Track anticipated and upcoming open-source AI model releases.
          Confidence-rated, community-sourced, always evolving.
        </p>
      </div>
      <Pipeline />
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
        <p>
          Open source &middot; Data from public announcements, leaks &amp;
          community intel &middot;{" "}
          <a
            href="https://github.com/0xsachi/ai-model-pipeline"
            className="text-gray-500 hover:text-gray-300 underline"
          >
            Contribute on GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}

export default App;
