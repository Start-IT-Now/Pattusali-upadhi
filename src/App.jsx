import { useState, useEffect } from 'react';
import { Briefcase, Search } from 'lucide-react';
import { supabase } from './lib/supabase.js';
import JobCard from './components/JobCard.jsx';
import JobPostForm from './components/JobPostForm.jsx';
import Footer from './components/Footer.jsx';
import puv from './puv.png';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <header className="bg-white shadow-sm border-b-2 border-brown-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
 <img
          src={puv}
          alt="Pattusalli Upadi Vedika Logo"
          className="h-16 md:h-20 lg:h-24"
        />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Pattusali Upadhi Vedhika</h1>
                <p className="text-sm text-sky-600">Find your dream job today</p>
              </div>
            </div>
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="bg-[#cc654d] text-white rounded-full px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              {showPostForm ? 'View Jobs' : 'Post a Job'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showPostForm ? (
          <JobPostForm onJobPosted={() => { fetchJobs(); setShowPostForm(false); }} />
        ) : (
          <>
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by job title, company, location, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm ? `Search Results (${filteredJobs.length})` : `All Jobs (${jobs.length})`}
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search terms' : 'Be the first to post a job!'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
          <div className="mt-8 ml-1 w-full">
            <Footer />
          </div>
    </div>
  );
}

export default App;
