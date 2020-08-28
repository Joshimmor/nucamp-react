import React, {Component} from 'react'; 
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfo';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './Contact';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import {actions} from "react-redux-form";
import {addComment, fetchCampsites,  fetchComments, fetchPromotions} from "../Redux/ActionCreators";


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    }
};

const mapDispatchToProps = {
    addComment: (campsiteId,rating,author, text) => (addComment(campsiteId,rating,author,text)),
    fetchCampsites: ()=> (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions())
};

class Main extends Component {
    componentDidMount(){
         this.props.fetchCampsites();
         this.props.fetchComments();
         this.props.fetchPromotions();
    }
   
    
  render() {
      const HomePage = () =>{
          return(
            <Home 
            campsite={this.props.campsites.campsites.filter(n=> n.featured)[0]}
            campsitesLoading={this.props.campsites.isLoading}
            campsitesErrMess ={this.props.campsites.errMess}
            promotion={this.props.promotions.promotions.filter(n=> n.featured)[0]}
            promotionLoading={this.props.promotions.isLoading}
            promotionErrMess={this.props.promotions.errMess}
            partner={this.props.partners.filter(n=> n.featured)[0]}
            addComment ={this.props.addComment}
            />
          );
      };

      const CampsiteWithId = ({match})=>{
          return(
              <CampsiteInfo campsite={this.props.campsites.campsites.filter(n=> n.id === +match.params.campsiteId)[0]}
              isLoading={this.props.campsites.isLoading}
              errMess ={this.props.campsites.errMess}
              comments =  {this.props.comments.comments.filter(n => n.id === +match.params.campsiteId)}
              commentsErrMEss={this.props.comments.errMess}
              addComment={this.props.addComment} 
              />
          );
      };

      return (
          <div >
              <Header />
                    <Switch >
                        <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render = { ()=> <Directory campsites = {this.props.campsites }/>} />
                            <Route path="/directory/:campsiteId" component={CampsiteWithId}/> 
                            <Route path="/contactus" render={()=> <Contact resetFeedbackForm = {this.props.resetFeedbackForm}/> 
                            }/>
                            <Route path="/aboutus" render={()=>
                            <About partners ={this.props.partners}/>}/>
                            <Redirect to='/home'/>
                    </Switch>
              <Footer />
          </div>
      );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));