import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCustModal} from './AddCustModal';
import {EditCustModal} from './EditCustModal';

export class Customer extends Component{

    constructor(props){
        super(props);
        this.state={custs:[],addModalShow : false,editcustModal:false}

    }

    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch('https://localhost:44368/api/Customer')
        .then(response=> response.json())
        .then(data => {
                this.setState({custs:data});
            }    
            );
        
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteCust(custid)
    {
        if(window.confirm('Are you sure?'))
        {
                fetch('https://localhost:44368/api/Customer/'+custid,{
                method:'DELETE',
                header: {'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    render(){
        const {custs,custid,custname,custaddress}= this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>CustomerID</th>
                    <th>CustomerName</th>
                    <th>CustomerAddress</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {custs.map(cust=>
                      <tr key = {cust.CustomerID}>
                      <td>{cust.CustomerID}</td>
                      <td>{cust.CustomerName}</td>
                      <td>{cust.CustomerAddress}</td>
                      <td>

                          <ButtonToolbar>
                              <Button className="mr-2" variant="info"
                              onClick={()=> this.setState({editModalShow:true, custid:cust.CustomerID,
                                custname:cust.CustomerName, custaddress:cust.CustomerAddress,
                                })}>
                                  Edit
                              </Button>
                              <Button className="mr-2"
                              onClick={()=> this.deleteCust(cust.CustomerID)}
                              variant="danger"
                              >Delete
                              </Button>
                              <EditCustModal
                              show={this.state.editModalShow}
                              onHide={editModalClose}
                              custid={custid}
                              custname={custname}
                              custaddress={custaddress}
                              
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
            >ADD Customer</Button>
            
            <AddCustModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
            </ButtonToolbar>
            </div>
        )
    }
}