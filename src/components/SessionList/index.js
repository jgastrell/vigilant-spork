import React, { Component } from "react";
import Swal from "sweetalert2";
import DELETE_REVIEW from "../../graphql/mutations/DELETE_REVIEW";
import UPDATE_SESSION_REMOVE_WINE_OR_TASTER from "../../graphql/mutations/UPDATE_SESSION_REMOVE_WINE_OR_TASTER";
import DELETE_SESSION from "../../graphql/mutations/DELETE_SESSION";
import UPDATE_REVIEW from "../../graphql/mutations/UPDATE_REVIEW";
import ReviewFormContainer from "../../containers/ReviewContainer";
import SESSIONS from "../../graphql/queries/SESSIONS";
import REVIEWS from "../../graphql/queries/REVIEWS";

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000
  });

class SessionList extends Component {
 
  handleUpdate = async (submitObject) => {
    const { client } = this.props;
    try {
      await client.mutate({
        mutation: UPDATE_REVIEW,
        variables: submitObject,
        refetchQueries: [{
          query: REVIEWS,
        }]
      });
      Toast.fire({
        type: "success",
        title: "Review Updated!"                  
      })
    } catch (e) {
      Toast.fire({
        type: "success",
        title: "Error",
        text: e
      });
    };
  }
  deleteSessionOrReview = async (id, queryDelete, refetchQuery) => {
    const { client } = this.props;
    let result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't revert",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.value) {
      try {
        await client.mutate({
          variables: {
              id: id
          },
          mutation: queryDelete,
          refetchQueries: [{
            query: refetchQuery,
          }]              
        });
        Toast.fire(
          'Deleted!',
          'Deleted succesfully',
          'success'
        );
      } catch(e) {
          Toast.fire({
            type: "success",
            title: "Deleted went wrong",
            text: e
        })
      }
    }
  }
  deleteWineOrTasterFromSession = async (session, wineId, tasterId) => {
    let updatedSession = {}
    if (wineId) {
      updatedSession = {
        sessionWineIDs: { id: wineId },
        sessionID: session.id,
      };
    } else {
      updatedSession = {
        sessionWineTastersIDs: { id: tasterId },
        sessionID: session.id,
      };
    }
    
    const { client } = this.props;
    let result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
    })
    if (result.value) {
      try {
        await client.mutate({
          variables: {
              ...updatedSession
          },
          mutation: UPDATE_SESSION_REMOVE_WINE_OR_TASTER,
          refetchQueries: [{
              query: SESSIONS,
          }]              
        })
        Toast.fire(
          'Deleted!',
          'The item has been removed.',
          'success'
        )
      } catch(e) {
        Toast.fire({
          type:"success",
          title:"The item has not been removed",
          text: e
        })
      }
    }
  }
  render() {    
    const { tastingSessions } = this.props;
    return (
      <React.Fragment>
      {
        !tastingSessions ? 
          <div> Loading </div> :
          <React.Fragment>
         <div className="d-inline-flex p-2 bd-highlight">
         {
             tastingSessions.map((tastingSession, i) => (
               <div key={`session ${i}`} value={tastingSession.reviews.id} className="card" style={{width: "18rem", margin:"10px"}}>
                   <div className="container">
                      <p className="card-title" align='left'>{`${new Date(tastingSession.createdAt).toLocaleString()}`}</p>
                      <div className="row">
                        <div className="col-sm">
                          <h5 className="card-title d-inline" align='left'>{`Session ${tastingSession.id.substr(tastingSession.id.length-4,4)}   `}</h5>
                        </div>
                        <div className="col-sm">
                        <button
                            className="btn btn-outline-danger btn-sm d-inline" 
                            onClick={() => this.deleteSessionOrReview(tastingSession.id, DELETE_SESSION, SESSIONS)}>{'Delete Session'}
                          </button>
                        </div>
                      </div>
                      <h5 align='left'>Wines</h5>
                      { tastingSession.wines.map((wine) => (
                        <div className="container">
                          <div className="row">
                            <div className="col-sm">
                              <h5 
                                key={wine.id}  
                                className="d-inline">{`${wine.name}   `}
                              </h5>
                            </div>
                            <div className="col-sm">
                              <button 
                                key={`${wine.id}-btn`} 
                                className="btn btn-outline-danger btn-sm d-inline"
                                onClick={() => {this.deleteWineOrTasterFromSession(tastingSession,wine.id)}}>{'Delete Wine'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <h5 align='left'>Wine Tasters</h5>
                      { tastingSession.wineTasters.map((wineTaster) => (
                        <div className="container">
                          <div className="row">
                            <div className="col-sm">
                              <h5 
                                key={wineTaster.id}  
                                className="d-inline">{`${wineTaster.name}   `}
                              </h5>
                            </div>
                            <div className="col-sm">
                              <button 
                                key={`${wineTaster.id}-btn`} 
                                className="btn btn-outline-danger btn-sm d-inline"
                                onClick={() => {this.deleteWineOrTasterFromSession(tastingSession,null,wineTaster.id)}}>{'Delete Taster'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      { tastingSession.reviews.map((review) => (
                        <div className="d-inline">
                          <ReviewFormContainer
                            review={review}
                            onSubmit={this.handleUpdate}
                          />
                          <button
                            className="btn btn-outline-danger" 
                            onClick={() => {
                              const id = review ? review.id : false;
                              if (id) {
                                return this.deleteSessionOrReview(id, DELETE_REVIEW, SESSIONS)
                              } else {
                                Swal.fire({
                                  text: "There is no reviews left, please delete de session",
                                  type: 'warning',
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: 'Ok'
                                });
                              }
                              
                            }}>{'Delete'}
                          </button>
                      </div>
                      ))}
                   </div>
               </div>
             ))
           }
         </div>
       </React.Fragment>
      }
      </React.Fragment>
    );
  }

}

export default SessionList;
