import { motion } from "framer-motion";

export default function HomePage({ onApplyClick }) {
  return (
    <div className="space-y-3">

      {/* HERO SECTION */}
      <section className="bg-[#F7F3FF] py-4">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Change Is the Only Constant
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
          >
            In today’s fast-changing world, uncertainty is inevitable.
            What makes the difference is timely guidance and the right support.
            <br />
            <span className="font-semibold text-purple-700">
              Upadhi Vedhika bridges the gap between talent and opportunity.
            </span>
          </motion.p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-white mb-2">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About Upadhi Vedhika
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Upadhi Vedhika is a non-profit organization dedicated to supporting
              deserving, talented, and economically challenged individuals.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Through a network of committed volunteers, we provide mentorship,
              direction, and access to opportunities that help individuals grow
              with confidence and purpose.
            </p>

            <p className="font-semibold text-gray-900">
              Support is not given by chance - it is earned through merit,
              commitment, and effort.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-purple-50 rounded-3xl p-10 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-purple-800 mb-3">
              What We Believe
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Talent exists everywhere</li>
              <li>• Guidance changes direction</li>
              <li>• Opportunity creates transformation</li>
              <li>• Responsibility defines growth</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Terms and Conditions */}
      {/* Main Content – Two clearly separated sections */}
      <div className="py-20 flex-1 space-y-8 text-gray-900">
        {/* SECTION 1: Applicants */}
        <section className="border rounded-xl p-6 bg-white shadow-sm">
          {/* Tag / identifier */}
          <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
            For Applicants
          </span>

          {/* Telugu Heading */}
          <h1
            className="text-2xl font-bold text-center mb-4"
            style={{ color: "#2380dcf9" }}
          >
            🎯 పట్టుసాళి ఉపాది వేదిక
          </h1>

          <h2
            className="text-xl font-semibold mt-2 mb-4"
            style={{ color: "#fc4327f9" }}
          >
           📜 Terms &amp; Conditions
          </h2>

          <ol className="list-decimal pl-6 space-y-3 mt-2">
            <li>
              The information provided in your CV will be kept confidential and
              will be circulated only as required for the purpose mentioned.
            </li>

            <li>
              Please note this is not a guarantee for employment; we make
              an effort to refer your application to an appropriate employer or
              connect you with respective industry experts from Pattusalli
              Community.
            </li>

            <li>
              All communications from the Upadi Vedika will be in the form of
              email only. Any communications on WhatsApp or social media are not
              entertained at this point of time.
            </li>

            <li>
              This service is provided strictly on a voluntary basis.
            </li>

            <li>
              Applicants are not required or mandated to remit any form of
              fee or compensation for this service. Furthermore, any commercial
              agreements or transactions entered into between the applicant and any
              third party are conducted at the applicant&apos;s sole discretion, and the
              platform owner assumes no liability or responsibility for such
              arrangements.
            </li>
          </ol>
        </section>

        {/* SECTION 2: Volunteers */}
        <section className="border rounded-xl p-6 bg-white shadow-sm">
          {/* Tag / identifier */}
          <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            For Volunteers
          </span>

          {/* Telugu Heading */}
          <h1
            className="text-2xl font-bold text-center mb-4"
            style={{ color: "#2380dcf9" }}
          >
           🙌 పట్టుసాళి ఉపాది వేదిక – స్వచ్ఛంధ సేవకులు
          </h1>

          <h2
            className="text-xl font-semibold mt-2 mb-4"
            style={{ color: "#fc4327f9" }}
          >
           🤝 Guidelines for Volunteers
          </h2>

          <ol className="list-decimal pl-6 space-y-3 mt-2">
            <li>
              The data you share shall remain confidential.
            </li>

            <li>
              Based on requests received through email
              (<span className="font-mono">UpadhiVedika@startitnow.co.in</span>),
              only relevant data will be provided to the respective volunteer
              regarding the applicants.
            </li>

            <li>
              Data provided to volunteers is expected to be kept confidential,
              and volunteers are equally responsible for maintaining privacy.
            </li>

            <li>
              All communications from the Upadhi Vedika will be in the form of
              email only. Any communications on WhatsApp or social media are not
              entertained at this point of time.
            </li>
          </ol>
        </section>

      {/* CTA SECTION */}
      <section className="bg-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Prove Your Potential?
          </motion.h2>

          <p className="text-lg text-purple-100 mb-8">
            Our volunteers are ready to support those who are willing
            to take responsibility for their growth.
          </p>

          <button
            onClick={onApplyClick}
            className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-purple-100 transition"
          >
            Apply Now
          </button>
        </div>
      </section>
    </div>
    </div>
  );
}
