import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'
import {db} from '../firebase'; 
import {toast} from 'react-toastify';


export default function Links() {
const [links, setLinks] = useState([]);    
const [currentid, setCurrentid] = useState("");    

const addOrEditLink = async (linkObject) => {
    if(currentid===''){
        await db.collection('links').doc().set(linkObject);    
        toast("New Link Added",{
            type: 'success',
            autoClose: 2000
        })
    }else {
      await db.collection('links').doc(currentid).update(linkObject);
     toast("Link Updated Succesfully",{
        type: 'info',
        autoClose: 2000
     })
     setCurrentid('');
    }
    
}

const onDeleteLink = async (id) =>{    
    let confirm =window.confirm("are you sure you want to delete this link ?"); 
    if (confirm){
        await db.collection('links').doc(id).delete();
        toast("Link deleted",{
            type: 'error',
            autoClose: 2000
        })         
    }        
}

const getLinks = async () =>{
    db.collection('links').onSnapshot((querySnapshot)=>{
        const docs =[];
        querySnapshot.forEach(doc => {            
            docs.push({...doc.data(), id: doc.id});
        });    
        setLinks(docs);
    });    
}
    

    useEffect(() => {     
        getLinks()
    }, []);

    return (
        <div>
            <div className="col md4 pading 4 mb-2">
            <LinkForm {...{addOrEditLink, currentid, links}}/> 
            </div>

            <div className="col md 8" >
                {links.map(link =>(
                    <div className="card mb-2" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                    <div>
                                        <i className="material-icons text-danger" onClick={()=>onDeleteLink(link.id)}>close</i>                                   
                                        <i className="material-icons" onClick={() =>setCurrentid(link.id)}>create</i>
                                    </div>
                            </div>

                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer"  >View more</a>
                        </div>
                    </div>
                        
                ))}
            </div>
        </div>
    )
}
