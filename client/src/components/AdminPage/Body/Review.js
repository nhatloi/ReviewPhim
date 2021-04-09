import React,{useState,useEffect} from 'react'
import {Typography,Table,Modal,message,Input,Button,Pagination, Skeleton, Checkbox,Tag } from 'antd';
import {useSelector} from 'react-redux'
import { DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'
const { Text} = Typography;

function Review() {

     //const
     const [results, setresults] = useState([])
     const token = useSelector(state => state.token)
     const user = useSelector(state => state.auth.user)
     const [poster, setposter] = useState('')
     const [keywords, setkeywords] = useState([])
     const [view, setview] = useState([])
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [searching, setsearching] = useState(0)
     const [viewinfor, setviewinfor] = useState()
     const [ListReview, setListReview] = useState([])
     const [page, setpage] = useState(0)
     const [totalResutls, settotalResutls] = useState()
     const [readmore, setreadmore] = useState([])
     const [visible, setvisible] = useState(false)
     const Loading = (
        <div>
            <Skeleton.Image active={true} /> 
            <Skeleton active={true}/> 
        </div>
    );

    const columns = [
        {
          title: 'description',
          dataIndex: 'description',
        },
          {
            title: 'content',
            dataIndex: 'content',
            width:"40%",
            render: result =><div>{result[0]}...........</div>
          },
          {
            title: 'post_date',
            dataIndex: 'post_date',
          },
          {
            title: 'keywords',
            dataIndex: 'keywords',
            render:result => (
                <>
                  {result.map(item => (
                    <Tag color="blue" key={item}>
                      {item}
                    </Tag>
                  ))}
                </>
              )
          },

        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () =>
                <div>
                     <Button icon={<DeleteOutlined/>} onClick={Deletehandle}>Delete</Button>
                </div>
          },
      ];

      useEffect(() => {
        Reviews_eff()
        Get_Reviews_eff()
    }, [page])

    const Reviews_eff = async() =>{
        try{
            const res = await axios.get('/review/getallreviews')
            setresults(res.data.review)
        }catch (error) {
            message.error(error.response.data.msg)
        }
    }

    const Get_Reviews_eff = async() =>{
        try{
            const res = await axios.get('/review/getreviews',{headers:{page:page}})
            setListReview(res.data.reivew)
            settotalResutls(res.data.total_results)
        }catch (error) {
            message.error(error.response.data.msg)
        }
    }

    const handleSearch = (e) =>{
        const str = e.target.value;
        if(str==="")
            setsearching(0)
        else setsearching(1)
        var count=[];
        results.forEach(element => {
            if(element.WriterId.name.toLowerCase().search(str) != -1
            ||element.description.toLowerCase().search(str) != -1
            ||element.source.toLowerCase().search(str) != -1
            ){
                count.push(element);
            }
        });
        setview(count);
      }


    const Deletehandle = () =>{
        setIsModalVisible(true)
      }

    const handleOkDelete = async () => {
        try {
            await axios.delete(`/review/delete/${viewinfor._id}`,{
                headers:{Authorization:token}
            })
            localStorage.setItem('updatePage',true)
            const hide = message.loading('Delete... ' + viewinfor.name, 0);
            setTimeout(hide, 2500);
            Reviews_eff();
        } catch (error) {
            message.error(error.response.data.msg)
        }
        setIsModalVisible(false)
    };
    const handleCancelDelete = () => {
        setIsModalVisible(false)
    };
    const ChangePage = (e) => {
        setpage(e)
    };
    
    const ColumnsList = [
        {
            dataIndex: 'img',
            render: result =><img src={result}/> 
          },
        {
          dataIndex: '',
          width:"60%",
          render: result =><div><a style={{color:'black'}}>{result.description}</a>
          </div>

        },
      ];
    const  handleView = async(e) => {
        const res = await axios.get('/review/getdetail',{headers:{url:e.source}})   
        setposter(e.img)
        setreadmore(res.data.review)
        setvisible(!visible);
      };
    
    const  handleCancel = () => {
        setvisible(!visible);
      };
          
    const  handleOk = async() => {
        try {
            const res = await axios.post('/review/addreview',{keywords:keywords,poster:poster,WriterId:user._id,description:readmore.description,post_date:readmore.post_date,content:readmore.content},{headers:{Authorization:token}})   
            message.success(res.data.msg)
            Reviews_eff()
        setvisible(!visible);
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
      

    return (
        <div>
            <div className='body-container'>
                <h2><Text underline>Review Manager</Text></h2>
                    <Input style={{width:"30%",float:'right'}} size="large" placeholder="Search" prefix={<UserOutlined />} onChange={handleSearch}/>
                <Table bordered={true} columns={columns} scroll={{ y: 450 }} pagination={{ pageSize: results.length }} dataSource={searching==0?results:view}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {setviewinfor(searching==0?results[rowIndex]:view[rowIndex])}, // click row
                            onContextMenu: event => {}, // right button click row
                        };
                    }}
                    />

                    {/* information */}
                    <Modal title="confirm deletion" visible={isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete} >
                        <p>Delete?</p>
                    </Modal>

            </div>
            <div className='list-review'>
                <h2 style={{textAlign:'center'}}><Text>Add New</Text></h2>
                <Table bordered={true} columns={ColumnsList}  pagination={false} dataSource={ListReview} 
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {handleView(ListReview[rowIndex]);
                            }, // click row
                            onContextMenu: event => {}, // right button click row
                        };
                    }}
                    />

                    <Pagination defaultCurrent={1} total={totalResutls*10} onChange={ChangePage} />
                </div>
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
                                    :null
                                    }
                                    {line.slice(0,5)!=='(img)' && index !== readmore.content.length-1?
                                    line
                                    :null
                                    }
                                    {line.slice(0,5)!=='(img)' && index === readmore.content.length-1?
                                    `--${line}--`
                                    :null
                                    }
                                </div>
                            ))}

                            {readmore.keywords?
                                    <Checkbox.Group options={readmore.keywords} onChange={ChangeKeywords}/>:null}
                        </div>
                        
                    </Modal>
        </div>
    )
}

export default Review
