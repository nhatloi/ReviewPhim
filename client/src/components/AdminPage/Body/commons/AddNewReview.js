import React,{useState,useEffect} from 'react'
import { Checkbox,Select ,message,Modal} from 'antd';
import axios from 'axios'
import {useSelector} from 'react-redux'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
ClassicEditor.builtinPlugins.map( plugin =>console.log( plugin.pluginName) );


ClassicEditor.defaultConfig = {
    
   

     toolbar: {
        items: [
            'heading',
            '|',
            'alignment',                                                 // <--- ADDED
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'uploadImage',
            'blockQuote',
            'undo',
            'redo',
        ]
    },

    toolbar: {
        items: [
            'heading',
            '|',
            'alignment',                                                 // <--- ADDED
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'uploadImage',
            'blockQuote',
            'undo',
            'redo',
        ]
    },
    image: {
        toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            '|',    
            'imageTextAlternative'
        ]
    },

    ckfinder: {

        // Upload the images to the server using the CKFinder QuickUpload command.
        uploadUrl: '/api/img',
        
    },
    autosave: {
        save( editor ) {
            return saveData( editor.getData() );
        }
    }

};

function saveData( data ) {
    console.log(data)
}

function displayStatus( editor ) {
    const pendingActions = editor.plugins.get( 'PendingActions' );
    const statusIndicator = document.querySelector( '#editor-status' );

    pendingActions.on( 'change:hasAny', ( evt, propertyName, newValue ) => {
        if ( newValue ) {
            statusIndicator.classList.add( 'busy' );
        } else {
            statusIndicator.classList.remove( 'busy' );
        }
    } );
}

const {Option} = Select;

function AddNewReview(props) {
    const {readmore, custom,visible,poster,handle} = props
    const token = useSelector(state => state.token)
    const user = useSelector(state => state.auth.user)
    const [movies, setmovies] = useState([])
    const [keywords, setkeywords] = useState([])
    const [tag, settag] = useState('none')
    const [content, setcontent] = useState([])



    useEffect(() => {
        Movies_eff()
    },[])

    const  handleCancel = () => {
        handle(!visible);
    };
    
    const Movies_eff = async() =>{
        try{
            const res = await axios.get('/movie/getallmovie')
            setmovies(res.data.movie)
        }catch (error) {
            message.error(error.response.data.msg)
        }
    }
    

    const  handlecustom = async() => {
        try {
            // if(tag === 'none'){
            //     const res = await axios.post('/review/addreview',{keywords:keywords,poster:poster,WriterId:user._id,description:readmore.description,post_date:readmore.post_date,content:readmore.content},{headers:{Authorization:token}})   
            //     message.success(res.data.msg)
            // }
            // else {
            //     const res = await axios.post('/review/addreview',{movie:tag,keywords:keywords,poster:poster,WriterId:user._id,description:readmore.description,post_date:readmore.post_date,content:readmore.content},{headers:{Authorization:token}})   
            //     message.success(res.data.msg)
            // }
            handle(!visible);
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
      };
    const  handleOk = async() => {
        try {
            if(tag === 'none'){
                const res = await axios.post('/review/addreview',{keywords:keywords,poster:poster,WriterId:user._id,description:readmore.description,post_date:readmore.post_date,content:readmore.content},{headers:{Authorization:token}})   
                message.success(res.data.msg)
            }
            else {
                const res = await axios.post('/review/addreview',{movie:tag,keywords:keywords,poster:poster,WriterId:user._id,description:readmore.description,post_date:readmore.post_date,content:readmore.content},{headers:{Authorization:token}})   
                message.success(res.data.msg)
            }
            handle(!visible);
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
      };
         
      const  ChangeKeywords = async(e) => {
        try {
            setkeywords(e)
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
      };

      const  handleChange = (e) => {
        try {
            settag(e)
        } catch (error) {
            message.error(error.response.data.msg)
        }
        
      };

    if(!custom)
    return (
        <div>
            <Modal
                width='80%'
                visible={visible}
                title={readmore.title}
                onOk={handleOk}
                onCancel={handleCancel}
                >

              
             <div className='Page-review'>
                            <div style={{fontFamily:'sans-serif',color:'gray',fontStyle:'oblique'}}>
                                {readmore.description}<p/>
                                {readmore.post_date}<p/>
                                </div>
                            {readmore.content && readmore.content.map((line, index) => (
                                <div className='review-content'>
                                    {line.slice(0,5)==='(img)'?
                                    <img alt='line' src={line.slice(6,line.length)}/>
                                    :line
                                    }
                                </div>
                            ))}
                            <div>
                                <h2>Tag</h2>
                                <Select defaultValue='none' style={{ width: 120 }} onChange={handleChange}>
                                <Option value="none">None</Option>
                                {movies && movies.map((movie, index) => (
                                    <Option value={movie._id}>{movie.title}</Option>
                            ))}
                                </Select>
                            </div>
                            {readmore.keywords?
                                    <Checkbox.Group options={readmore.keywords} onChange={ChangeKeywords}/>:null}
                        </div>
                </Modal>
        </div>
    )
    else

    return (
        <div style={{height:'80%'}}>
            <Modal
                width='80%'
                visible={visible}
                onOk={handlecustom}
                onCancel={handleCancel}
                >


                    <CKEditor
                        editor={ ClassicEditor }

                        data="<p>Hello from the first editor working with the context!</p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor1 is ready to use!', editor );
                        } }

                        onChange={ ( event, editor ) => {
                            const data = editor;
                            console.log( { event, editor, data } );
                        } }

                    />
              
                </Modal>
        </div>
    )

}

export default AddNewReview
