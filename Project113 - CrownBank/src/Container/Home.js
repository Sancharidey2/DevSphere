import React from "react";
import { NavLink } from "react-router-dom";
import aa from "../Images/aa.jpg";
import digital from "../Images/digital.jpg";
import grow from "../Images/grow.jpg";
import card from "../Images/card.jpg";
import mainpicture from "../Images/mainpicture.png";
import "../index.css";

function Home() {
  return (
    <div className="py-4">
      <div>
        <div className="qq">
          <h1 className="heading">When banking meets minimalist.</h1>
          <h2>Welcome to the Crown-Bank</h2>
          <div>
            <div>
              <p className="subheading">
                A simpler banking experience for a simpler life.
              </p>
            </div>

            <div className="row text-center">
              <div className=" col-4">
                <NavLink
                  className="btn btn-info my-sm-0"
                  exact
                  to="/viewCustomer"
                  role="button"
                >
                  Accounts
                </NavLink>
              </div>
              <div className=" col-4">
                <NavLink
                  className="btn btn-info  my-sm-0"
                  exact
                  to="/transfer"
                  role="button"
                >
                  Transfer
                </NavLink>
              </div>
              <div className="col-4">
                <NavLink
                  className="btn btn-info  my-sm-0"
                  exact
                  to="/transactions"
                  role="button"
                >
                  Transactions
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" row main_picture_space">
        <img src={aa} alt="main_photo" className="col-lg-6 col-sm-12" />
        <img
          src={mainpicture}
          alt="main_photo"
          className="col-lg-6 col-sm-12"
        />
      </div>
      <div>
        <hr></hr>
        <div className="feature_marign">
          <h2 className="features">Features</h2>
          <br></br>
          <h3 className="feature_subheading">
            Everything you need in a modern bank and more.
          </h3>
        </div>
        <br></br>
        <br></br>
        <div className="row photo_text_gap">
          <div className="col-lg-6 col-md-4 col-sm-12 photo_pad">
            <img src={digital} alt="digital" className="size" />
          </div>
          <div className="col-lg-6 col-md-4 col-sm-12">
            <h5 className="feature_heading">~ 100% digital bank</h5>
            <p className="text_of_feature">
              Our Digital Banking features make it easy for you to bank on your
              terms. Manage your accounts, track spending, create budgets, and
              transfer money between family and friends.
            </p>
          </div>

          <div className="col-lg-6 col-md-4 col-sm-12 photo_pad">
            <img src={grow} alt="grow" className="size" />
          </div>
          <div className="col-lg-6 col-md-4 col-sm-12">
            <h5 className="feature_heading">~ Watch your money grow</h5>
            <p className="text_of_feature">
              Why should only the finance nerds have all the fun and high
              returns? All you have to do is invest your money and go do your
              thing, while bankist takes care of the rest.
            </p>
          </div>

          <div className="col-lg-6 col-md-4 col-sm-12 photo_pad">
            <img src={card} className="size" alt="card" />
          </div>
          <div className="col-lg-6 col-md-4 col-sm-12">
            <h5 className="feature_heading"> ~ Free debit card included</h5>
            <p className="text_of_feature">
              Life is easier, smoother and better when you have a debit card
              that gives you complete control. does it all. Here's your gateway
              to smarter spends, easier ways to safeguard your card and managing
              everything at the click of a button.
            </p>
          </div>
        </div>
      </div>
      <hr></hr>
      <br></br>
      <div className="feature_marigns">
        <h2 className="features">Operations</h2>
        <h3 className="feature_subheading">
          Everything as simple as possible, but no simpler.
        </h3>
      </div>
      <br></br>
      <div>
        <div>
          <div className="row">
            <button className=" col-lg-4 col-md-4 col-sm-12 color_1 ">
              <br></br>
              <span>01</span>
              <view>
                <h5 className="container-fluid">Instant Transfers</h5>
                <br></br>

                <p class="container-fluid">
                  Do your banking in just single click You can check your
                  transaction easily by one click.
                </p>
              </view>
            </button>

            <button className=" col-lg-4 col-md-4 col-sm-12 color_2 ">
              <br></br>
              <span>02</span>
              <view>
                <h5 className="container-fluid"> Instant Deposit</h5>
                <br></br>
                <p className="container-fluid">
                  Enjoy flexibility and convenience for your day-to-day banking
                  needs with our easy-to-use and secure Online banking platform.
                </p>
              </view>
            </button>

            <button className="col-lg-4 col-md-4 col-sm-12 color_3">
              <br></br>
              <span>03</span>
              <br></br>
              <view>
                <h5 className="container-fluid">Instant withdraw</h5>
                <br></br>
                <p className="container-fluid">
                  Enter the amount you'd like to withdraw,Your money will arrive
                  in your checking account in few second.
                </p>
              </view>
            </button>
          </div>
        </div>
      </div>
      <br></br>

      <div>
        <h3 className="last-line">The best day to join CrownBank is today!</h3>
      </div>
    </div>
  );
}

export default Home;
