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
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-extrabold mb-4"
            >
              Change Is the Only Constant
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-base md:text-lg text-gray-700"
            >
              In today’s fast-changing world, uncertainty is inevitable.
              <br />
              <span className="font-semibold text-purple-700">
                Upadhi Vedhika bridges the gap between talent and opportunity.
              </span>
            </motion.p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src={career}
              alt="Career growth"
              className="w-full max-w-sm md:max-w-full rounded-2xl shadow-lg"
            />
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
            <p className="font-semibold">
              Support is earned through merit, commitment, and effort.
            </p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">
              What We Believe
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Sharing multiplies impact</li>
              <li>• Guidance changes direction</li>
              <li>• Opportunity transforms lives</li>
            </ul>
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

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => navigate("/jobs")}
              className="w-full sm:w-auto px-8 py-3 bg-white text-purple-700 font-semibold rounded-full"
            >
              Jobs / Internships
            </button>

            <button
              onClick={() => navigate("/guidance")}
              className="w-full sm:w-auto px-8 py-3 border text-white rounded-full"
            >
              Guidance
            </button>

            <button
              onClick={() => navigate("/training")}
              className="w-full sm:w-auto px-8 py-3 border text-white rounded-full"
            >
              Training
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
