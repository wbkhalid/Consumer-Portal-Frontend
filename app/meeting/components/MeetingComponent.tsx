"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaMicrophoneAlt, FaRegDotCircle } from "react-icons/fa";
import { GoDotFill, GoScreenFull } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { IoVideocamOutline } from "react-icons/io5";
import { PiWaveformLight } from "react-icons/pi";
import { RiArrowUpBoxLine } from "react-icons/ri";
import { RxDotsHorizontal } from "react-icons/rx";

const MeetingComponent = () => {
  const [showParticipants, setShowParticipants] = useState(true);
  const [showChats, setShowChats] = useState(true);
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

  const chatData = [
    {
      id: 1,
      name: "Faiza",
      img: "/images/dummy-image1.png",
      message: "Good afternoon, everyone.",
      time: "11:11 AM",
    },
    {
      id: 2,
      name: "Ali Raza",
      img: "/images/dummy-image2.png",
      message: "Yes, lets start this meeting.",
      time: "11:12 AM",
    },
    {
      id: 3,
      name: "Mubashir",
      img: "/images/dummy-image1.png",
      message: "Agenda items are ready.",
      time: "11:13 AM",
    },
    {
      id: 4,
      name: "Faiza",
      img: "/images/dummy-image2.png",
      message: "Good afternoon, everyone.",
      time: "11:11 AM",
    },
    {
      id: 5,
      name: "Ali Raza",
      img: "/images/dummy-image1.png",
      message: "Yes, lets start this meeting.",
      time: "11:12 AM",
    },
    {
      id: 6,
      name: "Mubashir",
      img: "/images/dummy-image2.png",
      message: "Agenda items are ready.",
      time: "11:13 AM",
    },
    {
      id: 7,
      name: "Ali Raza",
      img: "/images/dummy-image1.png",
      message: "Yes, lets start this meeting.",
      time: "11:12 AM",
    },
    {
      id: 8,
      name: "Mubashir",
      img: "/images/dummy-image2.png",
      message: "Agenda items are ready.",
      time: "11:13 AM",
    },
    {
      id: 9,
      name: "Ali Raza",
      img: "/images/dummy-image1.png",
      message: "Yes, lets start this meeting.",
      time: "11:12 AM",
    },
    {
      id: 10,
      name: "Mubashir",
      img: "/images/dummy-image2.png",
      message: "Agenda items are ready.",
      time: "11:13 AM",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 gap-2">
        <div className=" w-full  col-span-9">
          <div className="relative w-full h-[70vh] overflow-hidden rounded-xl mb-2!">
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
                <div className=" bg-[#8e8e8e] text-white text-sm px-2! py-1! rounded-full">
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
          <div className="flex gap-2 w-full overflow-x-auto pb-2">
            {participants.map((person) => (
              <div
                key={person.id}
                className="relative min-w-60 h-36 rounded-xl overflow-hidden shrink-0"
              >
                <Image
                  src={person.img}
                  alt={person.name}
                  fill
                  className="object-fit"
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
          <div className="bg-white w-full  mt-2! p-5! flex justify-between items-center ">
            <div />
            <div className="flex items-center gap-4">
              <div className="bg-(--primary) rounded-full flex justify-center items-center cursor-pointer w-12 h-12">
                <img src="/meet/microphone.png" alt="" />
              </div>
              <div className="bg-(--primary) rounded-full flex justify-center items-center cursor-pointer w-12 h-12">
                <img src="/meet/video.png" alt="" />
              </div>
              <div className="bg-[#DFEBFF] rounded-full flex justify-center items-center cursor-pointer w-12 h-12">
                <img src="/meet/send-square.png" alt="" />
              </div>
              <div className="border-2 border-[#ffc8c8] rounded-full p-0.5! ">
                <div className="text-[#ec5d5d] bg-[#ffc8c8] rounded-full flex justify-center items-center cursor-pointer w-12 h-12 text-2xl">
                  <FaRegDotCircle />
                </div>
              </div>
              <div className="bg-[#DFEBFF] rounded-full flex justify-center items-center cursor-pointer w-12 h-12">
                <img src="/meet/message.png" alt="" />
              </div>
              <div className="bg-[#DFEBFF] rounded-full flex justify-center items-center cursor-pointer w-12 h-12">
                <RxDotsHorizontal />
              </div>
            </div>
            <div className="bg-[#EB5757] px-5! py-2! text-white rounded-full cursor-pointer! hover:opacity-85!">
              <p>End Call</p>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-[#f6f6f6] border border-[#F1F0F0] h-fit!">
          <div className="flex flex-col  ">
            {/* ===== Participants Section ===== */}
            <div
              className={`flex flex-col transition-all duration-300 flex-1! ${
                showParticipants ? "h-[40%]" : "h-12"
              }`}
            >
              <div className="bg-white flex justify-between items-center px-4! py-2! shadow-sm">
                <p className="text-[#292D32] font-bold">Participants</p>
                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-2 bg-[#dfebff] rounded-full py-1! px-3! cursor-pointer">
                    <p className="font-semibold text-(--primary)">Add</p>
                    <AiOutlineUserAdd className="text-(--primary) text-xl" />
                  </div>
                  <IoIosArrowUp
                    onClick={() => setShowParticipants((prev) => !prev)}
                    className={`text-(--primary) text-xl cursor-pointer transition-transform duration-300 ${
                      showParticipants ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>
              </div>

              {showParticipants && (
                <div className="flex flex-col gap-2 mt-3! overflow-y-auto px-3! pb-3!">
                  {Addparticipants.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white rounded-full p-2! flex justify-between items-center shadow-sm"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                          <Image
                            src={p.img}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-[#25293B] text-sm font-medium">
                          {p.name}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <CiMicrophoneOn
                          className={`text-xl ${
                            p.micOn ? "text-(--primary)" : "text-gray-400"
                          }`}
                        />
                        <IoVideocamOutline
                          className={`text-xl ${
                            p.videoOn ? "text-(--error)" : "text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ===== Chats Section ===== */}
            <div
              className={`flex flex-col transition-all duration-300 flex-1 ${
                showChats ? "h-[40%]" : "h-12"
              }`}
            >
              <div className="bg-white flex justify-between items-center px-4! py-2! shadow-sm">
                <p className="text-[#292D32] font-bold">Chats</p>
                <div className="flex gap-3 items-center">
                  <div className="flex items-center gap-1.5 bg-[#dfebff] rounded-full p-1!">
                    <p className="font-semibold text-white bg-(--primary) rounded-full py-1! px-3!">
                      Group
                    </p>
                    <p className="font-semibold text-(--primary) py-1! px-3!">
                      Personal
                    </p>
                  </div>
                  <IoIosArrowUp
                    onClick={() => setShowChats((prev) => !prev)}
                    className={`text-(--primary) text-xl cursor-pointer transition-transform duration-300 ${
                      showChats ? "rotate-0" : "rotate-180"
                    }`}
                  />
                </div>
              </div>

              {showChats && (
                <div className="flex flex-col gap-2 mt-3! overflow-y-auto px-3! pb-3!">
                  {chatData.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white">
                        <Image
                          src={msg.img}
                          alt={msg.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="bg-white py-2! px-3! rounded-xl flex-1">
                        <p className="text-[#AFAFAF] text-[10px]">{msg.name}</p>
                        <p className="font-semibold text-sm text-[#25293B]">
                          {msg.message}
                        </p>
                      </div>
                      <p className="text-[#AFAFAF] text-[10px] w-12 text-right">
                        {msg.time}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ===== Input Section (Fixed Height) ===== */}
            <div className="py-12! px-9! bg-white shrink-0">
              <div className="bg-[#F6F6F6] h-[54px] w-full rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingComponent;
