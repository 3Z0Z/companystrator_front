import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CompanyDTO } from "../../types/company";
import { getCompanies } from "../../services/CompanyService";

import ShowCompanyComponent from "../../components/company/ShowCompanyComponent";

export default function CompaniesList() {
  const [companies, setCompanies] = useState<CompanyDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const data = await getCompanies();
        setCompanies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Companies list</h2>
      <div className="grid grid-cols-3 gap-4">
          {companies.map((company) => (
            <Link to={`/company/${company.NIT}`} className="border p-5 hover:bg-gray-300 transition-colors" key={company.NIT}>
              <ShowCompanyComponent company={company} />
            </Link>
          ))}
      </div>
    </>
  )
}
