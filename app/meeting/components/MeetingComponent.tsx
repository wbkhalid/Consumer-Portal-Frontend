"use client";
import Image from "next/image";

const MeetingComponent = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/meeting1.png"
        alt="Meeting"
        fill
        priority
        className="object-contain"
      />
    </div>
  );
};

export default MeetingComponent;
