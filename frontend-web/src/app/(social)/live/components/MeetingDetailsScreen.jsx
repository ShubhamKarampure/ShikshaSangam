import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

export function MeetingDetailsScreen({
  onClickJoin,
  participantName,
  setParticipantName,
  initalmeetId
}) {
  const [meetingId] = useState(initalmeetId); // No need for meetingId state update anymore
  const [isCopied, setIsCopied] = useState(false);
const isNameValid = participantName.length >= 3;
  return (
   
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl shadow-2xl border border-gray-800 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Meeting</h1>
          <p className="text-gray-400 text-sm">Enter your name to get started</p>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Your name"
            className={`
              w-full 
              bg-[#2C2C2C] 
              text-white 
              px-4 
              py-3 
              rounded-xl 
              border 
              transition-all 
              duration-300 
              ${isNameValid 
                ? "border-transparent focus:ring-2 focus:ring-blue-600" 
                : "border-red-500"
              }
              placeholder-gray-500
              focus:outline-none
            `}
          />

          {!isNameValid && (
            <p className="text-xs text-red-400 -mt-4 pl-2">
              Name must be at least 3 characters
            </p>
          )}

          <button
            onClick={() => {
              if (participantName.length >= 3) {
            onClickJoin(meetingId); // Directly join with the preset meetingId
          }
            }}
            disabled={!isNameValid}
            className={`
              w-full 
              py-3 
              rounded-xl 
              text-white 
              font-semibold 
              transition-all 
              duration-300 
              ${isNameValid 
                ? "bg-blue-600 hover:bg-blue-700 active:scale-95" 
                : "bg-gray-700 cursor-not-allowed"
              }
            `}
          >
            Join Meeting
          </button>
        </div>
      </div>

  );

  
}
