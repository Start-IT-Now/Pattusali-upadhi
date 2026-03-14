import { useEffect, useState } from "react";

export default function VolunteerDashboard() {

  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = async () => {

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/Applicants?select=*`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      }
    );

    const data = await res.json();
    setApplicants(data);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (

    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">
        Volunteer Dashboard
      </h1>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Interested Field</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Resume</th>
          </tr>
        </thead>

        <tbody>

          {applicants.map((applicant) => (

            <tr key={applicant.id} className="border-t">

              <td className="p-3">
                {applicant.applicant_name}
              </td>

              <td>
                {applicant.applicant_email}
              </td>

              <td>
                {applicant.phone}
              </td>

              <td>
                {applicant.interested_field}
              </td>

              <td>
                {applicant.present_location}
              </td>

              <td>
                {applicant.total_industry_experience}
              </td>

              <td>

                <a
                  href={applicant.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}