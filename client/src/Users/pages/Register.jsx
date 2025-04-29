import FormAddUser from "../components/FormRegister";

export default function Register({}) {
  return (
    <section className="container min-vh-80 d-flex align-items-center justify-content-center mt-5">
      <div
        className="row shadow-lg rounded-4 overflow-hidden w-100 mt-5"
        style={{ maxWidth: 1000 }}
      >
        <div className="col-md-6 bg-dark-subtle text-black p-5 d-flex flex-column justify-content-center">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/474x/53/58/81/535881e220a3792a1640a2e66e6c79b4.jpg"
              alt="sofa"
              className="img-fluid img-zoom rounded-4"
              style={{ maxWidth: 300 }}
            />
          </div>
        </div>
        <div
          className="col-md-6 p-5 bg-white"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 className="display-4 fw-bold mb-4">Sign Up</h1>
          <FormAddUser />
        </div>
      </div>
    </section>
  );
}
