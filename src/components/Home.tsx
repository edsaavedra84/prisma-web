import whyUsImg from "../assets/img/why-us.jpg";
import featuresImg from "../assets/img/features-1.svg";
import React from "react";
import './Home.css';

function Home() {
    return (
        <div className={"homeContent"}>
            <section id="hero" className="d-flex justify-cntent-center align-items-center">
                <div id="present" className="container">
                    <div className={"row"}>
                        <div className={"col title-main"}>
                            <h2>PRISMA</h2>
                            <p>Blah blah blach</p>
                        </div>
                    </div>
                </div>
            </section>

            <main id="main">
                <section className="services">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up">
                                <div className="icon-box icon-box-pink">
                                    <div className="icon"><i className="bx bxl-dribbble"></i></div>
                                    <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                                    <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas
                                        molestias excepturi sint occaecati cupiditate non provident</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up"
                                 data-aos-delay="100">
                                <div className="icon-box icon-box-cyan">
                                    <div className="icon"><i className="bx bx-file"></i></div>
                                    <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
                                    <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up"
                                 data-aos-delay="200">
                                <div className="icon-box icon-box-green">
                                    <div className="icon"><i className="bx bx-tachometer"></i></div>
                                    <h4 className="title"><a href="">Magni Dolores</a></h4>
                                    <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa
                                        qui officia deserunt mollit anim id est laborum</p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up"
                                 data-aos-delay="200">
                                <div className="icon-box icon-box-blue">
                                    <div className="icon"><i className="bx bx-world"></i></div>
                                    <h4 className="title"><a href="">Nemo Enim</a></h4>
                                    <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus
                                        qui blanditiis praesentium voluptatum deleniti atque</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
                <section className="why-us section-bg" data-aos="fade-up" date-aos-delay="200">
                    <div className="container">

                        <div className="row">
                            <div className="col-lg-6 video-box">
                                <img src={whyUsImg} className="img-fluid" alt=""/>
                                <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="venobox play-btn mb-4"
                                   data-vbtype="video" data-autoplay="true"></a>
                            </div>

                            <div className="col-lg-6 d-flex flex-column justify-content-center p-5">

                                <div className="icon-box">
                                    <div className="icon"><i className="bx bx-fingerprint"></i></div>
                                    <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                                    <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas
                                        molestias excepturi sint occaecati cupiditate non provident</p>
                                </div>

                                <div className="icon-box">
                                    <div className="icon"><i className="bx bx-gift"></i></div>
                                    <h4 className="title"><a href="">Nemo Enim</a></h4>
                                    <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus
                                        qui blanditiis praesentium voluptatum deleniti atque</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
                <section className="features">
                    <div className="container">

                        <div className="section-title">
                            <h2>Features</h2>
                            <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.
                                Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit
                                alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                        </div>

                        <div className="row" data-aos="fade-up">
                            <div className="col-md-5">
                                <img src={featuresImg} className="img-fluid" alt=""/>
                            </div>
                            <div className="col-md-7 pt-4">
                                <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <ul>
                                    <li><i className="bi bi-check"></i> Ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat.
                                    </li>
                                    <li><i className="bi bi-check"></i> Duis aute irure dolor in reprehenderit in voluptate
                                        velit.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row" data-aos="fade-up">
                            <div className="col-md-5 order-1 order-md-2">
                                <img src="assets/img/features-2.svg" className="img-fluid" alt=""/>
                            </div>
                            <div className="col-md-7 pt-5 order-2 order-md-1">
                                <h3>Corporis temporibus maiores provident</h3>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <p>
                                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum
                                </p>
                            </div>
                        </div>

                        <div className="row" data-aos="fade-up">
                            <div className="col-md-5">
                                <img src="assets/img/features-3.svg" className="img-fluid" alt=""/>
                            </div>
                            <div className="col-md-7 pt-5">
                                <h3>Sunt consequatur ad ut est nulla consectetur reiciendis animi voluptas</h3>
                                <p>Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus quia minima quod. Sunt
                                    saepe odit aut quia voluptatem hic voluptas dolor doloremque.</p>
                                <ul>
                                    <li><i className="bi bi-check"></i> Ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat.
                                    </li>
                                    <li><i className="bi bi-check"></i> Duis aute irure dolor in reprehenderit in voluptate
                                        velit.
                                    </li>
                                    <li><i className="bi bi-check"></i> Facilis ut et voluptatem aperiam. Autem soluta ad
                                        fugiat.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row" data-aos="fade-up">
                            <div className="col-md-5 order-1 order-md-2">
                                <img src="assets/img/features-4.svg" className="img-fluid" alt=""/>
                            </div>
                            <div className="col-md-7 pt-5 order-2 order-md-1">
                                <h3>Quas et necessitatibus eaque impedit ipsum animi consequatur incidunt in</h3>
                                <p className="fst-italic">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <p>
                                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum
                                </p>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>);
}

export default Home;