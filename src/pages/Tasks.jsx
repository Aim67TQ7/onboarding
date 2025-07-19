import React, { useState, useEffect } from "react";
import { OnboardingTask, Department } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, Clock, AlertCircle, Filter } from "lucide-react";

import TaskCard from "../components/dashboard/TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, activeFilter]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const tasksData = await OnboardingTask.list('-created_date');
      const departmentsData = await Department.list();
      
      setTasks(tasksData);
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
    setIsLoading(false);
  };

  const filterTasks = () => {
    if (activeFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === activeFilter));
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      await OnboardingTask.update(task.id, {
        status: 'completed',
        completion_date: new Date().toISOString().split('T')[0]
      });
      loadData();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const getTaskCountByStatus = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  return (
    <div className="neumorphic-container min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="neumorphic-card p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Onboarding Tasks</h1>
          <p className="text-gray-600">Complete these tasks to ensure a smooth start to your journey</p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
          </div>

          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-gray-800">{getTaskCountByStatus('in_progress')}</p>
          </div>

          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-gray-800">{getTaskCountByStatus('completed')}</p>
          </div>

          <div className="neumorphic-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Overdue</p>
            <p className="text-2xl font-bold text-gray-800">{getTaskCountByStatus('overdue')}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="neumorphic-card p-6">
          <Tabs value={activeFilter} onValueChange={setActiveFilter}>
            <TabsList className="grid w-full grid-cols-5 bg-gray-100 neumorphic-pressed p-1 rounded-2xl">
              <TabsTrigger 
                value="all" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                All Tasks
              </TabsTrigger>
              <TabsTrigger 
                value="pending"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger 
                value="in_progress"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger 
                value="completed"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger 
                value="overdue"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg"
              >
                Overdue
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onViewDetails={(task) => console.log("View details for:", task)}
            />
          ))}
        </div>

        {filteredTasks.length === 0 && !isLoading && (
          <div className="neumorphic-card p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {activeFilter === "all" ? "No tasks yet" : `No ${activeFilter.replace('_', ' ')} tasks`}
            </h3>
            <p className="text-gray-500">
              {activeFilter === "all" 
                ? "Tasks will appear here as your onboarding progresses"
                : `You don't have any ${activeFilter.replace('_', ' ')} tasks at the moment`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}