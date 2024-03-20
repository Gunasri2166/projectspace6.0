// import React from "react"

// import { Row, Col, Card, CardBody, CardTitle,  } from "reactstrap"
// // Editable
// import BootstrapTable from "react-bootstrap-table-next"
// import cellEditFactory, { Type } from "react-bootstrap-table2-editor"
// import { useState,useEffect } from "react"
// import { useParams } from "react-router-dom/cjs/react-router-dom.min"


// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"
// import axios from "axios"
// const axiosAPI = axios.create()

  
//   const EditableTables = () => {
//     const [data1, setData1] = useState([]);
//     const { id } = useParams();
//     useEffect(() => {
//       fetchData();
//     }, []);

//   useEffect(() => {
//     const fetchData = () => {
//       axiosAPI.get("http://localhost:5001/getProjects")
//         .then((response) => {
//           setData1(response.data.projects);
//         })
//         .catch((err) => console.log(err));
//     };
//     fetchData();

//   }, []);
//   const fetchData = () => {
//     axiosAPI.get(`http://localhost:5001/getProjects`)
//       .then((response) => {
//         setData1(response.data.projects);
//       })
//       .catch((err) => console.log(err));
//   };
//   const handleEditClick = (oldValue, newValue, row, column) => {
//     const updatedData = [...data1];
//     const rowIndex = updatedData.findIndex(item => item.id === row.id);
//     updatedData[rowIndex][column.dataField] = newValue;
//     setData1(updatedData);

  
//     axiosAPI.put(`http://localhost:5001/updateProject/${row.id}`, row)
//     .then((response) => {
//       console.log("Data updated successfully:", response.data);
//     })
//     .catch((error) => {
//       console.error("Error updating data:", error);
//     });
// };

   
    
   
//   const columns=[
//       {
//         dataField: "project_name",
//         text: "project Name",
//       },
//       {
//         dataField: "project_description",
//         text: "project Description",
        
//       },
//       {
//         text: "Url",
//         dataField: "url",
        
        
//       },
//       {
//         text: "Public ip",
//         dataField: "public_ip",
        
//       },
//       {
//         text: "Local ip",
//         dataField: "local_ip",
        
//       },
//       {
//         text: "Db name",
//         dataField: "db_name",
        
//       },
//       {
//         text: "Active status",
//         dataField: "active_status",
        
//       },
//       {
//         text: "maintaining by",
//         dataField: "maintaining_by",
        
//       },
//       {
//         text: "Department",
//         dataField: "department",
        
//       },  
//       {
//         text: "Git status",
//         dataField: "git_status",
        
        
//       }, 
      
//       {
//         text: "Git url",
//         field:"git_url",
       
        
//       },   
//       {
//         text:"Git Collabrators",
//         dataField:"git_collabrators",
        
        
//       },   
//       {
//         text:"Branch protection",
//         dataField:"branch_protection",
        
        
//       },   
//       {
//         text:"Added BY",
//         dataField:"added_by",
        
        
//       },   
//       {
//         text:"Updated By",
//         dataField:"updated_by",
      
        
//       },  
//       {
//         text:"Updated By",
//         dataField:"updated_by",
        
        
//       },  
//       {
//         text:"Created Date",
//         dataField:"created_date",
        
        
//       },  
//       {
//         text:"Updated Date",
//         dataField:"updated_date",
        
        
//       }, 
//       {
//         text:"Status",
//         dataField:"status",
        
        
//       },
      

//     ]
  
//   return (
//     <React.Fragment>
//       <div className="page-content">

//         <Breadcrumbs title="Tables" breadcrumbItem="Editable Table" />

//         <Row>
//           <Col>
//             <Card>
//               <CardBody>
//                 <CardTitle className="h4">Datatable Editable </CardTitle>
//                 <p className="card-title-desc">Table Edits is a lightweight jQuery plugin for making table rows editable.</p>

//                 <div className="table-responsive">
//                   <BootstrapTable
//                     keyField="id"
//                     data={data1}
//                     columns={columns}
//                     cellEdit={cellEditFactory({ mode: "click",blurToSave: true,
//                     afterSaveCell: handleEditClick
//                   })}
//                   />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>

//     </React.Fragment>
//   )
// }

// export default EditableTablesimport React from "react"
import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "./datatables.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import LineChart from "../Dashboard/line-chart";
import PieChart from "../AllCharts/apex/PieChart";
const axiosAPI = axios.create();

const DescriptionTable = () => {
  const [datas, setDatas] = useState([]);
  const [selectedTypeOfWork, setSelectedTypeOfWork] = useState("");

  useEffect(() => {
    axiosAPI
      .get("http://localhost:5001/getDescriptions")
      .then((response) => {
        console.log(response.data.descriptions);
        setDatas(response.data.descriptions);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    console.log("Edit clicked for row:", id);
  };

  const handleTypeOfWorkFilterChange = (e) => {
    setSelectedTypeOfWork(e.target.value);
  };

  const filteredData = datas.filter(
    (description) =>
      selectedTypeOfWork === "" || description.type_of_work === selectedTypeOfWork
  );

  const data = {
    columns: [
      {
        label: "Project Title",
        field: "project_title",
        sort: "asc",
        width: 100,
      },
      {
        label: "Type Of Work",
        field: "type_of_work",
        sort: "asc",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        sort: "asc",
        width: 100,
      },
      {
        label: "Work Complexity",
        field: "work_complexity",
        sort: "asc",
        width: 100,
      },
      {
        label: "Assigned By",
        field: "assigned_by",
        sort: "asc",
        width: 150,
      },
      {
        label: "Start Date",
        field: "start_date",
        sort: "asc",
        width: 100,
      },
      {
        label: "End Date",
        field: "end_date",
        sort: "asc",
        width: 100,
      },
      {
        label: "No Of Days",
        field: "no_of_days",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Estimated Price",
        field: "estimated_price",
        sort: "asc",
        width: 100,
      },
      {
        label: "Completed By",
        field: "completed_by",
        sort: "asc",
        width: 100,
      },
      {
        label: "Added By",
        field: "added_by",
        sort: "asc",
        width: 100,
      },
      {
        label: "Created Date",
        field: "created_date",
        sort: "asc",
        width: 200,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 200,
      },
    ],
    rows: filteredData.map((description) => ({
      ...description,
      actions: (
        <div>
          <Link to={`/EditDescription/${description._id}`}>
            {" "}
            <button className="btn btn-primary btn-sm mr-1">Edit</button>
          </Link>
         
        </div>
      ),
    })),
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Projects" breadcrumbItem="List" />
       
            

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Link to="/form-advanced">
                  <button className="btn btn-primary btn-sm mr-1">Add</button>
                </Link>
                
                <select
                  value={selectedTypeOfWork}
                  onChange={handleTypeOfWorkFilterChange}
                  style={{marginLeft:"30px"}}
                  
                >
                  <option >Type of Work</option>
                  <option value="New Module">New Module</option>
                  <option value="Enhancement">Enhancement</option>
                  <option value="Bug Fixing">Bug Fixing</option>
                  {/* Add more options as needed */}
                </select>
                
                <MDBDataTable responsive striped bordered data={data} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    </React.Fragment>
  );
};

export default DescriptionTable;







