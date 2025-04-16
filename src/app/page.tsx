export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm lg:flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold text-center">
          SaaS Landing Page Generator
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mt-6">
          Subheadline
        </h2>
        <p className="text-base text-gray-500 text-center max-w-xl">
          Build and deploy beautiful landing pages in seconds with AI-powered templates and one-click integrations.
        </p>

        <h3 className="text-lg font-semibold mt-8">Feature Descriptions</h3>
        <ul className="list-disc text-gray-600 pl-5 text-left">
          <li>Drag & drop builder</li>
          <li>Mobile-responsive out of the box</li>
          <li>AI-generated content suggestions</li>
        </ul>
      </div>
    </main>
  );
}