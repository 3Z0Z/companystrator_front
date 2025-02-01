import { useEffect, useState } from "react";

import { useAuthStorage } from "../../store";
import { CompanyDTO } from "../../types/company";
import { deleteCompany, getCompany } from "../../services/CompanyService";

import EditCompanyComponent from "./EditCompanyComponent";
import ShowCompanyComponent from "./ShowCompanyComponent";
import { useNavigate, useParams } from "react-router-dom";

export default function AdministrateCompany() {
  const { role } = useAuthStorage();
  const { nit } = useParams();
  const navigate = useNavigate();

  const [editCompany, setEditCompany] = useState(false);
  const [company, setCompany] = useState<CompanyDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const data = await getCompany(nit!);
        setCompany(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [ nit ]);

  const deleteCompanyAction = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this company?");
    if (confirmDelete) {
      try {
        await deleteCompany(nit!);
        navigate("/");
      } catch(error: any) {
        console.log(error.message);
      }
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (company != null) return (
    <div className="flex flex-col gap-4 p-3 border w-full">
      {editCompany ? (
        <EditCompanyComponent company={company} setEdit={setEditCompany} setCompany={setCompany} />
      ) : (
        <ShowCompanyComponent company={company} />
      )}
      {role === "ADMIN" && !editCompany && (
        <div className="flex">
          <button
            onClick={() => setEditCompany(!editCompany)}
            className="mx-auto py-1 px-3 border hover:bg-gray-400 cursor-pointer transition-colors"
          >
            Edit company
          </button>
          <button
            onClick={() => deleteCompanyAction()}
            className="mx-auto py-1 px-3 border hover:bg-gray-400 cursor-pointer transition-colors"
          >
            Delete company
          </button>
        </div>
      )}
    </div>
  );
}
