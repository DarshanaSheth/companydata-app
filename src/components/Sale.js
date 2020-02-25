import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap'
import {AddSaleModal} from './AddSaleModal';
import {EditSaleModal} from './EditSaleModal';



export class Sale extends Component{
    constructor(props){
        super(props);
        this.state={sls:[],addModalShow : false,editcustModal:false}

    }
    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch('https://localhost:44368/api/Sale')
        .then(response=> response.json())
        .then(data => {
                this.setState({sls:data});
            }    
            );
        
    }
    componentDidUpdate(){
        this.refreshList();
    }

    deleteSale(saleid)
    {
        if(window.confirm('Are you sure?'))
        {
                fetch('https://localhost:44368/api/Sale/'+saleid,{
                method:'DELETE',
                header: {'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){
        const {sls,saleid,prodid,custid,strid,dtsold}= this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>SaleID</th>
                    <th>ProductID</th>
                    <th>CustomerID</th>
                    <th>StoreID</th>
                    <th>DateSold</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {sls.map(sl=>
                      <tr key = {sl.SaleID}>
                      <td>{sl.SaleID}</td>
                      <td>{sl.ProductID}</td>
                      <td>{sl.CustomerID}</td>
                      <td>{sl.StoreID}</td>
                      <td>{sl.DateSold}</td>

                      <td>

                          <ButtonToolbar>
                              <Button className="mr-2" variant="info"
                              onClick={()=> this.setState({editModalShow:true, saleid:sl.SaleID,
                                prodid:sl.ProductID, custid:sl.CustomerID, strid:sl.StoreID,
                                dtsold:sl.DateSold
                                })}>
                                  Edit
                              </Button>
                              <Button className="mr-2"
                              onClick={()=> this.deleteSale(sl.SaleID)}
                              variant="danger"
                              >Delete
                              </Button>
                              <EditSaleModal
                              show={this.state.editModalShow}
                              onHide={editModalClose}
                              saleid={saleid}
                              prodid={prodid}
                              custid={custid}
                              strid={strid}
                              dtsold={dtsold}
                              
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
            >ADD Sale</Button>
            
            <AddSaleModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
            </ButtonToolbar>
            </div>
        )
    }
}