import React, { useState, useEffect } from "react";
import { OnboardingTask, NewHire, Department, Resource } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Users, 
  CheckSquare, 
  BookOpen, 
  Building, 
  Plus,
  Settings,
  BarChart3
} from "lucide-react";

export default function Admin() {
  const [stats, setStats] = useState({
    totalNewHires: 0,
    activeTasks: 0,
    totalResources: 0,
    departments: 0
  });
  const [newHires, setNewHires] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [newHiresData, tasksData, resourcesData, departmentsData] = await Promise.all([
        NewHire.list('-created_date'),
        OnboardingTask.list('-created_date'),
        Resource.list(),
        Department.list()
      ]);

      setNewHires(newHiresData);
      setTasks(tasksData);
      
      setStats({
        totalNewHires: newHiresData.length,
        activeTasks: tasksData.filter(t => t.status !== 'completed').length,
        totalResources: resourcesData.length,
        departments: departmentsData.length
      });
    } catch (error) {
      console.error("Error loading admin data:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="neumorphic-container min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="neumorphic-card p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage onboarding processes and monitor progress</p>
            </div>
            <Button className="neumorphic-button bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Active New Hires</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalNewHires}</p>
            <p className="text-sm text-gray-500">Currently onboarding</p>
          </div>

          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Active Tasks</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.activeTasks}</p>
            <p className="text-sm text-gray-500">Pending completion</p>
          </div>

          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Resources</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.totalResources}</p>
            <p className="text-sm text-gray-500">Available documents</p>
          </div>

          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Departments</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.departments}</p>
            <p className="text-sm text-gray-500">Active departments</p>
          </div>
        </div>

        {/* Management Tabs */}
        <div className="neumorphic-card p-6">
          <Tabs defaultValue="new-hires">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 neumorphic-pressed p-1 rounded-2xl">
              <TabsTrigger 
                value="new-hires" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                New Hires
              </TabsTrigger>
              <TabsTrigger 
                value="tasks"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                Tasks Overview
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new-hires" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Recent New Hires</h3>
                  <Button className="neumorphic-button border-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Hire
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {newHires.slice(0, 5).map((hire) => (
                    <div key={hire.id} className="neumorphic-card p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {hire.full_name?.charAt(0) || 'N'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{hire.full_name}</h4>
                          <p className="text-sm text-gray-600">{hire.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${
                          hire.status === 'completed' ? 'bg-green-100 text-green-800' :
                          hire.status === 'productive' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        } border`}>
                          {hire.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-sm text-gray-500">{hire.onboarding_progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Task Overview</h3>
                <div className="grid gap-4">
                  {tasks.slice(0, 8).map((task) => (
                    <div key={task.id} className="neumorphic-card p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <p className="text-sm text-gray-600">Assigned to: {task.assigned_to}</p>
                      </div>
                      <Badge className={`${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        task.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      } border`}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Onboarding Analytics</h3>
                
                <div className="neumorphic-card p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-600 mb-2">Analytics Coming Soon</h4>
                  <p className="text-gray-500">
                    Detailed analytics and reporting features are being developed to help you track onboarding effectiveness.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}