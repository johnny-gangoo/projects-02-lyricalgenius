import React, { Component } from 'react';
import './aboutus.css';
import githublogo from '../../images/icons/githubicon.png';

class AboutUs extends Component {
    render() {
        return (
            <div>
                <div class="py-5 darkbackground">
                    <div class="container py-5 rounded textcontainer">
                        <h1 class="display-4">Behind LyricalGenius</h1>
                        <p class="lead">
                            LyricalGenius was started by 4 Temple University students as a class project. We wanted to create a quick and easy
                            way to search for and send lyrics to friends and family. At the time of development, COVID-19 was a huge issue and 
                            we felt that not only was it important to be able to reach out to loved ones, lyrics often put into words what we struggled
                            to convey. Thus, LyricalGenius was born.
                        </p>
                        
                        {/* <div class="row text-center">
                            <div class="col-xl-4 col-sm-4 mb-5">
                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 class="mb-0">Simple</h5>
                                    <span class="small text-uppercase text-muted">CEO - Founder</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <img class="icon" src={githublogo} href />
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-4 col-sm-4 mb-5">
                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 class="mb-0">Powerful</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <img class="icon" src={githublogo} href />
                                    </ul>
                                </div>
                            </div>

                            <div class="col-xl-4 col-sm-4 mb-5">
                                <div class="bg-white rounded shadow-sm py-5 px-4">
                                    <h5 class="mb-0">Intuitive</h5><span class="small text-uppercase text-muted">CEO - Founder</span>
                                    <ul class="social mb-0 list-inline mt-3">
                                        <img class="icon" src={githublogo} href />
                                    </ul>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div class="container py-5 rounded textcontainer">
                        {/*  */}
                        <div class="row mb-4">
                            <div class="col-lg-9">
                                <h2 class="display-4 font-weight-light">Meet the Team</h2>
                                <p class="font-italic lead ">These are the developers that have made LyricalGenius possible.</p>
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