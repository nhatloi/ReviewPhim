import React,{useState,useEffect} from 'react'
import {Typography,Table,Modal,message,Input,Button,Pagination,Form} from 'antd';
import {useSelector} from 'react-redux'
import { DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'

const { Text} = Typography;
const { TextArea } = Input;

function Review() {

     //const
     const [listNews, setlistNews] = useState([])
     const [results, setresults] = useState([])
     const token = useSelector(state => state.token)
     const [view, setview] = useState([])
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [searching, setsearching] = useState(0)
     const [viewinfor, setviewinfor] = useState()
     const [ListReview, setListReview] = useState([])
     const [page, setpage] = useState(0)
     const [totalResutls, settotalResutls] = useState()


    const ColumnsList = [
        {
            dataIndex: 'img',
            width:"120px",
            render: result =><img src={result}/> 
          },
        {
          dataIndex: '',
          width:"75%",
          render: result =><div><a style={{color:'black'}} href={result.description}>{result.description}</a>
          
            <div style={{color:'gray'}}>{result.source} - {result.time} </div>
          </div>

        },

        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () =>
                <div>
                   {/* <Button onClick={Addnew}>Add</Button> */}
                </div>
          },
      ];


    const columns = [
        {
          title: 'description',
          dataIndex: 'description',
          width:"25%",
        },

        {
            title: 'Infomation',
            children: [
              {
                title: 'source',
                dataIndex: 'source',
                key: 'source',
              },
              {
                title: 'time',
                dataIndex: 'time',
                key:"time",
              },
              {
                title: 'Writer',
                dataIndex: 'WriterId',
                key:'total_seats',
               render: result =><div>{result.name}</div>
              },
              {
                title: 'Original link',
                dataIndex: 'link',
                key:'Original_link',
              },
            ],
          },

          {
            title: 'img',
            dataIndex: 'img',
            render: result =><img src={result}/> 
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
            // const res = await axios.get('/review/getreviews',{headers:{page:page}})
            // setresults(res.data.reivew)
        }catch (error) {
            console.log(error);
        }
    }

    const Get_Reviews_eff = async() =>{
        try{
            const res = await axios.get('/review/getreviews',{headers:{page:page}})
            setListReview(res.data.reivew)
            settotalResutls(res.data.total_results)
        }catch (error) {
            console.log(error);
        }
    }

    // const Addnew = async () =>{
        
    //     try {
    //         const res = await axios.post(`/news/addnews`,{WriterId:writer,description:newsclick.description,link:newsclick.link,source:newsclick.source,time:newsclick.time,img:newsclick.img   },
    //         {headers:{Authorization:token}
    //         })
    //         message.success(res.data.msg)
    //         localStorage.setItem('updatePage',true)
    //         News_eff();
    //     } catch (error) {
    //         message.warning("not add")
    //     }
    // }


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
            await axios.delete(`/news/deletenews/${viewinfor._id}`,{
                headers:{Authorization:token}
            })
            localStorage.setItem('updatePage',true)
            const hide = message.loading('Delete... ' + viewinfor.name, 0);
            setTimeout(hide, 2500);
            Reviews_eff();
        } catch (error) {
            return;
        }
        setIsModalVisible(false)
    };
    const handleCancelDelete = () => {
        setIsModalVisible(false)
    };
    const ChangePage = (e) => {
        setpage(e)
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
                        <p>Delete News?</p>
                    </Modal>

            </div>
            <div className='list-review'>
                <h2 style={{textAlign:'center'}}><Text>Add News</Text></h2>
                    {ListReview && ListReview.map((review, index) => (
                        <Button className='card-review'>
                            <img alt='review' src={review.img}/>
                            <div style={{marginLeft:'20px'}}>{review.description}</div>
                            <div style={{position:'absolute',bottom:0,right:10,color:'red'}}>Read More</div>
                        </Button>
                    ))}
                    <Pagination defaultCurrent={1} total={totalResutls*10} onChange={ChangePage} />
                </div>
        </div>
    )
}

export default Review
