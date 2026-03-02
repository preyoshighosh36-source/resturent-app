import React from "react";


const testimonials = [
  {
    id: 1,
    name: "Emily Roberts",
    role: "Food Enthusiast",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200",
    message:
      "The food here is absolutely amazing! Every dish is full of flavor, and the presentation is beautiful. Highly recommend their signature pasta and desserts.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Thompson",
    role: "Regular Customer",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200",
    message:
      "Best dining experience in town! The staff is friendly, the ambiance is cozy, and the food is consistently delicious. Their burger and pizza are my favorites.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Food Blogger",
    image:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200",
    message:
      "A hidden gem! The flavors are authentic and the portion sizes are perfect. I loved the fresh salads and the desserts are heavenly. Definitely coming back!",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
        What Our <span className="text-yellow-500">Customers Say</span>
      </h2>

      
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="relative text-sm w-80 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 pb-6 flex flex-col items-center overflow-hidden"
          >
            {/* Avatar */}
            <div className="relative w-full flex justify-center pt-8 px-6">
              <img
                className="h-24 w-24 rounded-full border-4 border-white shadow-md -mt-12 object-cover"
                src={t.image}
                alt={t.name}
              />
            </div>

            
            <div className="text-center mt-4 px-4">
              <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
              <p className="text-gray-500">{t.role}</p>
            </div>

            
            <p className="text-gray-500 text-center mt-4 px-6">{t.message}</p>

            
            <div className="flex justify-center mt-4">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <svg
                  key={idx}
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FFB800"
                  />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;