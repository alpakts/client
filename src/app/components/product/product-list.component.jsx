import { useEffect, useState } from "react";
import Tablee from "../table/table.component";
import { Delete, Get } from "../../utils/axios.service";
import { Button, Popconfirm, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function ProductList() {
  var navigate = useNavigate();
  const [companies, setCompaines] = useState([]);
  const [namefilter, setNameFilter] = useState();
  const getCompanies = () => {
    Get("/api/company")
      .then((res) => {
        setCompaines(res.data);
      })
      .catch((err) => {
        Get("api/company").then((res) => {
          setCompaines(res.data);
        });
      });
  };

  const getProducts = () => {
    Get("/api/products")
      .then((res) => {
        setProducts(res.data);
        var filters = res.data.map((comp) => {
          return { text: comp.category, value: comp.category };
        });
        var uniq = filters.filter(
          (v, i, a) => a.findIndex((v2) => v2.text === v.text) === i
        );
        setNameFilter(uniq);
      })
      .catch((err) => {
        Get("api/company").then((res) => {
          setProducts(res.data);
        });
      });
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getCompanies();
    getProducts();
    var newprod = products.forEach((e) => {
      e.company = companies.filter((ee) => ee._id == e.company)[0];
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,

      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "30%",
    },
    {
      editable: true,
      title: "Category",
      filters: namefilter,
      filterMode: "tree",
      filterSearch: true,
      dataIndex: "category",
      width: "20%",
      onFilter: (value, record) => record.category.startsWith(value),
    },
    {
      title: "Amount",
      editable: true,
      dataIndex: "amount",
      defaultSortOrder: 'descend',
     sorter: (a, b) => a.amount - b.amount,

      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Amount Unit",
      editable: true,
      dataIndex: "amountUnit",

      width: "20%",
    },
    {
      title: "Company",
      editable: true,
      dataIndex: "company",
      href:"asd",
      render:   (_, record) => {
        var company=companies.filter(s=>{
          return s._id==record.company
        })
        
        return (<Link to={"/admin/companies"} >{company[0]?.name}</Link>)
       
        
      },

      width: "40%",
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      render: (_, record) =>
        companies.length >= 1 ? (
          <Popconfirm
            color="gray"
            title="you will bi redirected?"
            onConfirm={() => handleEdit(record._id)}
          >
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </a>
          </Popconfirm>
        ) : null,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, record) =>
        products.length >= 1 ? (
          <Popconfirm
            color="gray"
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Popconfirm>
        ) : null,
    },
  ];
  function handleDelete(key) {
    Delete(`/api/products/${key}`)
      .then((res) => {
        getProducts();
      })
      .catch((er) => console.log(er));
  }
  function handleEdit(key) {
    navigate("edit/" + key);
  }

  return (
    <>
    
      <div className="container mx-auto py-5 px-20">
        <h1 className=" py-5 text-2xl font-bold text-center "> Product List</h1>

        <Button className="mb-3">
          <Link to={"add"}>Add Product</Link>
        </Button>

        <Tablee data={products} columss={columns}></Tablee>
      </div>
    </>
  )
}
