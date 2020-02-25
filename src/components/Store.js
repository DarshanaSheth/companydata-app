import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap'
import {AddStoreModal} from './AddStoreModal';
import {EditStoreModal} from './EditStoreModal';

export class Store extends Component{
    constructor(props){
        super(props);
        this.state={strs:[],addModalShow : false,editcustModal:false}

    }
    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch('https://localhost:44368/api/Store')
        .then(response=> response.json())
        .then(data => {
                this.setState({strs:data});
            }    
            );
        
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteStore(strid)
    {
        if(window.confirm('Are you sure?'))
        {
                fetch('https://localhost:44368/api/Store/'+strid,{
                method:'DELETE',
                header: {'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    render(){
        const {strs,strid,strname,straddress}= this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>StoreID</th>
                    <th>StoreName</th>
                    <th>StoreAddress</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {strs.map(str=>
                      <tr key = {str.StoreID}>
                      <td>{str.StoreID}</td>
                      <td>{str.StoreName}</td>
                      <td>{str.StoreAddress}</td>
                      <td>

                          <ButtonToolbar>
                              <Button className="mr-2" variant="info"
                              onClick={()=> this.setState({editModalShow:true, strid:str.StoreID,
                                strname:str.StoreName, straddress:str.StoreAddress,
                                })}>
                                  Edit
                              </Button>
                              <Button className="mr-2"
                              onClick={()=> this.deleteStore(str.StoreID)}
                              variant="danger"
                              >Delete
                              </Button>
                              <EditStoreModal
                              show={this.state.editModalShow}
                              onHide={editModalClose}
                              strid={strid}
                              strname={strname}
                              straddress={straddress}
                              
                              />
                          </ButtonToolbar>
                      </td>
                      </tr>  
                      )}
             </tbody>
            </Table>

            <ButtonToolbar>
            <Button
            variant='primary'
            onClick={()=> this.setState({addModalShow:true})}
            >ADD Store</Button>
            
            <AddStoreModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
            </ButtonToolbar>
            </div>
            
        )
    }
}