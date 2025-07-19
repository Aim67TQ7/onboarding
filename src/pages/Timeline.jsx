import React from "react";
import TimelineView from "../components/timeline/TimelineView";

export default function Timeline() {
  return (
    <div className="neumorphic-container min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <TimelineView />
      </div>
    </div>
  );
}