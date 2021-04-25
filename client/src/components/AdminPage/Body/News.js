import React,{useState,useEffect} from 'react'
import {Typography,Table,Modal,message,Input,Button} from 'antd';
import {useSelector} from 'react-redux'
import { DeleteOutlined,UserOutlined} from '@ant-design/icons';
import axios from 'axios'

const { Text} = Typography;

function News() {

     //const
     const writer = useSelector(state => state.auth.user._id)
     const [listNews, setlistNews] = useState([])
     const [results, setresults] = useState([])
     const token = useSelector(state => state.token)
     const [view, setview] = useState([])
     const [isModalVisible, setIsModalVisible] = useState(false);
     const [searching, setsearching] = useState(0)
     const [newsclick, setnewsclick] = useState()
     const [viewinfor, setviewinfor] = useState()


    const ColumnsList = [
        {
            dataIndex: 'img',
            width:"120px",
            render: result =><img alt='' src={result}/> 
          },
        {
          dataIndex: '',
          width:"75%",
          render: result =><div><a style={{color:'black'}} href={result.link} target="_blank">{result.title}</a>
          
            <div style={{color:'gray'}}>{result.source} - {result.time} </div>
          </div>

        },

        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () =>
                <div>
                   <Button onClick={Addnew}>Add</Button>
                </div>
          },
      ];


    const columns = [
        {
            title: 'title',
            dataIndex: 'title',
            width:"20%",
          },
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
                render: result =><div>{new Date(result).toDateString()}</div>
              },
              {
                title: 'Writer',
                dataIndex: 'WriterId',
                key:'total_seats',
               render: result =><div>{result.name}</div>
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
        News_eff()
        Get_News_eff()
    }, [])

    const News_eff = async() =>{
        try{
            const res = await axios.get('/news/get_allnews')
            setresults(res.data.news)
        }catch (error) {
            message.error(error.response.data.msg)
        }
    }

    const Get_News_eff = async() =>{
        try{
            const res = await axios.get('/news/getnews',{headers:{key:'topics'}})
            setlistNews(res.data.news)
        }catch (error) {
            message.error(error.response.data.msg)
        }
    }

    const Addnew = async () =>{
        
        try {
            const res = await axios.post(`/news/addnews`,{WriterId:writer,description:newsclick.description,title:newsclick.title,link:newsclick.link,source:newsclick.source,time:newsclick.time,img:newsclick.img},
            {headers:{Authorization:token}
            })
            message.success(res.data.msg)
            News_eff();
        } catch (error) {
            message.warning('add fail!')
        }
    }


    const handleSearch = (e) =>{
        const str = e.target.value;
        if(str==="")
            setsearching(0)
        else setsearching(1)
        var count=[];
        results.forEach(element => {
            if(element.WriterId.name.toLowerCase().search(str) !== -1
            ||element.title.toLowerCase().search(str) !== -1
            ||element.source.toLowerCase().search(str) !== -1
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
            News_eff();
        } catch (error) {
            message.error(error.response.data.msg)
        }
        setIsModalVisible(false)
    };
    const handleCancelDelete = () => {
        setIsModalVisible(false)
    };



    return (
        <div>
            <div className='body-container'>
                <h2><Text underline>News Manager</Text></h2>
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
                        <p>Delete News?</p>
                    </Modal>

            </div>
            <div>
            <h2 style={{textAlign:'center'}}><Text>Add News</Text></h2>
            <Table bordered={true} columns={ColumnsList} scroll={{ y: 450 }} pagination={{ pageSize: listNews.length }} dataSource={listNews} 
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {setnewsclick(listNews[rowIndex])}, // click row
                            onContextMenu: event => {}, // right button click row
                        };
                    }}
                    />
            </div>
        </div>
    )
}

export default News
