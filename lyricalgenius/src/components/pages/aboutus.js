import React, { Component } from 'react';
import './aboutus.css';
import githublogo from '../../images/icons/githubicon.png';

class AboutUs extends Component {
    render() {
        return (
            <div>
                <div class="bg-light py-5">
                    <div class="container py-5">
                        <h1 class="display-4">Welcome to LyricalGenius</h1>
                        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    </div>
                    <div class="container py-5">
                        {/*  */}
                        <div class="row mb-4">
                            <div class="col-lg-5">
                                <h2 class="display-4 font-weight-light">Meet the Team</h2>
                                <p class="font-italic text-muted">These are the developers that have made LyricalGenius possible</p>
                            </div>
                        </div>

                        <div class="row text-center">
                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 class="mb-0">Manuella Nevoresky</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <img class="icon" src={githublogo} href />
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 class="mb-0">Kyle Skelly</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <a href="https://github.com/Kyle-Skelly" title=""><img src={githublogo} class="icon" /></a>
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 class="mb-0">Tom Sunderland</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <img class="icon" src={githublogo} />
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-3 col-sm-6 mb-5">
                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 class="mb-0">John Tarly</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <img class="icon" src={githublogo} />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs;