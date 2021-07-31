import React, { useState, useEffect } from "react";

export const Form = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [msg, setMsg] = useState({});

    const [showCorrecto, setShowCorrecto] = useState({ display: "none" });
    const [showErr, setShowErr] = useState({ display: "none" });

    const { name, email, phone, message } = form;

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cuerpo = JSON.stringify(form);

        console.log(process.env);

        const link =
            process.env.NODE_ENV === "production"
                ? "https://emailserverlabo1.herokuapp.com/form"
                : "http://localhost:3000";

        fetch(link, {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: cuerpo,
        }).then((res) => res.json().then((data) => setMsg(data)));
    };

    useEffect(() => {
        const afterSubmit = () => {
            if (msg !== undefined) {
                if (msg.msg === "ok") {
                    setShowCorrecto({
                        display: "flex",
                    });
                } else if (msg.msg === "err") {
                    setShowErr({
                        display: "flex",
                    });
                }
            }
        };

        afterSubmit();
    }, [msg]);

    return (
        <form onSubmit={handleSubmit} method="post" className="php-email-form">
            <div className="form-row">
                <div className="col form-group">
                    <input
                        value={name}
                        onChange={handleInput}
                        minLength="4"
                        required
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Nombre"
                        data-rule="minlen:4"
                        data-msg="Please enter at least 4 chars"
                    />
                    <div className="validate"></div>
                </div>
                <div className="col form-group">
                    <input
                        value={email}
                        onChange={handleInput}
                        required
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Correo"
                        data-rule="email"
                        data-msg="Please enter a valid email"
                    />
                    <div className="validate"></div>
                </div>
            </div>
            <div className="form-group">
                <input
                    value={phone}
                    onChange={handleInput}
                    type="text"
                    minLength="4"
                    required
                    className="form-control"
                    name="phone"
                    id="subject"
                    placeholder="Teléfono"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 8 chars of subject"
                />
                <div className="validate"></div>
            </div>
            <div className="form-group">
                <textarea
                    value={message}
                    onChange={handleInput}
                    minLength="20"
                    required
                    className="form-control"
                    name="message"
                    rows="5"
                    data-rule="required"
                    data-msg="Message"
                    placeholder="Mensaje"
                ></textarea>
                <div className="validate"></div>
            </div>
            <div className="mb-3">
                <div className="error-message" style={showErr}>
                    No se pudo enviar el correo
                </div>
                <div className="sent-message" style={showCorrecto}>
                    Tu mensaje a sido enviado. Gracias!
                </div>
            </div>
            <div className="text-center">
                <button type="submit">Enviar mensaje</button>
            </div>
        </form>
    );
};
