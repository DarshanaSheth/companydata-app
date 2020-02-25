import React,{Component} from 'react';
import {Modal, Button, Row,Col,Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditProdModal extends Component{

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

        fetch('https://localhost:44368/api/Product',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            ProductID: event.target.ProductID.value,
            ProductName: event.target.ProductName.value,
            ProductPrice: event.target.ProductPrice.value
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
                autoHideDuration= {3000}
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
                  Edit Product
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
                            disabled
                            defaultValue={this.props.prodid}
                            placeholder="ProductID"
                            />
                        </Form.Group>

                        <Form.Group controlId="ProductName">
                            <Form.Label>ProductName</Form.Label>
                            <Form.Control
                            type="text"
                            name="ProductName"
                            required
                            defaultValue={this.props.prodname}
                            placeholder="ProductName"
                            />
                        </Form.Group>

                        <Form.Group controlId="ProductPrice">
                            <Form.Label>ProductPrice</Form.Label>
                            <Form.Control
                            type="text"
                            name="ProductPrice"
                            required
                            defaultValue={this.props.prodprice}
                            placeholder="ProductPrice"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Product
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
