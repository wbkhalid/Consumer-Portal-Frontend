"use client";

import Image from "next/image";

const MeetingPage = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/meeting.png"
        alt="Meeting"
        fill
        priority
        className="w-full h-full"
      />
    </div>
  );
};

export default MeetingPage;
