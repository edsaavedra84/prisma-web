import React, {useEffect} from 'react';

function Contact() {
    useEffect(() => {
    });

    return (
    <div>
        <section className="contact" data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="500">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="info-box">
                                    <i className="bx bx-map"></i>
                                    <h3>Nuestra dirección</h3>
                                    <p>Av. Manuel Montt 12345</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="info-box">
                                    <i className="bx bx-envelope"></i>
                                    <h3>Envianos un correo</h3>
                                    <p>info@prisma.cl | contacto@prisma.cl</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="info-box">
                                    <i className="bx bx-phone-call"></i>
                                    <h3>Llámanos o WhatsApp</h3>
                                    <p>+56 99 123 1234</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="map mt-2">
            <div className="container-fluid p-0">
                <iframe width="600" height="500" id="gmap_canvas"
                        src="https://maps.google.com/maps?q=Av.%20Manuel%20Montt%2012345&t=&z=15&ie=UTF8&iwloc=&output=embed"></iframe>
            </div>
        </section>
    </div>);
}

export default Contact;
