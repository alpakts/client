import { useEffect, useState } from "react";
import { Get } from "../../utils/axios.service";
import { Link } from "react-router-dom";

export default function CompanyInfo({ head, data, columss, type }) {
  const [companies, setCompanies] = useState();
  useEffect(() => {
    Get("/api/company").then((s) => {
      setCompanies(s.data);
    });
  }, []);
  return (
    <>
      <div class="relative mt-3 px-2 ml-2 w-1/2 overflow-x-auto shadow-xl sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <caption className="text-xl text-black">
            {" "}
            <Link to={type == 1 ? "products" : "companies"}> {head}</Link>
          </caption>
          <thead class="text-xs text-gray-700 uppercase   ">
            <tr>
              {columss.map((c) => (
                <th scope="col" class="h-20 px-6 py-3">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {type == 0 &&
              data.map((comp) => {
                return (
                  <>
                    <tr class="bg-white h-20   hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {comp.name}
                      </th>
                      <td class="px-6 py-4">{comp.legalNumber}</td>
                      <td class="px-6 py-4">{comp.country}</td>
                      <td class="px-6 py-4">{comp.website}</td>
                    </tr>
                  </>
                );
              })}

            {type == 1 &&
              data.map((comp) => {
                var company = companies?.filter((s) => s._id == comp.company);
                var compan = "";
                if (company?.length > 0) {
                  compan = company[0]?.name;
                }

                return (
                  <>
                    <tr class="bg-white h-20   hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {comp.name}
                      </th>
                      <td class="px-6 py-4">{comp.category}</td>
                      <td class="px-6 py-4">{comp.amount}</td>
                      <td class="px-6 py-4">{comp.amountUnit}</td>
                      <td class="px-6 py-4"><Link to={"/admin/companies"} className="underline" >{compan}</Link></td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
