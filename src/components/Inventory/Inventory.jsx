import Form from "../Form";
import { getTodayYMD, dateYMD } from "../../utils/dateFormat";
import InfoLabel from "../InfoLabel";
import StockRecord from "./StockRecord";
import service from "../../services/stockService";
import areaService from "../../services/masterDataService";
import Joi from "joi-browser";
import Select from "../Select";
import FileDownload from "../FileDownload";
import { LineNumberPerPage } from "../../config/config.json";

class Inventory extends Form {
  state = {
    searchData: { storageArea: "", showExpired: false },
    errors: {},
    errorMessage: undefined,
    areas: undefined,
    userName: "Mike",
    stockData: undefined,
    downloadData: undefined,
    pdfContent: undefined,
    pdfPageCount: 0,
    pdfFieldsString: "",
  };

  downloadFileName = "inventory"; // extension is optional
  schema = {
    storageArea: Joi.string().required().trim(),
    showExpired: Joi.boolean(),
  };

  componentDidMount() {
    this.getStorageAreas();
  }

  getStorageAreas = async () => {
    const result = await areaService.getStockareas();
    this.setState({ areas: result.data });
  };

  createPDFFile = () => {
    const { downloadData } = this.state;
    if (!(downloadData && downloadData.length >= 1)) return;

    const fields = Object.keys(downloadData[0]);
    let fieldsString = fields.reduce((total, item) => {
      return total + item.padStart(10);
    });

    let newArray = downloadData.map((line, index) => {
      let lineContent = index.toString().padStart("5");
      for (let field of fields) {
        lineContent += line[field].toString().padStart("20");
      }
      return lineContent;
    });

    const pageCount = newArray
      ? Math.ceil(newArray.length / LineNumberPerPage)
      : 0;

    this.setState({
      pdfContent: newArray,
      pdfPageCount: pageCount,
      pdfFieldsString: fieldsString,
    });
  };

  doSubmit = async () => {
    try {
      const result = await service.getStocks(
        this.state.searchData["storageArea"]
      );

      if (result.data && result.data.length >= 1) {
        let downloadData = [];
        result.data.map((item, index) =>
          downloadData.push({
            area: item.area.name,
            product: item.product.name,
            quantity: item.quantity,
            "real Qty": item.quantity,
            unit: "barrel",
            expired: dateYMD(item.expiredDate),
          })
        );
        this.setState({ stockData: result.data, downloadData });
        this.createPDFFile();
      } else {
        this.setState({ stockData: undefined, downloadData: undefined });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const searchData = { ...this.state.searchData };

    if (input.name === "storageArea") {
      searchData[input.name] = input.value;
    }

    if (input.name === "showExpired") {
      if (input.checked) {
        searchData[input.name] = true;
      } else {
        searchData[input.name] = false;
      }
    }
    this.setState({ searchData });
    console.log("new data is", searchData);

    const errors = { ...this.state.errors };
    let errorMessage;

    if (input.name === "storageArea" && input.value === " ") {
      errorMessage = "please select a storage area";
    }
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  render() {
    const {
      stockData,
      downloadData,
      userName,
      areas,
      searchData,
      pdfContent,
      pdfPageCount,
      pdfFieldsString,
    } = this.state;
    if (this.state.errorMessage) {
      return <div>{this.state.errorMessage}</div>;
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="container  border rounded bg-white mt-2 p-2">
            <h2 className="bg-light py-2">Inventory Keeping</h2>

            <div className="row g-1 mt-2">
              <InfoLabel title={"Date"} content={getTodayYMD()}>
                <i
                  className="fa fa-calendar"
                  style={{ fontSize: "1rem", color: "orange" }}
                ></i>
              </InfoLabel>
              <InfoLabel title={"Manager"} content={userName} />
            </div>
            {downloadData && downloadData.length >= 1 && (
              <FileDownload
                fileName={this.downloadFileName}
                subtitle={
                  "Inventory Real Time Data: " + new Date().toLocaleString()
                }
                initData={downloadData}
                pdfContent={pdfContent}
                pageCount={pdfPageCount}
                fieldsString={pdfFieldsString}
              />
            )}

            <div className="row g-1 my-2">
              {!areas && <label>No storage area data</label>}
              {areas && (
                <Select
                  name={"storageArea"}
                  label={"Select a storage zone:"}
                  options={areas}
                  onChange={this.handleChange}
                  aria-label="Storage Area"
                  error={this.state.errors["storageArea"]}
                />
              )}
            </div>
            <div className="row g-1 mt-2 justify-content-between">
              <button className="btn btn-primary  col-5 " type="submit">
                search
              </button>
              <button
                className="btn btn-secondary   col-5 "
                data-bs-toggle="collapse"
                data-bs-target="#collapseDate"
                aria-expanded="false"
                aria-controls="collapseDate"
              >
                &gt;&gt;
              </button>
            </div>
            <div className="collapse my-1" id="collapseDate">
              <div className="card card-body">
                <label className="card-text" htmlFor="showExpired">
                  <input
                    type="checkbox"
                    id="showExpired"
                    name="showExpired"
                    value="show"
                    onChange={this.handleChange}
                  />
                  &nbsp;Show Stock Expired Date
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="container  border rounded bg-white my-2 p-2">
          {!stockData && <div>No Stock Data</div>}
          {stockData &&
            stockData.map((stock) => (
              <StockRecord
                key={stock._id}
                data={stock}
                showDate={searchData.showExpired}
              />
            ))}
        </div>
      </>
    );
  }
}

export default Inventory;
