"use client";

const ComplainMap = () => {
  return (
    <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-sm mt-2! border-2 border-white">
      <iframe
        className="w-full h-full border-0"
        src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Lahore%2C%20Pakistan&t=&z=14&ie=UTF8&iwloc=B&output=embed"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ComplainMap;
