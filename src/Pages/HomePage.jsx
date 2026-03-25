import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import career from "../career.png";
import intern from "../intern.json";
import guidance from "../guidance.json";
import training from "../training.json";

const solutions = [
  {
    animation: intern,
    title: "Jobs / Internships",
    description:
      "Access verified job and internship opportunities shared by trusted organizations and volunteers."
  },
  {
    animation: guidance,
    title: "Guidance",
    description:
      "Receive personalized mentorship from experienced professionals at every stage of your journey."
  },
  {
    animation: training,
    title: "Training",
    description:
      "Build practical skills through focused training programs designed to improve employability."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">

 {/* HERO SECTION */}
<section className="bg-[#F7F3FF] py-8 md:py-12">
  <div className="max-w-6xl mx-auto px-4">

    {/* Heading - full width, single line */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl font-extrabold mb-8 text-center w-full"
    >
      Empowering Pattusali Community Together
    </motion.h1>

    {/* Grid - text + image */}
    <div className="grid md:grid-cols-2 gap-10 items-center">

      {/* Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-base md:text-lg text-gray-700"
      >
        Upadhi Vedika is a Pattusali community-powered, non-profit initiative dedicated to uplifting deserving and economically challenged individuals from the Pattusali community.
        Built on the spirit of "community supporting community," this platform brings together a strong network of committed Pattusali volunteers who actively mentor, train, guide, and connect individuals students and professionals alike to meaningful opportunities.
        From career direction to real world exposure, Upadhi Vedika empowers individuals to grow with confidence, dignity, and purpose.
        This initiative is enabled and supported by www.startitnow.co.in, providing the platform, structure, and reach to amplify community impact at scale.
        <br />
      </motion.p>

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={career}
          alt="Career growth"
          className="w-full max-w-sm md:max-w-full rounded-2xl shadow-lg"
        />
      </div>

    </div>
  </div>
</section>

      {/* ABOUT */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              About Upadhi Vedhika
            </h2>
            <p className="text-gray-700 mb-3">
              Upadhi Vedhika is a non-profit organization supporting deserving
              and economically challenged individuals.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
               Through a network of committed volunteers, we provide mentorship, direction, and access to opportunities that help individuals grow with confidence and purpose.</p>
             <p className="text-gray-700 leading-relaxed mb-4">
               Authorized and approved by the Pattusali Hyderabad Community Association, Upadhi Vedika stands as a trusted bridge between potential and opportunity.</p>
            <p className="font-semibold">
            Support is not given by chance - it is earned through merit, commitment, and effort.
            </p>

          </div>
<div className="bg-purple-50 rounded-2xl p-6">
  <h3 className="text-lg font-semibold text-purple-800 mb-3">
    Be a Part of the Change
  </h3>
  <ul className="space-y-3 text-gray-700">
    <li>🔹 Because sharing multiplies.</li>
    <li>🔹 Responsibility defines growth for everyone.</li>
    <li>🔹 Register – Take the first step towards new opportunities and career growth.</li>
    <li>🔹 Share your knowledge, guide others, and uplift our community.</li>
    <li>Join us today. Empower lives. Strengthen our community.</li>
  </ul>

  <button
    onClick={() => navigate("/volunteer")}
    className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition"
  >
    🤝 Volunteer Now
  </button>
</div>
</div>
</section>

      {/* CTA SECTION */}
      <section className="bg-purple-600 py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to Prove Your Potential?
          </h2>
          <p className="mb-8 text-purple-100">
            Our volunteers support those willing to grow responsibly.
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/20"
                onClick={() => navigate("/jobs")}
              >
                <Lottie
                  animationData={s.animation}
                  style={{ height: 120 }}
                />
                <h3 className="font-semibold mt-4">{s.title}</h3>
                <p className="text-sm text-white/80 mt-2">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Conditions */}
 {/* Main Content – Two clearly separated sections */}
  <div className="py-20 flex-1 space-y-8 text-gray-900"> 
    {/* SECTION 1: Applicants */} 
    <section className="border rounded-xl p-6 bg-white shadow-sm"> 
      {/* Tag / identifier */} 
      <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700"> For Applicants </span>
       {/* Telugu Heading */} 
       <h1 className="text-2xl font-bold text-center mb-4" style={{ color: "#2380dcf9" }} > 
        🎯 పట్టుసాళి ఉపాది వేదిక </h1>
         <h2 className="text-xl font-semibold mt-2 mb-4" style={{ color: "#fc4327f9" }} > 📜 Terms &amp; Conditions </h2> 
         <ol className="list-decimal pl-6 space-y-3 mt-2">
           <li> The information provided in your CV will be kept confidential and will be circulated only as required for the purpose mentioned. </li>
            <li> Please note this is not a guarantee for employment; we make an effort to refer your application to an appropriate employer or connect you with respective industry experts from Pattusalli Community. </li>
             <li> All communications from the Upadi Vedika will be in the form of email only. Any communications on WhatsApp or social media are not entertained at this point of time. </li>
              <li> This service is provided strictly on a voluntary basis. </li>
               <li> Applicants are not required or mandated to remit any form of fee or compensation for this service. Furthermore, any commercial agreements or transactions entered into between the applicant and any third party are conducted at the applicant&apos;s sole discretion, and the platform owner assumes no liability or responsibility for such arrangements. </li>
                </ol>
                 </section> 
                 
 {/* SECTION 2: Volunteers */} 
 <section className="border rounded-xl p-6 bg-white shadow-sm">
  {/* Tag / identifier */} 
 <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"> For Volunteers </span>
  {/* Telugu Heading */}
   <h1 className="text-2xl font-bold text-center mb-4" style={{ color: "#2380dcf9" }} > 🙌 పట్టుసాళి ఉపాది వేదిక – స్వచ్ఛంధ సేవకులు </h1> 
   <h2 className="text-xl font-semibold mt-2 mb-4" style={{ color: "#fc4327f9" }} > 🤝 Guidelines for Volunteers </h2> 
   <ol className="list-decimal pl-6 space-y-3 mt-2"> 
    <li> The data you share shall remain confidential. </li> 
    <li> Based on requests received through email (<span className="font-mono">UpadhiVedika@startitnow.co.in</span>), only relevant data will be provided to the respective volunteer regarding the applicants. </li>
     <li> Data provided to volunteers is expected to be kept confidential, and volunteers are equally responsible for maintaining privacy. </li>
      <li> All communications from the Upadhi Vedika will be in the form of email only. Any communications on WhatsApp or social media are not entertained at this point of time. </li>
       </ol>
        </section>
      </div>
      </div>
  );
}
