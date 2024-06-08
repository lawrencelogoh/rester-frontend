import React from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { FcSearch } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { useEntity } from "../../core/hooks/entity";
import TableLoader from "../../components/table_loader/_component";

function ManageCompany() {
  const [query, setQuery] = React.useState("");
  const { entityQuery } = useEntity();
  const { isLoading } = entityQuery;
  const allEntities = entityQuery?.data?.data?.entities;
  const filteredData = allEntities?.filter((e) => {
    if (query == "") return e;
    else if (e?.name?.toLowerCase().includes(query.toLocaleLowerCase()))
      return e;
  });
  const summaryRows = React.useMemo(() => {
    return [
      {
        id: "total_0",
        totalCount: 4,
      },
    ];
  }, [filteredData]);

  const handleDeleteClick = (id, name) => {
    alert("test delete");
  };

  const handleUpdateClick = (id, name) => {
    alert("test update");
  };
  const handleDeactivateClick = (id, name) => {
    alert("test deactivate");
  };

  const renderActionsRow = (data) => {
    const { id, name } = data.row;
    return (
      <div className="flex mt-1">
        {/* <button title="Delete" onClick={() => handleDeleteClick(id, name)}>
          <MdDelete color="red" size={18} />
        </button> */}
        <button
          className="ml-2"
          title="Update"
          onClick={() => handleUpdateClick(id, name)}
        >
          <FiEdit color="green" size={18} />
        </button>
        <button
          className="ml-2"
          title="Deactivate"
          onClick={() => handleDeactivateClick(id, name)}
        >
          <CiLock color="green" size={18} />
        </button>
      </div>
    );
  };

  const columns = [
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
    },
    { key: "name", name: "Company Name" },
  ];
  return (
    <>
      <div className="flex flex-wrap w-full gap-3 px-4 py-3 mb-6 bg-slate-200">
        <div className="relative w-full mb-2">
          <div className="absolute left-0 flex items-center pl-3 pointer-events-none top-5">
            <FcSearch />
          </div>
          <input
            type="text"
            className="bg-gray-50 border outline-0 mt-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
            placeholder="Search by Company Name..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <>
          <TableLoader />
        </>
      ) : (
        <>
          <DataGrid
            className="text-sm rdg-light grid-container"
            columns={columns}
            rows={filteredData || []}
            bottomSummaryRows={summaryRows}
          />
        </>
      )}
    </>
  );
}

export default ManageCompany;
