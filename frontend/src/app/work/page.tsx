import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work | Muneer Ali',
  description: 'Explore my projects and professional services in DevOps, cloud infrastructure, and software development.',
};

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-gradient">Work</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Projects I&apos;ve built and services I offer
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass rounded-xl p-8 card-hover">
            <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold">Project 1</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Coming soon - Portfolio showcase</p>
              </div>
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold">Project 2</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Coming soon - Portfolio showcase</p>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-xl p-8 card-hover">
            <h2 className="text-2xl font-semibold mb-6">Professional Services</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold">Cloud Infrastructure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">AWS, Docker, Kubernetes deployment</p>
              </div>
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold">CI/CD Pipelines</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automated deployment solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}