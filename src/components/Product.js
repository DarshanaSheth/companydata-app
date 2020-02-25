import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap'
import {AddProdModal} from './AddProdModal';
import {EditProdModal} from './EditProdModal';

export class Product extends Component{
    constructor(props){
        super(props);
        this.state={prdts:[],addModalShow : false,editcustModal:false}

    }

    componentDidMount(){
        this.refreshList();
    }
    refreshList(){
        fetch('https://localhost:44368/api/Product')
        .then(response=> response.json())
        .then(data => {
                this.setState({prdts:data});
            }    
            );
        
    }
    componentDidUpdate(){
        this.refreshList();
    }
    deleteProd(prodid)
    {
        if(window.confirm('Are you sure?'))
        {
                fetch('https://localhost:44368/api/Product/'+prodid,{
                method:'DELETE',
                header: {'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    render(){
        const {prdts,prodid,prodname,prodprice}= this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ProductID</th>
                    <th>ProductName</th>
                    <th>ProductPrice</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {prdts.map(prdt=>
                      <tr key = {prdt.ProductID}>
                      <td>{prdt.ProductID}</td>
                      <td>{prdt.ProductName}</td>
                      <td>{prdt.ProductPrice}</td>
                      <td>

                          <ButtonToolbar>
                              <Button className="mr-2" variant="info"
                              onClick={()=> this.setState({editModalShow:true, prodid:prdt.ProductID,
                                prodname:prdt.ProductName, prodprice:prdt.ProductPrice,
                                })}>
                                  Edit
                              </Button>
                              <Button className="mr-2"
                              onClick={()=> this.deleteProd(prdt.ProductID)}
                              variant="danger"
                              >Delete
                              </Button>
                              <EditProdModal
                              show={this.state.editModalShow}
                              onHide={editModalClose}
                              prodid={prodid}
                              prodname={prodname}
                              prodprice={prodprice}
                              
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
            >ADD Product</Button>
            
            <AddProdModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
            </ButtonToolbar>
            </div>
        )
    }
}