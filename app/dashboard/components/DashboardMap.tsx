"use client";

const DashboardMap = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <iframe
        className="w-full h-full border-0"
        src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Lahore%2C%20Pakistan&t=k&z=14&ie=UTF8&iwloc=B&output=embed"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default DashboardMap;
