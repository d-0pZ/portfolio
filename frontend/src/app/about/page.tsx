import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Muneer Ali',
  description: 'Learn more about my background, skills, and professional journey as a DevOps & Software Engineer.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover my journey, skills, and certifications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass rounded-xl p-6 card-hover">
            <h3 className="text-xl font-semibold mb-4">My Story</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Coming soon - My professional journey and background.
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 card-hover">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Coming soon - Technical expertise and tools.
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 card-hover">
            <h3 className="text-xl font-semibold mb-4">Certifications</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Coming soon - Professional credentials and achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}