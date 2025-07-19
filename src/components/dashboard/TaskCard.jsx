import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const priorityColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200"
};

const statusColors = {
  pending: "bg-gray-100 text-gray-800 border-gray-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  overdue: "bg-red-100 text-red-800 border-red-200"
};

export default function TaskCard({ task, onComplete, onViewDetails }) {
  return (
    <div className="neumorphic-card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg mb-2">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={`${priorityColors[task.priority]} border`}>
              {task.priority} priority
            </Badge>
            <Badge className={`${statusColors[task.status]} border`}>
              {task.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        
        {task.status === 'completed' && (
          <CheckCircle2 className="w-6 h-6 text-green-500 ml-4" />
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>Due: {task.due_days_before_start} days before start</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>HR Team</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => onViewDetails(task)}
          className="neumorphic-button flex-1 border-none"
        >
          View Details
        </Button>
        {task.status !== 'completed' && (
          <Button
            onClick={() => onComplete(task)}
            className="neumorphic-button flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none hover:from-blue-600 hover:to-purple-700"
          >
            Mark Complete
          </Button>
        )}
      </div>
    </div>
  );
}