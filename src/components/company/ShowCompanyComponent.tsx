import { CompanyDTO } from "../../types/company";

type CompanyComponentProps = {
  company: CompanyDTO;
};

export default function ShowCompanyComponent({ company }: Readonly<CompanyComponentProps>) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold">{company.name}</h3>
      <p><span className="font-medium">NIT:</span> {company.NIT}</p>
      <p><span className="font-medium">Address:</span> {company.address}</p>
      <p><span className="font-medium">Phone:</span> {company.phone_indicator} {company.phone}</p>
    </div>
  )
}
