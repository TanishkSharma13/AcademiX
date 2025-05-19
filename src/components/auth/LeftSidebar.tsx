
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const LeftSidebar = () => {
  return (
    <div className="md:w-1/2 bg-primary p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462536943532-57a629f6cc60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="relative z-10 text-white max-w-md mx-auto">
        <Link to="/" className="inline-flex items-center space-x-2 group mb-12">
          <BookOpen className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-200" />
          <span className="font-bold text-2xl">AcademiX</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Welcome to AcademiX
        </h1>
        <p className="text-lg opacity-90 mb-8">
          Access and share study materials with our academic community. Join us to elevate your learning experience.
        </p>
        <p className="text-xl font-semibold mb-4">A mix of academics and rewards</p>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
            <p className="opacity-90">Access notes and papers for B.Tech CS</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <p className="opacity-90">Connect with seniors and juniors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
