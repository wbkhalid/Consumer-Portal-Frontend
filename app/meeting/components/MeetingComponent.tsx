"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaMicrophoneAlt, FaRegDotCircle } from "react-icons/fa";
import { GoDotFill, GoScreenFull } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { PiWaveformLight } from "react-icons/pi";
import { RxDotsHorizontal } from "react-icons/rx";

const MeetingComponent = () => {
  const [showParticipants, setShowParticipants] = useState(true);
  const [showChats, setShowChats] = useState(true);
  const [activeTab, setActiveTab] = useState<"group" | "personal">("group");

  const participants = [
    { id: 1, name: "Mubashir Ali", img: "/person.png" },
    { id: 2, name: "Waleed Bin Khalid", img: "/person.png" },
    { id: 3, name: "Ahsan Raza", img: "/person.png" },
    { id: 4, name: "Sara Khan", img: "/person.png" },
    { id: 5, name: "Ahsan Raza", img: "/person.png" },
    { id: 6, name: "Sara Khan", img: "/person.png" },
    { id: 7, name: "Ahsan Raza", img: "/person.png" },
    { id: 8, name: "Sara Khan", img: "/person.png" },
  ];

  const Addparticipants = [
    {
      id: 1,
      name: "Saima AD",
      img: "/images/dummy-image1.png",
      micOn: true,
      videoOn: false,
    },
    {
      id: 2,
      name: "Ali Raza",
      img: "/images/dummy-image2.png",
      micOn: false,
      videoOn: true,
    },
    {
      id: 3,
      name: "Mubashir Khan",
      img: "/images/dummy-image1.png",
      micOn: true,
      videoOn: true,
    },
    {
      id: 4,
      name: "Fatima Noor",
      img: "/images/dummy-image2.png",
      micOn: false,
      videoOn: false,
    },
    {
      id: 5,
      name: "Saima AD",
      img: "/images/dummy-image1.png",
      micOn: true,
      videoOn: false,
    },
    {
      id: 6,
      name: "Ali Raza",
      img: "/images/dummy-image2.png",
      micOn: false,
      videoOn: true,
    },
    {
      id: 7,
      name: "Mubashir Khan",
      img: "/images/dummy-image1.png",
      micOn: true,
      videoOn: true,
    },
    {
      id: 8,
      name: "Fatima Noor",
      img: "/images/dummy-image2.png",
      micOn: false,
      videoOn: false,
    },
  ];

  const groupChats = [
    {
      id: 1,
      name: "Team Alpha",
      message: "Meeting at 5 PM",
      img: "/images/dummy-image2.png",
      time: "2:45 PM",
    },
    {
      id: 2,
      name: "Project Beta",
      message: "Files updated",
      img: "/images/dummy-image1.png",
      time: "3:10 PM",
    },
    {
      id: 3,
      name: "Team Alpha",
      message: "Meeting at 5 PM",
      img: "/images/dummy-image2.png",
      time: "2:45 PM",
    },
    {
      id: 4,
      name: "Project Beta",
      message: "Files updated",
      img: "/images/dummy-image1.png",
      time: "3:10 PM",
    },
  ];

  const personalChats = [
    {
      id: 1,
      name: "Ali Khan",
      message: "Hey, how’s it going?",
      img: "/images/dummy-image1.png",
      time: "1:20 PM",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      message: "Got your note",
      img: "/images/dummy-image2.png",
      time: "4:30 PM",
    },
    {
      id: 3,
      name: "Ali Khan",
      message: "Hey, how’s it going?",
      img: "/images/dummy-image1.png",
      time: "1:20 PM",
    },
    {
      id: 4,
      name: "Sara Ahmed",
      message: "Got your note",
      img: "/images/dummy-image2.png",
      time: "4:30 PM",
    },
  ];

  const chatData = activeTab === "group" ? groupChats : personalChats;

  return (
    <div className="py-1 overflow-hidden max-h-[calc(100vh-0px)] ">
      <div className="grid grid-cols-12 gap-2">
        <div className=" w-full  col-span-9">
          <div className="h-[calc(100vh-70px)] overflow-hidden relative">
            <div className="relative w-full h-[67%] overflow-hidden rounded-xl mb-2!">
              {/* Background Image */}
              <Image
                src="/person.png"
                alt="Meeting Person"
                fill
                className="object-fit"
                priority
              />

              {/* Top Left - Time */}
              <div className="absolute top-2 w-full px-3!">
                <div className="flex justify-between items-center">
                  <div className=" bg-[#8e8e8e] text-white text-xs px-2! py-1! rounded-full">
                    <div className="flex gap-1 items-center">
                      <div className="bg-[#d6d6d6] p-0.5! rounded-full">
                        <GoDotFill className="text-red-400" />
                      </div>
                      <p>10:45:01</p>
                    </div>
                  </div>
                  <div className="bg-[#8e8e8e] text-white text-lg p-1.5! rounded-full">
                    <GoScreenFull />
                  </div>
                </div>
              </div>

              {/* Bottom Left - Name */}
              <div className="absolute bottom-2 w-full px-3!">
                <div className="flex justify-between items-center">
                  <div className=" bg-[#8e8e8e] text-white text-sm px-2! py-1! rounded-full">
                    <p>Mubashir Ali</p>
                  </div>
                  <div className="bg-[#8e8e8e] text-white text-lg p-1.5! rounded-full">
                    <PiWaveformLight />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full overflow-x-auto scrollbar-hide pb-2 h-[20%]">
              {participants.map((person) => (
                <div key={person.id} className="relative  h-full rounded-xl">
                  <Image
                    src={person.img}
                    alt={person.name}
                    width={500}
                    height={500}
                    className="h-full min-w-50 w-auto object-fill"
                  />

                  <div className="absolute bottom-1 w-full px-1!">
                    <div className="flex justify-between items-center">
                      <div className="bg-[#8e8e8e] text-white text-xs p-1! rounded-full">
                        <p>{person.name}</p>
                      </div>
                      <div className="bg-(--primary) text-white p-1! rounded-full text-xs">
                        <FaMicrophoneAlt />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white w-full  mt-2! p-1! flex justify-between items-center h-[10%]">
              <div />

              <div className="flex items-center gap-3 ">
                <div className="bg-(--primary) rounded-full flex justify-center items-center cursor-pointer w-8 h-8">
                  <Image
                    src="/meet/microphone.png"
                    alt="Microphone"
                    width={18}
                    height={18}
                  />
                </div>

                <div className="bg-(--primary) rounded-full flex justify-center items-center cursor-pointer w-8 h-8">
                  <Image
                    src="/meet/video.png"
                    alt="Video"
                    width={18}
                    height={18}
                  />
                </div>

                <div className="bg-[#DFEBFF] rounded-full flex justify-center items-center cursor-pointer w-8 h-8">
                  <Image
                    src="/meet/send-square.png"
                    alt="Send"
                    width={18}
                    height={18}
                  />
                </div>

                <div className="border-2 border-[#ffc8c8] rounded-full p-0.5">
                  <div className="text-[#ec5d5d] bg-[#ffc8c8] rounded-full flex justify-center items-center cursor-pointer w-8 h-8 text-lg">
                    <FaRegDotCircle />
                  </div>
                </div>

                <div className="bg-[#DFEBFF] rounded-full flex justify-center items-center cursor-pointer w-8 h-8">
                  <Image
                    src="/meet/message.png"
                    alt="Message"
                    width={18}
                    height={18}
                  />
                </div>

                <div className="bg-[#DFEBFF] rounded-full flex justify-center items-center cursor-pointer w-8 h-8 text-lg">
                  <RxDotsHorizontal />
                </div>
              </div>

              <div className="bg-[#EB5757] px-5! py-1! text-white rounded-full cursor-pointer! hover:opacity-85! text-sm">
                <p>End Call</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 bg-[#f6f6f6] border border-[#F1F0F0] h-fit!">
          <div className="h-[calc(100vh-70px)] overflow-hidden relative">
            {/* ===== Participants Section ===== */}
            <div
              className={`flex flex-col transition-all duration-300 ${
                showParticipants ? "h-[42%]" : "h-12"
              }`}
            >
              <div className="bg-white flex justify-between items-center px-2! py-2! ">
                <p className="text-[#292D32] font-bold text-sm">Participants</p>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-2 bg-[#dfebff] rounded-full py-1! px-2! cursor-pointer">
                    <p className="font-semibold text-(--primary)  text-sm">
                      Add Participant
                    </p>
                    <AiOutlineUserAdd className="text-(--primary)" />
                  </div>
                  <IoIosArrowUp
                    onClick={() => setShowParticipants((prev) => !prev)}
                    className={`text-(--primary)  cursor-pointer transition-transform duration-300 ${
                      showParticipants ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>
              </div>

              {showParticipants && (
                <div className="flex flex-col gap-1.5 my-2! overflow-y-auto px-2!">
                  {Addparticipants.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-full p-1! flex justify-between items-center shadow-xs"
                    >
                      {/* Left section: profile image + name */}
                      <div className="flex gap-2 items-center">
                        <div className="w-9 h-9 rounded-full overflow-hidden relative">
                          <Image
                            src={p.img}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        </div>
                        <p className="text-[#25293B] text-sm font-medium">
                          {p.name}
                        </p>
                      </div>

                      {/* Right section: mic + video icons */}
                      <div className="flex gap-1 items-center pr-2!">
                        <div className="relative w-5 h-5">
                          <Image
                            src={
                              p.micOn ? "/meet/mic-on.png" : "/meet/mic-off.png"
                            }
                            alt={p.micOn ? "Mic On" : "Mic Off"}
                            fill
                            className="object-contain"
                            sizes="16px"
                          />
                        </div>

                        <div className="relative w-5 h-5">
                          <Image
                            src={
                              p.videoOn
                                ? "/meet/video-on.png"
                                : "/meet/video-off.png"
                            }
                            alt={p.videoOn ? "Video On" : "Video Off"}
                            fill
                            className="object-contain"
                            sizes="16px"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ===== Chats Section ===== */}
            <div
              className={`flex flex-col transition-all duration-300 ${
                showChats ? "h-[42%]" : "h-12"
              }`}
            >
              {/* Header */}
              <div className="bg-white flex justify-between items-center p-2! shadow-xs">
                <p className="text-[#292D32] font-bold text-sm">Chats</p>
                <div className="flex gap-3 items-center">
                  {/* Tabs */}
                  <div className="flex items-center gap-1.5 bg-[#dfebff] rounded-full p-1! text-sm">
                    <button
                      onClick={() => setActiveTab("group")}
                      className={`font-semibold rounded-full py-1! px-3! transition-colors cursor-pointer ${
                        activeTab === "group"
                          ? "bg-(--primary) text-white"
                          : "text-(--primary) bg-transparent"
                      }`}
                    >
                      Group
                    </button>
                    <button
                      onClick={() => setActiveTab("personal")}
                      className={`font-semibold rounded-full py-1! px-3! transition-colors cursor-pointer ${
                        activeTab === "personal"
                          ? "bg-(--primary) text-white"
                          : "text-(--primary) bg-transparent"
                      }`}
                    >
                      Personal
                    </button>
                  </div>

                  {/* Collapse arrow */}
                  <IoIosArrowUp
                    onClick={() => setShowChats((prev) => !prev)}
                    className={`text-(--primary) cursor-pointer transition-transform duration-300 ${
                      showChats ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>
              </div>

              {/* Chat List */}
              {showChats && (
                <div className="flex flex-col gap-1.5 my-2! overflow-y-auto px-2!">
                  {chatData.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="w-9 h-9 rounded-full overflow-hidden relative border-2 border-white shrink-0">
                        <Image
                          src={msg.img}
                          alt={msg.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="bg-white py-1! px-2! rounded-xl flex-1">
                        <p className="text-[#AFAFAF] text-[10px]">{msg.name}</p>
                        <p className="font-semibold text-xs text-[#25293B]">
                          {msg.message}
                        </p>
                      </div>
                      <p className="text-[#AFAFAF] text-[10px] w-12 text-right shrink-0">
                        {msg.time}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ===== Input Section (Fixed Height) ===== */}
            <div className="py-2! px-4! bg-white h-[16%] flex justify-center items-center">
              <div className="bg-[#F6F6F6] h-9 w-full rounded-full flex items-center justify-between p-1! pl-2! gap-1">
                {/* Left Icon */}
                <div className="relative w-5 h-5">
                  <Image
                    src="/meet/input-icon.png"
                    alt="Input Icon"
                    fill
                    className="object-contain"
                    sizes="20px"
                  />
                </div>

                {/* Input Field */}
                <input
                  type="text"
                  placeholder="Type Something..."
                  className="flex-1 mx-3 bg-transparent border-none outline-none text-sm text-[#25293B] placeholder:text-[#999] h-full"
                />

                {/* Right Icon */}
                <div className="relative w-7 h-7 cursor-pointer bg-(--primary) rounded-full">
                  <Image
                    src="/meet/send.png"
                    alt="Send"
                    fill
                    className="object-contain"
                    sizes="20px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingComponent;
