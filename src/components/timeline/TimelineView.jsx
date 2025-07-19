import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const milestones = [
  { id: 1, title: "Offer Accepted", status: "completed", date: "Day -14" },
  { id: 2, title: "Pre-boarding", status: "in_progress", date: "Day -7" },
  { id: 3, title: "First Day", status: "upcoming", date: "Day 0" },
  { id: 4, title: "Week 1 Check-in", status: "upcoming", date: "Day 7" },
  { id: 5, title: "Full Productivity", status: "upcoming", date: "Day 30" }
];

export default function TimelineView() {
  return (
    <div className="neumorphic-card p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Onboarding Journey</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center neumorphic-card ${
                milestone.status === 'completed' ? 'bg-green-50' :
                milestone.status === 'in_progress' ? 'bg-blue-50' : 'bg-gray-50'
              }`}>
                {milestone.status === 'completed' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : milestone.status === 'in_progress' ? (
                  <Clock className="w-6 h-6 text-blue-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="neumorphic-card p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{milestone.title}</h3>
                    <Badge className={`${
                      milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                      milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    } border`}>
                      {milestone.date}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {milestone.status === 'completed' ? 'Great job! This milestone is complete.' :
                     milestone.status === 'in_progress' ? 'Currently working on this phase.' :
                     'Coming up in your journey.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}