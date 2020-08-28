import React, { Component } from 'react'
import {Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,  Label} from 'reactstrap'; 
import {Link} from "react-router-dom";
import {LocalForm, Control, Errors} from "react-redux-form";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";

const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

class CommentForm extends Component{
  constructor(props){
    super(props);
    this.toggleNav = this.toggleNav.bind(this); 
    this.toggleModal = this.toggleModal.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state={
        isNavOpen: false,
        isModalOpen: false,
        author: "",
      
    };
}

handleSubmit(values){
  this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
  this.toggleModal();
};

toggleNav(){
    this.setState({
        isNavOpen:!this.state.isNavOpen
        
    });
}
toggleModal(){
    this.setState({
        isModalOpen:!this.state.isModalOpen
        
    });
};
render(){
  
  return(
    <React.Fragment>
    <Button onClick={this.toggleModal} outline><i className="fa fa-pencil fa-lg"/>Sumbit Comment</Button>

    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={values =>this.handleSubmit(values)}>
                
                <div className="form-group">
                  <Label htmlFor="rating" md={2}>Rating</Label>
                    <Control.select 
                    name="rating" 
                    id="rating" 
                    model=".rating" 
                    className="form-control">
                      <option disabled selected>Rate Here</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                </div>
                <div className="form-group">
                    <Label htmlFor="author" md={2}>Author</Label>
                      <Control.text
                      name="author" 
                      id="rating"
                      model=".author" 
                      className="form-control"
                      validators={{
                        minLength: minLength(2),
                        maxLength: maxLength(15)
                      }}/>
                       <Errors
                         className="text-danger"
                          model=".author"
                          show="touched"
                          component="div"
                          messages={{
                           required: 'Required',
                           minLength: 'Must be at least 2 characters',
                           maxLength: 'Must be 15 characters or less'
                                    }}
                                />

                </div>
                <div className="form-group">
                    <Label htmlFor="text" md={2}>Comment</Label> 
                        <Control.textarea 
                            className="form-control"
                            model=".text"
                            id="text"     
                            name="text"
                            rows="6"
                            />
                  
                  </div>
                  <Button type="submit" value="submit" color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>   
      </Modal>
    </React.Fragment> 
    )
  }
};

  
 function RenderCampsite({campsite}){
    return(
      <div className="col-md-5 m-1">
           <Card>
              <CardImg top src={baseUrl + campsite.image} alt={campsite.name}/>
                <CardBody>
                    <CardText>{campsite.description}</CardText>
              </CardBody>
            </Card>
      </div>
    )
  };
  function RenderComments({comments,addComment, campsiteId}){
    if(comments != null){
      return(
        <div key={comments.id} className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map((n)=> 
            <div key={n.id}>
            <p>{n.text}</p>
            <p>-{n.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(n.date)))}</p>
            </div>
            )} 
            <CommentForm campsiteId={campsiteId} addComment={addComment}/>
        </div>
      )
    } return <div></div>
  };

 function CampsiteInfo(props) {
   if(props.isLoading){
     return(
        <div className="container">
            <div className="row">
                   <Loading/>
            </div>
        </div>
      )
   }
   if(props.errMess){
     return (
        <div className="container">
            <div className="row">
                <div className="col">
                  <h4>{props.errMess}</h4>
                </div>
            </div>
         </div>
     )
   }
    if(props.campsite != null){
     return(
       <div className="container">
         <div className="row">
                <div className="col">
                      <Breadcrumb>
                          <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <h2>{props.campsite.name}</h2>
                      <hr/>
                </div>
              </div>
          <div className="row">
            <RenderCampsite campsite={props.campsite} />
            <RenderComments
             comments ={props.comments}
             addComment={props.addComment} 
             campsiteId ={props.campsiteId}/>
          </div>
       </div>
     )
    }return (
      <div></div>
    )
  };


export default CampsiteInfo
