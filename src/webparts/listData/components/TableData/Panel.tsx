import * as React from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel } from "@fluentui/react/lib/Panel";
import { useBoolean } from "@fluentui/react-hooks";
import { Web } from "sp-pnp-js";
const buttonStyles = { root: { marginRight: 8 } };

export const PanelFooterExample = (props:any) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const [addData, setAddData] = React.useState<any>({
    Title: "",
    Name: "",
    Class: "",
    Location: "",
  });
  console.log(addData, "deva the warrior");
  const [data1, setData2] = React.useState([]);

  React.useEffect(() => {
    setAddData({
      Title: props?.item?.Title,
      Name: props?.item?.Name,
      Class: props?.item?.Class,
      Id: props?.item?.Locations?.Location,
    });
  }, [props.item]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
    console.log(addData);
  }

  async function postData(e: any) {
    e.preventDefault();
    let web = new Web(
      "https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma"
    );
    await web.lists.getById("2a6b41bf-e264-447d-82ec-d859497644fd").items.add({
      Title: addData.Title,
      Name: addData.Name,
      Class: addData.Class,
      LocationsId: addData.Location,
    });

    props.fetchData();
  }

  async function deleteItems(ID: any) {
    let web = new Web(
      "https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma"
    );
    await web.lists
      .getById("2a6b41bf-e264-447d-82ec-d859497644fd")
      .items.getById(ID)
      .delete();
    props.fetchData();
  }

  const updateFunction = async (e: any) => {
    e.preventDefault();
    let web = new Web(
      "https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma"
    );
    await web.lists
      .getById("2a6b41bf-e264-447d-82ec-d859497644fd")
      .items.getById(props.item.Id)
      .update({
        Title: addData.Title,
        Name: addData.Name,
        Class: addData.Class,
        LocationsId: addData.Location,
      });

    props.fetchData();
  };

  const onRenderFooterContent = () => (
    <div>
      <PrimaryButton
        styles={buttonStyles}
        onClick={() => deleteItems(props.item.ID)}
      >
        Delete
      </PrimaryButton>
      <PrimaryButton onClick={postData} styles={buttonStyles}>
        Save
      </PrimaryButton>

      <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
    </div>
  );

  React.useEffect(() => {
    const fetchCompanyItems = async () => {
      try {
        const data = new Web(
          "https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma"
        );
        const items = await data.lists
          .getByTitle("schoolData")
          .items.select("Id", "Location")
          .get();
        setData2(items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchCompanyItems();
  }, []);

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        <div onChange={handleChange}>
          <form>
            <div>LastName</div>
            <input
              placeholder="lastName"
              name="Title"
              value={addData?.Title}
            ></input>
            <div>Name</div>
            <input placeholder="Name" name="Name" value={addData?.Name}></input>
            <div>Class</div>
            <input
              placeholder="Class"
              name="Class"
              value={addData?.Class}
            ></input>
            <div>Location</div>

            <select
              id="companyDropdown"
              className="form-select"
              name="Location"
            >
              {/* <option value=""  selected={.Id === props.item.Id? true : false} >--Select a company--</option> */}
              {data1?.map((item: any) => (
                <option key={item?.Id} value={item?.Id}>
                  {item?.Location}
                </option>
              ))}
            </select>
            <button onClick={updateFunction}>update</button>
          </form>
        </div>
      </Panel>
    </div>
  );
};
