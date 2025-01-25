import { CompanyDTO } from "../types/company";

type CompanyComponentProps = {
  company: CompanyDTO;
};

export default function CompanyComponent({ company }: Readonly<CompanyComponentProps>) {
  return (
    <div className="border p-5 hover:bg-gray-300 transition-colors">
      <h3 className="text-xl font-bold">{company.name}</h3>
      <p>{company.NIT}</p>
      <p>{company.address}</p>
      <p>{company.phone_indicator} {company.phone}</p>
    </div>
  )
}
