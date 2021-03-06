import React,{useState,useEffect} from 'react'
import {Typography,Table,Modal,message,Input,Button,Pagination,Tag,Drawer } from 'antd';
import {useSelector} from 'react-redux'
import { DeleteOutlined,UserOutlined,FolderViewOutlined} from '@ant-design/icons';
import axios from 'axios'
import AddNewReview from './commons/AddNewReview'
import Information from './commons/Information'

const { Text} = Typography;

function Review() {

     //const
     const [results, setresults] = useState([])
     const token = useSelector(state => state.token)
     const [view, setview] = useState([])
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [searching, setsearching] = useState(0)
     const [viewinfor, setviewinfor] = useState()
     const [ListReview, setListReview] = useState([])
     const [page, setpage] = useState(0)
     const [totalResutls, settotalResutls] = useState()
     const [readmore, setreadmore] = useState([])
     const [visible, setvisible] = useState(false)
     const [visibleInfor, setvisibleInfor] = useState(false)
     const [poster, setposter] = useState('')
     const [customvisible, setcustomvisible] = useState(false)

     const handleEdit =() =>{
        setvisibleInfor (!visibleInfor)
    }
    //  const Loading = (
    //     <div>
    //         <Skeleton.Image active={true} /> 
    //         <Skeleton active={true}/> 
    //     </div>
    // );

    const columns = [
        {
          title: 'description',
          dataIndex: 'description',
        },
        {
            title: 'Movie tag',
            dataIndex: 'movie',
            render: result =><div>{result?result.title:null}</div>
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
            title: 'State',
            dataIndex: 'state',
            filters: [
                {
                  text: 'Active',
                  value: true,
                },
                {
                    text: 'Waiting',
                    value: false,
                  },
              ],
            render:result => (
                <>
                  {result===true?'Active':'Waiting'}
                </> 
              ),
                onFilter: (value, record) => record.state===value,
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
            render: (result) =>
                <div>
                     <Button icon={<DeleteOutlined/>} onClick={Deletehandle}>Delete</Button>
                     <Button icon={<FolderViewOutlined />} onClick={handleEdit}>View</Button>
                     {result.state===false?<Button
                     onClick={async()=>{
                         await axios.post(`/review/active/${result._id}`);
                         Reviews_eff()
                    }}>Active</Button>:null}
                </div>
          },
      ];

      useEffect(() => {
        Reviews_eff()
        Get_Reviews_eff()
    }, [page,visible])


    const Reviews_eff = async() =>{
        try{
            const res = await axios.get('/review/getallreviews',{headers:{Authorization:token}})
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
            if(element.movie)
                if(element.movie.title.toLowerCase().search(str) !== -1
                ||element.description.toLowerCase().search(str) !== -1
                ||element.keywords.join(' ').toLowerCase().search(str) !== -1
              
            ){
                count.push(element);
            }
            if(!element.movie)
                if(element.description.toLowerCase().search(str) !== -1
                ||element.keywords.join(' ').toLowerCase().search(str) !== -1
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
            render: result =><img alt='' src={result} style={{width:'400px'}}/> 
          },
        {
          dataIndex: 'description',
          width:"60%",
          render: result =><div><a style={{color:'black'}}>{result}</a>
          </div>

        },
      ];
    const  handleView = async(e) => {
        const res = await axios.get('/review/getdetail',{headers:{url:e.source}})   
        setposter(e.img)
        setreadmore(res.data.review)
        setvisible(!visible);
      };
    
    
      

    return (
        <div>
            <div className='body-container'>
                <h2><Text underline>Review Manager</Text></h2>
                    <Input style={{width:"30%",float:'right'}} size="large" placeholder="Search" prefix={<UserOutlined />} onChange={handleSearch}/>
                <Table bordered={true} columns={columns} scroll={{ y: 450 }} pagination={{ pageSize: results.length }} dataSource={searching===0?results:view}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {setviewinfor(searching===0?results[rowIndex]:view[rowIndex])}, // click row
                            onContextMenu: event => {}, // right button click row
                        };
                    }}
                    />

                    {/* information */}
                    <Modal title="confirm deletion" visible={isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete} >
                        <p>Delete?</p>
                    </Modal>

            </div>
            <div >
                <h2 style={{textAlign:'center'}}><Text>Add New</Text></h2>
                <Button onClick={()=>{setcustomvisible(!customvisible)}}>Custom</Button>
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
                    <AddNewReview custom visible={customvisible} handle ={setcustomvisible}/>
                    <AddNewReview readmore = {readmore} visible={visible} poster={poster} handle ={setvisible}/>
                <Drawer
                width={'80%'}
                title="Information"
                placement="right"
                visible={visibleInfor}
                onClose={handleEdit}
                >
                <Information review infor= {viewinfor}/>
            </Drawer>
        </div>
    )
}

export default Review
