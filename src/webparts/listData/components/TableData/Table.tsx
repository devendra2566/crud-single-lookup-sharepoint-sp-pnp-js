import React, { useEffect, useState } from "react";
import { Web } from "sp-pnp-js";
import { PanelFooterExample } from "./Panel";
const Table = () => {
  const [data, setData] = useState<any[]>([]);

  //here we are fetch the data from the list
  async function fetchData() {
    try {
      const getData = new Web(
        "https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma"
      );
      const res = await getData.lists
        .getById("2a6b41bf-e264-447d-82ec-d859497644fd")
        .items.select("Id", "Title", "Name", "Class", "Locations/Location" )
        .expand("Locations")
        .get();
      setData(res);
      console.log("res...", res);
    } catch (error) {
      console.error(error, "error of fetch Data");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  //here we are delete the  items
  async function deleteItems(ID: number) {
    let web = new Web(
      "https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma"
    );
    await web.lists
      .getById("2a6b41bf-e264-447d-82ec-d859497644fd")
      .items.getById(ID)
      .delete();
    fetchData();
  }

  return (
    <div>
      <PanelFooterExample fetchData={fetchData}>AddData</PanelFooterExample>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>LastName</th>
            <th>firstName</th>
            <th>Class</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((item: any) => (
              <tr key={item.Id}>
                <td>{item?.Title}</td>
                <td>{item?.Name}</td>
                <td>{item?.Class}</td>
                <td>{item?.Locations?.Location}</td>
                <td>{item?.Id}</td>

                {/* <td>{item.StudentPocketMoney.Salary}</td> */}
                <div style={{ display: "flex" }}>
                  <button onClick={() => deleteItems(item?.Id)}>Delete</button>
                  <PanelFooterExample item={item} fetchData={fetchData}>
                    UPDATE
                  </PanelFooterExample>
                </div>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
