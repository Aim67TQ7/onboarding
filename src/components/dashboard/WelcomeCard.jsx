import React from 'react';
import { Sparkles, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function WelcomeCard({ newHire }) {
  return (
    <div className="neumorphic-card p-8 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-500" />
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            Welcome Aboard!
          </Badge>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Hello, {newHire?.full_name || 'New Team Member'}! 👋
        </h1>
        
        <p className="text-gray-600 mb-6">
          We're thrilled to have you join our team. Let's get you set up and ready for an amazing journey ahead!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="neumorphic-card p-4 bg-white/50">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium text-gray-800">Start Date</p>
                <p className="text-sm text-gray-600">{newHire?.start_date || 'TBD'}</p>
              </div>
            </div>
          </div>
          
          <div className="neumorphic-card p-4 bg-white/50">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium text-gray-800">Position</p>
                <p className="text-sm text-gray-600">{newHire?.position || 'Team Member'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}