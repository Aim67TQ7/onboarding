import React, { useState, useEffect } from "react";
import { Resource, Department } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Download, 
  Search,
  BookOpen,
  Shield,
  Users,
  Settings
} from "lucide-react";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, selectedDepartment, selectedCategory]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const resourcesData = await Resource.list('-created_date');
      const departmentsData = await Department.list();
      
      setResources(resourcesData);
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error loading resources:", error);
    }
    setIsLoading(false);
  };

  const filterResources = () => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== "all") {
      filtered = filtered.filter(resource => resource.department_id === selectedDepartment);
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    setFilteredResources(filtered);
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('video')) return Video;
    if (fileType?.includes('pdf') || fileType?.includes('document')) return FileText;
    return LinkIcon;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'policies': return Shield;
      case 'forms': return FileText;
      case 'videos': return Video;
      case 'training': return BookOpen;
      case 'guides': return BookOpen;
      default: return FileText;
    }
  };

  const categoryColors = {
    policies: "bg-red-100 text-red-800 border-red-200",
    forms: "bg-blue-100 text-blue-800 border-blue-200",
    videos: "bg-purple-100 text-purple-800 border-purple-200",
    training: "bg-green-100 text-green-800 border-green-200",
    guides: "bg-yellow-100 text-yellow-800 border-yellow-200",
    other: "bg-gray-100 text-gray-800 border-gray-200"
  };

  return (
    <div className="neumorphic-container min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="neumorphic-card p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resource Library</h1>
          <p className="text-gray-600">Access all the documents, videos, and resources you need for your onboarding</p>
        </div>

        {/* Search and Filters */}
        <div className="neumorphic-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 neumorphic-pressed border-none bg-gray-50"
              />
            </div>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="neumorphic-pressed border-none bg-gray-50 rounded-lg px-3 py-2"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="neumorphic-pressed border-none bg-gray-50 rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              <option value="policies">Policies</option>
              <option value="forms">Forms</option>
              <option value="videos">Videos</option>
              <option value="training">Training</option>
              <option value="guides">Guides</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const FileIcon = getFileIcon(resource.file_type);
            const CategoryIcon = getCategoryIcon(resource.category);
            const department = departments.find(d => d.id === resource.department_id);

            return (
              <div key={resource.id} className="neumorphic-card p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <FileIcon className="w-6 h-6 text-white" />
                  </div>
                  {resource.is_required && (
                    <Badge className="bg-red-100 text-red-800 border-red-200 border">
                      Required
                    </Badge>
                  )}
                </div>

                <h3 className="font-semibold text-gray-800 text-lg mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={`${categoryColors[resource.category]} border flex items-center gap-1`}>
                    <CategoryIcon className="w-3 h-3" />
                    {resource.category}
                  </Badge>
                  {department && (
                    <Badge variant="outline" className="border-gray-200">
                      {department.name}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="neumorphic-button flex-1 border-none"
                    onClick={() => window.open(resource.file_url, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && !isLoading && (
          <div className="neumorphic-card p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}