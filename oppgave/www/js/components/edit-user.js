import { LitElement, html, css } from "../../node_modules/lit-element/lit-element.js";

class EditUser extends LitElement {
  /**
   * @brief: locally made stylesheet - could also use bootstrap classes
   * I could not get the page to run on docker properly, got errors relating to Selenium etc.
   * So, don't know how it actually looks, but should be good.
   * Design is inspired by our project delivery (own CSS, having email/password fields)
   */
  static get styles() {
    return [
    css `
			#userContainer {
        margin: 5px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;  // Stick to the left
    
        margin-left: auto;
        margin-right: auto;
        width: flex;

        border-radius: 5px;
      }`, css `
      .form-group {
        display: flex;
        flex-flow: column;   // Flex vertically
      }`
		];
  }

  static get properties() {
    return {
      user: { type: Object }
    };
  }
  

  render()  {
    return html`
      <div id="userContainer">
      // We set our function that sends updated user data to run on hitting submit,
      // as in https://www.w3schools.com/jsref/event_onsubmit.asp
      <form onsubmit="return this.sendUser()" id="userForm" method="POST">
        // Assume user also has email and password - not doing more than reading them as they are not part of the task
        <div class="form-group">
          <label for="email">Email: </label>
          <input type="email" name="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="uID">User ID: </label>
          <input type="number" value="${this.user.uid}" id="uid" name="uid" required>
          <label for="uName">Username: </label>
          <input type="text" value="${this.user.uname}" id="uname" name="uname" required>
        </div>
        <div class="form-group">
          <label for="pass">Password: </label>
          <input type="password" type="text" id="pass" name="pass" required>
        </div>
        <div class="form-group">
          <label for="firstName">First Name: <:/label>
          <input type="text" value="${this.user.firstName}" id="firstName" name="firstName" required>
          <label for="lastName">Last Name: <:/label>
          <input type="text" value="${this.user.lastName}" id="lastName" name="lastName" required>
        </div>
        <input class="button button4" type="submit" value="Edit Data">
      </form>
		</div>
		`;
  }

  // Handles updating the user data
  sendUser(u) {
    //data from the HTML form, get using the target event property as in https://www.w3schools.com/jsref/event_target.asp
    var filledForm = new FormData(u.target.form);
    fetch('api/updateUser.php', {
      method: 'POST',
      body: filledForm            // Our data to be sent!
     }).then(res=>res.json())
       .then(data=>{
        // Checking for errors, as in https://developer.mozilla.org/en-US/docs/Web/API/Response/status
        if(data.status = 200)
          {
            console.log("Successful update!");
          }
        else
          {
            console.log("ERROR! Something went wrong!");
          }
        })
  }
}
customElements.define('edit-user', EditUser);
