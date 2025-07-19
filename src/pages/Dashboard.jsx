import React, { useState, useEffect } from "react";
import { OnboardingTask, NewHire, Department } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Users, CheckSquare } from "lucide-react";

import ProgressRing from "../components/dashboard/ProgressRing";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import TaskCard from "../components/dashboard/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newHire, setNewHire] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const tasksData = await OnboardingTask.list('-created_date', 10);
      const newHireData = await NewHire.list('-created_date', 1);
      
      setTasks(tasksData);
      setNewHire(newHireData[0] || null);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
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

  const handleViewTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = Math.max(tasks.length, 1);
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const upcomingTasks = tasks.filter(t => t.status !== 'completed').slice(0, 3);

  return (
    <div className="neumorphic-container min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <WelcomeCard newHire={newHire} />

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Ring */}
          <div className="lg:col-span-1">
            <ProgressRing progress={progress} />
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neumorphic-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Tasks Completed</h3>
              <p className="text-2xl font-bold text-gray-800">{completedTasks}</p>
              <p className="text-sm text-gray-500">out of {totalTasks}</p>
            </div>

            <div className="neumorphic-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Days Until Start</h3>
              <p className="text-2xl font-bold text-gray-800">7</p>
              <p className="text-sm text-gray-500">Get ready!</p>
            </div>

            <div className="neumorphic-card p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Team Size</h3>
              <p className="text-2xl font-bold text-gray-800">24</p>
              <p className="text-sm text-gray-500">Amazing people</p>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Next Steps</h2>
            <Button 
              variant="outline" 
              className="neumorphic-button border-none"
            >
              <Bell className="w-4 h-4 mr-2" />
              View All Tasks
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleCompleteTask}
                onViewDetails={handleViewTaskDetails}
              />
            ))}
          </div>

          {upcomingTasks.length === 0 && (
            <div className="neumorphic-card p-12 text-center">
              <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">All caught up!</h3>
              <p className="text-gray-500">You've completed all your current tasks. New ones will appear as your start date approaches.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}