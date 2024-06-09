
// import {Web} from  'sp-pnp-js'

// const Practise = () => {
//     const[data, setData]=useState<any[]>([])
//     const[handleData,sethandleData]=useState({
//         Title:"", 
//         Name:"",
//         Class:"",
//         Location:""
//     })
// async function fetchData() {
    

//     let getData=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
//     let res=  await getData.lists.getById('2a6b41bf-e264-447d-82ec-d859497644fd').items.get()
//      setData(res)

// }
//      useEffect(()=>{
//         fetchData()
//      },[])
   
//     async function deleteData(ID:number){
//         let dlt=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
//            await dlt.lists.getById('2a6b41bf-e264-447d-82ec-d859497644fd').items.getById(ID).delete()  
//            fetchData()
//      }
//     function handleChange(e:any){
//       let {name,value}=e.target;

//         sethandleData({...handleData,[name]:value})
//         console.log(handleData)
//    }
//    async function addData(){
//         let add=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
//         await add.lists.getById('2a6b41bf-e264-447d-82ec-d859497644fd').items.add(
//             {
//                 Title:handleData.Title,
//                 Name:handleData.Name,
//                 Class:handleData.Class,
//                 Location:handleData.Location
//             }
//         ) [index].Tile
//         fetchData()
//     }
//      async function updateData(Item:any){
//         // sethandleData({
//         //     Title:Item.Title,
//         //     Name:Item.Name,
//         //     Class:Item.Class,
//         //     Location:Item.Location,
//         // })
//         const update=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
//            await update.lists.getById('2a6b41bf-e264-447d-82ec-d859497644fd').items.getById(Item.Id).update({
//             Title:handleData.Title,
//             Name:handleData.Name,
//             Class:handleData.Class,
//             Location:handleData.Location
//         }) 
//     fetchData()
//      }
//      function inputSet(Item:any){
//          sethandleData({
//             Title:Item.Title,
//             Name:Item.Name,
//             Class:Item.Class,
//             Location:Item.Location,
//         })
//      }
//   return (
//     <div>
//         <button onClick={addData}>add</button>
//         <form onChange={handleChange}>
//             <div >LastName</div>
//             <input type='text' name='Title' value={handleData.Title}></input>
//             <div>Name</div>
//             <input type='text' name='Name' value={handleData.Name}></input>
//             <div>Class</div>
//             <input name='Class' value={handleData.Class}></input>
//             <div>Location</div>
//             <input type='text' name='Location' value={handleData.Location}></input>
//         </form>
//         <table>
//             <thead>
//                 <tr>
//                 <th>Title</th>
//                 <th>Name</th>
//                 <th>Class</th>
//                 <th>Location</th>
//                 </tr>
//             </thead>
//         {data.map((item:any)=>(
             
//                 <tbody>
//                     <tr>
//                         <td>{item.Title}</td>
//                         <td>{item.Name}</td>
//                         <td>{item.Class}</td>
//                         <td>{item.Location}</td>
//                     </tr>
//                     <button onClick={()=>deleteData(item.Id)}>Delete</button>
//                     <button onClick={()=>updateData(item)}>Update</button>
//                     <button onClick={()=>inputSet(item)}>inputSet</button>
//                 </tbody>
            
//         ))}
//          </table>
//     </div>
//   )
// }

// export default Practise



import React, { useState,useEffect } from 'react'

import { Web } from 'sp-pnp-js'
import { Panel1 } from './Panel1'
const Practise = () => {
const[data,setData]=useState<any[]>([])
const[data2,setData2]=useState<any[]>([])
const[postData,setPostData]=useState({
    Title:"", 
    Name:"",
    Class:"",
    Id:""

})

   async function fetchData(){
      const getData=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
      const data= await getData.lists.getById('2a6b41bf-e264-447d-82ec-d859497644fd').items.select('Id','Title',"Name","Class",'Locations/Location').expand('Locations').get()
      setData(data)
    }
   function removeData(ID:any){
    const dlt=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
          dlt.lists.getById('2a6b41bf-e264-447d-82ec-d859497644fd').items.getById(ID).delete()
          fetchData()
   }
   
useEffect(()=>{
    fetchData()
    getData()
},[])

function handleChange(e:any){
    let {name,value}=e.target
    setPostData({...postData,[name]:value})
    console.log(postData)

}

function postDatas(){
    let post=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
    post.lists.getById('2a6b41bf-e264-447d-82ec-d859497644fd').items.add(
        {
            Title:postData.Title, 
            Name:postData.Name,
            Class:postData.Class,
            LocationsId:postData.Id
        
        }
    )
    fetchData()
}

  async function getData(){
    const web=new Web('https://smalsusinfolabs.sharepoint.com/sites/Portal/DevSharma')
    const data2=await web.lists.getByTitle("schoolData").items.select("Id", "Location").get();
    setData2(data2)
}

  return (
    <div>
        <button onClick={postDatas}>add</button>
       <Panel1></Panel1>
        <form onChange={handleChange}>
            <div>Title</div>
            <input type='text' name='Title'></input>
            <div>Name</div>
            <input type='text' name="Name"></input>
            <div>Class</div>
            <input type='text' name="Class"></input>
            <div>Location</div>
            <select name='Id'>
              {
                data2?.map((item:any)=>(
                    <option   key={item?.Id} value={item?.Id}>{item?.Location}</option>
                ))
              }  
            </select>
            
        </form>
        
        
        {
        
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((item:any)=>(
                        <tr>
                            <td>{item.Title}</td>
                        <td>{item?.Name}</td>
                        <td>{item?.Class}</td>
                       <td>{item?.Locations?.Location}</td>
                       <button onClick={()=>removeData(item?.Id)}>delete</button>
                       <Panel1  item={item} fetchData={fetchData}></Panel1>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        
        
        }</div>
  )
}

export default Practise