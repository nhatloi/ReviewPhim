import React,{useState,useEffect} from 'react'
import { Checkbox,Select ,message,Modal, Input,Button} from 'antd';
import cheerio from 'cheerio';
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';
 
var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;



const {Option} = Select;



function AddNewReview(props) {
    const {readmore, custom,visible,poster,handle} = props
    const token = useSelector(state => state.token)
    const user = useSelector(state => state.auth.user)
    const [movies, setmovies] = useState([])
    const [keywords, setkeywords] = useState([])
    const [tag, settag] = useState('none')
    const [content, setcontent] = useState([])
    const [description, setdescription] = useState('')
    const [Poster, setPoster] = useState('')

const handleEditorChange = (content, editor) =>{
    setcontent(content)
    }

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
    const upImage = async(e) =>{
        e.preventDefault();
        try {
            const file = e.target.files[0]
           if(!file) return console.error('No files were uploaded.');
           if(file.type !== 'image/jpeg' && file.type !== 'image/png') return console.error('file format incorrect.');

           let formData = new FormData()
           formData.append('file',file)
           const res = await axios.post('/api/uploadimg',formData,{
               headers:{'content-type':'multipart/form-data',Authorization:token}
           })
                setPoster(res.data.url)


        } catch (error) {
            console.error(error);
        }
    }
    

    const  handlecustom = async() => {

        const contents = []
        try {
            const $ =cheerio.load(content)
            $('p').each(function (i, elem) {
                if($(elem).text().trim())
                    contents.push($(elem).text().trim())
                if($(elem).find('img').attr('src')){
                    contents.push(`(img) ${$(elem).find('img').attr('src')}`)
                }
            });
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed).toLocaleDateString();
            const keyword = keywords.split('#').slice(1,keywords.length)
            const review = {
                description:description,
                keywords:keyword,
                WriterId:user._id,
                post_date:today,
                content:contents,
                poster:Poster,
                tag:tag 
            }
           const res = await axios.post('/review/addreview',review,{headers:{Authorization:token}})   
            message.success(res.data.msg)
            
            handle(!visible);
        } catch (error) {
            message.error(error)
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
                    <div>Description: <Input onChange={(e)=>{setdescription(e.target.value)}}></Input></div>
                    Poster: 
                    <div style={{height:'300px',width:'400px'}}><img style={{height:'100%',width:'100%'}} src={Poster}/></div>
                    <Input type='file' id='poster' onChange={upImage}/>
                    <Editor 
                    apiKey="p716pphziwt1dlm81kbh5sylhmy8jfkrr9d6yk5vf6ckw4dj"
                    init={{
                    images_reuse_filename: true,
                    selector: 'textarea#full-featured-non-premium',
                    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                    imagetools_cors_hosts: ['picsum.photos'],
                    menubar: 'file edit view insert format tools table help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    toolbar_sticky: true,
                    autosave_ask_before_unload: true,
                    autosave_interval: '30s',
                    autosave_prefix: '{path}{query}-{id}-',
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                    image_advtab: true,
                    link_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_class_list: [
                        { title: 'None', value: '' },
                        { title: 'Some class', value: 'class-name' }
                    ],
                    importcss_append: true,
                    file_picker_callback: function (callback, value, meta) {
                        /* Provide file and text for the link dialog */
                        if (meta.filetype === 'file') {
                        callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                        }

                        /* Provide image and alt text for the image dialog */
                        if (meta.filetype === 'image') {
                        callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                        }

                        /* Provide alternative source and posted for the media dialog */
                        if (meta.filetype === 'media') {
                        callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                        }
                    },
                    templates: [
                            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                        { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                        { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                    ],
                    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                    height: 600,
                    image_caption: true,
                    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    toolbar_mode: 'sliding',
                    contextmenu: 'link image imagetools table',
                    skin: useDarkMode ? 'oxide-dark' : 'oxide',
                    content_css: useDarkMode ? 'dark' : 'default',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    
                    }}

                        onEditorChange={handleEditorChange}

                    />
                    <div>Keywords:(Bắt đầu bằng dấu #)</div>
                    <Input onChange={(e)=>{setkeywords(e.target.value)}}/>
                    <div>
                                <h2>Tag</h2>
                                <Select defaultValue='none' style={{ width: 120 }} onChange={handleChange}>
                                <Option value="none">None</Option>
                                {movies && movies.map((movie, index) => (
                                    <Option value={movie._id}>{movie.title}</Option>
                            ))}
                                </Select>
                            </div>

                </Modal>
        </div>
    )

}

export default AddNewReview
