    import React, {useState, useEffect} from 'react'
import { db } from '../firebase';
    
    export default function LinkForm({addOrEditLink, currentid, links}) { 
    
    const inicialStateValues= {
        url:"",
        name:"",
        description:""
    }
        const [values, setValues] =useState(inicialStateValues)

    const handleSubmit =(e) => {
        e.preventDefault();        
        addOrEditLink(values);
        setValues({...inicialStateValues});
    }
    const handlerInputChange = (e) =>{
        const {name, value} = e.target;        
        setValues({...values, [name]: value});
    }

    const getLinkById =async (id) =>{
        const doc =await db.collection('links').doc(id).get();        
        setValues({...doc.data()});
    }

    useEffect(()=>{
        if(currentid===''){
            setValues({...inicialStateValues});
        }else {
            getLinkById(currentid);
        }
    }, [currentid])

    return (
        <form className='card card-body' onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className='form-control' placeholder="htttp://someurl.com" name="url" value={values.url} onChange={handlerInputChange}/>
            </div>
            
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>                    
                <input type="text" className="form-control" placeholder="Name website" name="name" value={values.name} onChange={handlerInputChange}/>
            </div>            
            <div className="form-group input-group">
                <textarea name="description" rows="3" className="form-control" placeholder="write a description" value={values.description} onChange={handlerInputChange}></textarea>
            </div>            
        <button className="btn btn-primary btn-block">
            {currentid==='' ?'save' :'update'}
        </button>
        </form>
    )
    }
