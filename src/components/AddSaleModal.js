import React,{Component} from 'react';
import {Modal, Button, Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class AddSaleModal extends Component{

    constructor(props){
        super(props);
        this.state={snackbaropen:false, snackbarmsg:''};
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    snackbarClose= (event)=>{
        this.setState({snackbaropen:false});
    };
    handleSubmit(event){

        event.preventDefault();

        fetch('https://localhost:44368/api/Sale',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            SaleID: null,
            ProductID: event.target.ProductID.value,
            CustomerID: event.target.CustomerID.value,
            StoreID: event.target.StoreID.value,
            DateSold: event.target.DateSold.value
            })
        })
        .then(res=> res.json())
        .then((result)=>
        {
           // alert(result);
            this.setState({snackbaropen:true, snackbarmsg:result});

        },
        (error)=>{
         //  alert('Failed')
          this.setState({snackbaropen:true, snackbarmsg:'Failed'});
        }
        )

    }

    render(){
        return(
            <div className="container">

                <Snackbar 
                anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                open={this.state.snackbaropen}
                autoHideDuration= {1000}
                onClose={this.snackbarClose}
                message = {<span id="messang-id">{this.state.snackbarmsg}</span>}
                action={[
                <IconButton
                key="close"
                arial-label="close"
                color="inherit"
                onClick={this.snackbarClose}
                >
                    X
                </IconButton>
                ]}
                />
            <Modal
             {...this.props}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Sale
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
       
            
                <Row>
                    <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group controlId="ProductID">
                            <Form.Label>ProductID</Form.Label>
                            <Form.Control
                            type="text"
                            name="ProductID"
                            required
                            placeholder="ProductID"
                            />
                        </Form.Group>

                        <Form.Group controlId="CustomerID">
                            <Form.Label>CustomerID</Form.Label>
                            <Form.Control
                            type="text"
                            name="CustomerID"
                            required
                            placeholder="CustomerID"
                            />
                        </Form.Group>

                        <Form.Group controlId="StoreID">
                            <Form.Label>StoreID</Form.Label>
                            <Form.Control
                            type="text"
                            name="StoreID"
                            required
                            placeholder="StoreID"
                            />
                        </Form.Group>
                        <Form.Group controlId="DateSold">
                            <Form.Label>DateSold</Form.Label>
                            <Form.Control
                            type="text"
                            name="DateSold"
                            required
                            placeholder="DateSold"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Add Sale
                            </Button>
                        </Form.Group>
                    </Form>

                    </Col>
                </Row>
        
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>
        )
    }
}