import { formToJSON } from "axios";
import React from "react";
import { showToast } from "../../core/hooks/alert";
import Loader from "../../components/loader/_component";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import Modal from "../../components/modal/_component";
import TableLoader from "../../components/table_loader/_component";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { BsExclamationCircleFill } from "react-icons/bs";
import {
  DeleteIncomeTaxRate,
  UpdateTaxRateElection,
} from "../../core/services/tax.service";
import { useIncomeTaxRate } from "../../core/hooks/tax";
import { useParams } from "react-router-dom";

function UpdateTaxElection() {
  const { id, tax_rate_uid } = useParams();
  const fp = React.useRef(null);
  const entity_id = localStorage.getItem("entity_id");
  const { incomeTaxRatesQuery } = useIncomeTaxRate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [updateDone, setUpdateDone] = React.useState(false);
  const [showSaveBtn, setShowSaveBtn] = React.useState(false);
  const [readyToSubmit, setReadyToSubmit] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [isPricingModalModalOpen, setPricingModalOpen] = React.useState(false);
  const [taxTypes, setTaxTypes] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState("");
  const [electionDate, setElectionDate] = React.useState("");
  const [selectedRowUid, setSelectedRowUid] = React.useState([]);
  const [uidLists, setUidLists] = React.useState([]);
  const [updatedUidLists, setUpdatedUidLists] = React.useState();
  const [isOperationLoading, setOperationLoading] = React.useState(false);
  const [selectedUid, setSelectedUid] = React.useState("");
  const [checkedId, setCheckedId] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState("");
  const [checkedUids, setCheckedUids] = React.useState({});

  const handleCheck = (id, uid, checked) => {
    if (checked) setSelectedUid(uid);

    setSelectedRowUid(uid);

    setCheckedUids((prevCheckedUids) => {
      const newCheckedUids = { ...prevCheckedUids };
      if (checked) {
        setUidLists(newCheckedUids);
        newCheckedUids[uid] = id;
      } else {
        delete newCheckedUids[uid];
      }
      return newCheckedUids;
    });

    // Update showSaveBtn based on whether any uid is checked
    setShowSaveBtn(Object.keys(checkedUids).length >= 0);
  };

  // const handleCreateTaxType = (e) => {
  //   setIsLoading(true);
  //   e.preventDefault();

  //   const taxTypeForm = document.getElementById("tax-type-form");

  //   let appliedOnComponent = document.getElementById(
  //     "applied_on_component"
  //   ).value;
  //   const payload = {
  //     ...formToJSON(taxTypeForm),
  //     applied_on_component: appliedOnComponent,
  //   };

  //   console.log("pay: ", payload);

  //   // AddTaxType(payload)
  //   //   .then((res) => {
  //   //     setIsLoading(false);
  //   //     showToast(res?.data.message, true);
  //   //     taxTypeForm?.reset();
  //   //     setPricingModalOpen(false);
  //   //     incomeTaxRatesQuery.refetch();
  //   //   })
  //   //   .catch((error) => {
  //   //     setIsLoading(false);
  //   //     showToast(error.response.data.error, false);
  //   //   });
  // };

  const handleSubmitElection = () => {
    let electionDate = document.getElementById("election_date").value;
    if (electionDate === null || electionDate === "") {
      showToast("Please select election date", false);
      return;
    }
    if (selectedUid === tax_rate_uid) {
      showToast("Cannot update with already elected tax type.", false);
      return;
    }
    setElectionDate(electionDate);
    setReadyToSubmit(true);
    setSaveLoading(true);
  };

  React.useEffect(() => {
    setUpdatedUidLists(uidLists);
    const payload = {
      election_date: electionDate,
      entity_id,
      tax_rate_uids: uidLists,
      uid_to_update: tax_rate_uid,
    };

    if (readyToSubmit) {
      UpdateTaxRateElection(payload)
        .then((response) => {
          setUpdateDone(true);
          setSaveLoading(false);
          console.log(response);
          showToast(response?.data.message, true);

          setTimeout(() => {
            window.location.href = "/dashboard/manage-tax-election";
          }, 2000);
        })
        .catch((error) => {
          setUpdateDone(true);
          setSaveLoading(false);
          showToast(error.response.data.error, false);
        });
    }
  }, [readyToSubmit]);

  const renderActionsRow = (data) => {
    const { id, uid } = data.row;
    return (
      <div className="flex items-center justify-center">
        <label className="-mr-6">Elect</label>
        <input
          type="checkbox"
          checked={checkedUids[uid] === id}
          disabled={checkedUids[uid] && checkedUids[uid] !== id}
          onChange={(e) => handleCheck(id, uid, e.target.checked)}
        />
      </div>
    );
  };

  const renderTaxTypeRow = (data) => {
    const { tax_type } = data.row;

    return <>{tax_type && tax_type?.name}</>;
  };

  //   const renderActionsRow = (data) => {
  //     const { id, name } = data.row;
  //     return (
  //       <div className="flex items-center mt-4">
  //         <button
  //           className="mb-2 ml-3"
  //           title="Update"
  //           onClick={() => handleUpdateClick(id)}
  //         >
  //           <FiEdit color="green" size={18} />
  //         </button>
  //         <button
  //           className="mb-2 ml-3"
  //           title="Delete"
  //           onClick={() => handleDelete(id, name)}
  //         >
  //           <MdDelete color="red" size={18} />
  //         </button>{" "}
  //       </div>
  //     );
  //   };

  const columns = [
    {
      key: "update",
      name: "Actions",
      renderCell: renderActionsRow,
      width: "100px",
    },
    { key: "tax_type", name: "Tax Type", renderCell: renderTaxTypeRow },
    // { key: "uid", name: "UID" },
    // { key: "chargeable_income_min", name: "Chargeable Income Min" },
    { key: "chargeable_income_max", name: "Chargeable Income Max" },
    { key: "range_rate", name: "Range Rate" },
    { key: "effective_from", name: "Effective From" },
    { key: "effective_to", name: "Effective To" },
    { key: "distributed", name: "Distributed" },
    { key: "order_no", name: "Order Number" },
  ];

  React.useEffect(() => {
    if (
      incomeTaxRatesQuery &&
      incomeTaxRatesQuery.data &&
      incomeTaxRatesQuery.data.data
    ) {
      setTaxTypes(incomeTaxRatesQuery.data.data.income_tax_rates);
    }
    // GetTaxTypes()
    //   .then((response) => {
    //     console.log("pri: ", response?.data.taxTypes);
    //     setTaxTypes(response?.data.taxTypes);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [incomeTaxRatesQuery]);

  const filteredData = taxTypes?.filter((e) => {
    if (query === "") return e.income_name;
    else if (e?.income_name?.toLowerCase().includes(query.toLocaleLowerCase()))
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

  const closeModal = () => {
    setPricingModalOpen(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const confirmDeactivate = () => {
    setOperationLoading(true);
    setDeleteModalOpen(false);
    DeleteIncomeTaxRate(deleteId)
      .then((response) => {
        showToast(response.data.message, true);
        incomeTaxRatesQuery.refetch();
        setOperationLoading(false);
      })
      .catch((error) => {
        showToast(error.response.data.error, false);
      });
  };

  return (
    <>
      <Modal open={deleteModalOpen} close={closeDeleteModal} closeOnOverlay>
        <div className="p-10 bg-white">
          <div className="w-16 m-auto">
            <BsExclamationCircleFill size={70} color="red" />
          </div>
          <div>
            <h3 className="mt-3 text-black">
              Are you sure you want to delete this Tax Rate
              <b className="font-bold">{itemToDelete}</b>?
            </h3>
            <div className="flex mx-2 mt-6">
              <button
                onClick={closeDeleteModal}
                className="w-full py-2 mr-2 text-white rounded-full mt-9 primary mobile:w-full"
              >
                No
              </button>
              <button
                onClick={confirmDeactivate}
                className="w-full py-2 text-white bg-red-500 rounded-full mt-9 mobile:w-full"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* <Modal
        showCloseBtn={true}
        open={isPricingModalModalOpen}
        close={closeModal}
      >
        <form
          id="tax-type-form"
          className="p-8 bg-white"
          onSubmit={handleCreateTaxType}
        >
          <div className="">
            <div className="field w-96">
              <label className="text-sm label bold">Enter Name</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder=" Name"
                  name="name"
                />
              </div>
            </div>

            <div className="mt-8 field">
              <label className="text-sm label bold">Enter Periodic</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="text"
                  placeholder="Amount"
                  name="periodic"
                />
              </div>
            </div>
            <div className="mt-8 field">
              <label className="text-sm label bold">Applied on Component</label>
              <div className="control">
                <input
                  required
                  className="bg-gray-50 mr-2 border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                  type="number"
                  placeholder="Component"
                  id="applied_on_component"
                />
              </div>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={
              isLoading
                ? `animate-pulse w-1/2 py-3 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
                : `w-1/2 py-3 mb-3 text-white primary rounded-full mt-9 mobile:w-full`
            }
          >
            {isLoading ? <Loader /> : " Add Tax Type"}
          </button>
        </form>
      </Modal> */}{" "}
      <h3 className="text-2xl">Update Tax Election</h3>
      <div className="flex">
        <div className="w-full mt-3 mb-12 field">
          <label className="text-sm label bold">Select Election Date</label>
          <Flatpickr
            className="bg-gray-50 mr-2 w-1/4 cursor-pointer border outline-0 border-gray-300 text-gray-900 text-sm rounded-lg block pl-10 p-2.5 "
            placeholder="Election Date"
            ref={fp}
            name="election_date"
            id="election_date"
          />
          <button
            type="button"
            className="text-xs"
            onClick={() => {
              if (!fp?.current?.flatpickr) return;
              fp.current.flatpickr.clear();
            }}
          >
            Clear
          </button>
        </div>
        {showSaveBtn ? (
          <div className="w-1/4">
            <button
              onClick={handleSubmitElection}
              disabled={saveLoading}
              type="submit"
              className={
                saveLoading
                  ? `animate-pulse rounded-full w-full py-3 text-white mt-9 primary mobile:w-full`
                  : `w-full py-3 rounded-full text-white mt-9 primary mobile:w-full`
              }
            >
              {saveLoading ? <Loader /> : "Update Election"}
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <>
        {isOperationLoading ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            {taxTypes.length < 1 ? (
              <h3>No Data</h3>
            ) : (
              <>
                <DataGrid
                  className="text-sm rdg-light grid-container"
                  columns={columns}
                  rows={taxTypes || []}
                  bottomSummaryRows={summaryRows}
                  rowHeight={50}
                />
                <strong className="text-sm">
                  {/* Totals: {filteredData?.length} records */}
                </strong>
              </>
            )}
          </>
        )}
      </>
    </>
  );
}

export default UpdateTaxElection;
