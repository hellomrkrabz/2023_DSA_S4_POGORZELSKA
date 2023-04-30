import { Link } from "react-router-dom";
import Book from "./Book";

const book = {title:"Instytut", author:"Stephen King", link:"https://ih1.redbubble.net/image.450886651.0130/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u8.jpg", src:"https://www.gloskultury.pl/wp-content/uploads/2019/07/Instytut.jpg"}

function ProfileBookList(props) {

  return (
    <>
        <div className="row">
            <p>{props.title}</p>
            <div className="d-flex justify-content-around col-9 col-xl-10">
                <div className="row row-cols-sm-2 row-cols-xxl-6 row-cols-xl-3 gy-2 gx-2 row-cols-1 col-12">
                    <Book variant="small" {...book}></Book>
                    <Book variant="small" {...book}></Book>
                    <Book variant="small" {...book}></Book>
                    <Book variant="small" {...book}></Book>
                    <Book variant="small" {...book}></Book>
                    <Book variant="small" {...book}></Book>
                </div>
            </div>

            <div className="align-self-center col-3 col-xl-2">
                    {props.isLoggedIn &&
                        props.addLink !== undefined &&
                            <Link to={props.addLink}>
                                <button className="btn btn-banana-primary col-12">Add new</button>
                            </Link>
                    }
                    <Link to={props.moreLink}>
                        <button className="btn btn-banana-primary col-12 mt-2">See more 1</button>
                    </Link>
            </div>
        </div>
    </>
  );
}

export default ProfileBookList;
