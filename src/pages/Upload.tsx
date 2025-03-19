
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import UploadForm from "@/components/UploadForm";
import { Info } from "lucide-react";

const Upload = () => {
  useEffect(() => {
    // Set title
    document.title = "Upload Study Materials - StudySwap";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Upload Study Materials</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Share your notes, previous year papers, and other resources to help your junior students.
            </p>
          </div>
          
          <div className="mb-8 p-4 border rounded-lg bg-blue-50 text-blue-800 flex items-start">
            <Info className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium mb-1">Guidelines for uploading:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Make sure the content is accurate and well-organized</li>
                <li>Provide a clear, descriptive title and thorough description</li>
                <li>Only upload content you have the right to share</li>
                <li>PDF is the preferred format for documents</li>
                <li>Maximum file size is 50MB</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border shadow-sm p-6 sm:p-8">
            <UploadForm />
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary/80 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} StudySwap. Created for B.Tech Computer Science students.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Upload;
