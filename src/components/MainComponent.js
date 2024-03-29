import React, { Component } from "react";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Contact from "./ContactComponent";
import { actions } from 'react-redux-form';
import Dishdetail from "./DishdetailComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { postFeedback, postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback')),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMessg={this.props.dishes.errMssg}
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {

      return (
        <Dishdetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish.id === parseInt(match.params.dishID, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMessg={this.props.dishes.errMssg}
          commentsErrMess={this.props.comments.errMss}
          comments={this.props.comments.comments.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishID, 10)
          )}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route exact path="/" component={HomePage} />
              <Route exact path='/contactus' component={() =>
                  <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback} />} />
              <Route
                path="/aboutus"
                component={() => <About leaders={this.props.leaders.leaders} />}
              />
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishID" component={DishWithId} />
              <Redirect to="/" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
