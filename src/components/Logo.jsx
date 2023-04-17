import banana from './../media/banana.png'


function Logo() {
    return(
    <div className="bg-banana-blue mt-5 p-3 d-flex align-items-center text-white fs-3 fst-italic" style={{borderTopLeftRadius: 10,borderEndEndRadius: 10}}>
        <img src={banana} alt="Logo" width="50" className="d-inline-block align-text-top me-2" />
        BANANA:)
    </div>
    );
}

export default Logo;